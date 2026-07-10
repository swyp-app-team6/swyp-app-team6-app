import { create } from 'zustand';
import type { AxiosError } from 'axios';
import type { MyProfileResponse } from '@/entities/user';
import { ProfileAPI } from '@/entities/user';
import { ExchangeAPI } from '@/entities/exchange';
import type { ExchangeResult } from '@/entities/exchange';
import { ExchangeFlowStep } from '@/shared/enums';
import { openDialog, openErrorDialog } from '@/shared/ui';

interface ExchangeFlowState {
  /** 현재 교환 플로우 단계 */
  step: ExchangeFlowStep;
  /** 스캔된 상대방 UUID */
  scannedUuid: string | null;
  /** 스캔된 상대 프로필 */
  scannedProfile: MyProfileResponse | null;
  /** 교환 결과 */
  exchangeResult: ExchangeResult | null;
  /** 에러 메시지 */
  error: string | null;
  /** 내부 AbortController (외부 노출 불필요) */
  _abortController: AbortController | null;

  /** QR 스캔 완료 처리 — uuid로 상대 프로필 조회 후 confirm 단계로 전환 */
  onScanComplete: (uuid: string) => Promise<void>;
  /** 미리보기 단계로 전환 */
  goToPreview: () => void;
  /** 교환 시작 — long-polling 후 결과 단계로 전환, 완료 시 onComplete 콜백 호출 */
  startExchange: (onComplete?: () => void) => Promise<void>;
  /** 교환 취소 — API 취소 + idle로 리셋 */
  cancelExchange: () => Promise<void>;
  /** 전체 상태 초기화 */
  reset: () => void;
}

const initialState = {
  step: ExchangeFlowStep.IDLE,
  scannedUuid: null as string | null,
  scannedProfile: null as MyProfileResponse | null,
  exchangeResult: null as ExchangeResult | null,
  error: null as string | null,
  _abortController: null as AbortController | null,
};

/**
 * # getErrorMessage
 * ---
 * - 간단설명: AxiosError 상태 코드에 따라 사용자 에러 메시지를 반환
 * ---
 * @param err AxiosError 객체
 */
function getErrorMessage(err: AxiosError): string {
  switch (err.response?.status) {
    case 400:
      return '유효하지 않은 QR 코드입니다';
    case 404:
      return '프로필을 찾을 수 없습니다';
    case 408:
      return '사용자 응답이 없습니다';
    case 409:
      return '상대방이 교환 대기 중이 아닙니다';
    default:
      return '네트워크 오류가 발생했습니다';
  }
}

/**
 * # useExchangeFlowStore
 * ---
 * - 간단설명: QR 프로필 교환 플로우 상태 관리 스토어
 * - 제약사항 및 특이사항:
 *   - IDLE → CONFIRM → PREVIEW → LOADING → RESULT/DECLINED/TIMEOUT 단계 전환
 *   - startExchange는 long-polling으로 상대방 응답 대기
 *   - AbortController로 long-polling 요청 취소 관리
 * ---
 */
const useExchangeFlowStore = create<ExchangeFlowState>((set, get) => ({
  ...initialState,

  onScanComplete: async (uuid: string) => {
    try {
      const { data: profile } = await ProfileAPI.fetchProfileByUuid(uuid);
      set({
        scannedUuid: uuid,
        scannedProfile: profile,
        step: ExchangeFlowStep.CONFIRM,
        error: null,
      });
    } catch (err) {
      console.error('[Exchange] onScanComplete 실패:', err);
      const message = getErrorMessage(err as AxiosError);
      openDialog({ title: '프로필 교환', message });
      set({ error: message, step: ExchangeFlowStep.IDLE });
    }
  },

  goToPreview: () => {
    set({ step: ExchangeFlowStep.PREVIEW });
  },

  startExchange: async (onComplete?: () => void) => {
    const { scannedUuid } = get();
    if (!scannedUuid) return;

    const abortController = new AbortController();
    set({ step: ExchangeFlowStep.LOADING, _abortController: abortController, error: null });

    try {
      const { data } = await ExchangeAPI.start(scannedUuid, abortController.signal);

      if (data.status === 'ACCEPTED' && data.result) {
        set({
          exchangeResult: data.result,
          scannedProfile: data.result.profile ?? get().scannedProfile,
          step: ExchangeFlowStep.RESULT,
          _abortController: null,
        });
        onComplete?.();
      } else {
        const declineMsg = '상대방이 교환을 거절했습니다';
        console.error('[Exchange] startExchange 거절:', declineMsg);
        openDialog({ title: '프로필 교환', message: declineMsg });
        set({
          step: ExchangeFlowStep.IDLE,
          error: declineMsg,
          _abortController: null,
        });
      }
    } catch (err) {
      if (abortController.signal.aborted) return;
      console.error('[Exchange] startExchange 실패:', err);
      const axiosErr = err as AxiosError;
      const message = getErrorMessage(axiosErr);
      openDialog({ title: '프로필 교환', message });
      set({ error: message, step: ExchangeFlowStep.IDLE, _abortController: null });
    }
  },

  cancelExchange: async () => {
    const { _abortController, scannedProfile, step } = get();
    _abortController?.abort();

    if (step === ExchangeFlowStep.LOADING && scannedProfile?.id) {
      try {
        await ExchangeAPI.cancelStart(scannedProfile.id);
      } catch (err) {
        console.error('[Exchange] cancelExchange 실패:', err);
        openErrorDialog({ message: '교환 취소에 실패했습니다' });
      }
    }

    set({ ...initialState });
  },

  reset: () => {
    const { _abortController } = get();
    _abortController?.abort();
    set({ ...initialState });
  },
}));

export default useExchangeFlowStore;
