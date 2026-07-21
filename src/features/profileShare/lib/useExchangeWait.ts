import { useCallback, useRef, useState } from 'react';
import type { AxiosError } from 'axios';
import type { MyProfileResponse } from '@/entities/user';
import { ExchangeAPI } from '@/entities/exchange';
import { useExchangeFlowStore } from '@/features/exchange';
import { ExchangeFlowStep } from '@/shared/enums';
import { openErrorDialog } from '@/shared/ui/ErrorDialog';
import type { NavigationPropType } from '@/shared/types';
import { logProfileExchangeCompleted } from '@/shared/lib/analytics';

/**
 * 대기자 모달 화면 단계
 * - QR = QR 코드 표시 + 카운트다운
 * - PREVIEW = 상대 프로필 미리보기 + 수락하기 CTA
 * - ACCEPTING = 수락 처리 중
 */
export type WaitModalStep = 'QR' | 'PREVIEW' | 'ACCEPTING';

interface UseExchangeWaitOptions {
  /** wait 504 타임아웃 시 호출되는 콜백 (QR 재발급 등) */
  onWaitTimeout?: () => void;
  /** 409 등 복구 불가 에러 시 모달/UI 강제 닫기 콜백 */
  onForceClose?: () => void;
}

interface UseExchangeWaitReturn {
  /** 스캐너로부터 수신된 프로필 */
  receivedProfile: MyProfileResponse | null;
  /** 현재 대기자 모달 단계 */
  modalStep: WaitModalStep;
  /** wait 요청 활성 여부 */
  isWaiting: boolean;
  /** wait 시작 (QR 모달 열릴 때 호출) */
  startWait: () => void;
  /** 명시적 취소 — 클라이언트 abort + 서버 cancel + 상태 리셋 */
  cancelWait: () => void;
  /** 교환 수락 — accept API 호출 후 결과 페이지 이동 */
  acceptExchange: (navigation: NavigationPropType) => Promise<void>;
  /** 교환 거절 — decline API 호출 후 상태 리셋 */
  declineExchange: () => Promise<void>;
  /** 모달 단계 수동 설정 */
  setModalStep: (step: WaitModalStep) => void;
  /** 전체 상태 리셋 (서버 취소 없이) */
  resetState: () => void;
}

/**
 * # useExchangeWait
 * ---
 * - 간단설명: QR 프로필 교환 대기자 측 생명주기를 관리하는 커스텀 훅
 * - 제약사항 및 특이사항:
 *   - 모달 visibility와 독립적으로 동작하여, QR 모달이 닫혀도 wait 유지
 *   - startWait 중복 호출 시 기존 wait를 abort 후 새로 시작
 *   - cancelWait는 서버측 ExchangeAPI.cancel()도 호출
 * ---
 * @example
 * const { receivedProfile, modalStep, startWait, cancelWait, acceptExchange } = useExchangeWait();
 */
export default function useExchangeWait(options?: UseExchangeWaitOptions): UseExchangeWaitReturn {
  const onWaitTimeout = options?.onWaitTimeout;
  const onForceClose = options?.onForceClose;
  const abortRef = useRef<AbortController | null>(null);
  const [receivedProfile, setReceivedProfile] = useState<MyProfileResponse | null>(null);
  const [modalStep, setModalStep] = useState<WaitModalStep>('QR');
  const [isWaiting, setIsWaiting] = useState(false);

  /** 전체 상태 리셋 (서버 취소 없이, 클라이언트 abort만) */
  const resetState = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setReceivedProfile(null);
    setModalStep('QR');
    setIsWaiting(false);
  }, []);

  /** onWaitTimeout ref — useCallback 재생성 방지 */
  const onWaitTimeoutRef = useRef(onWaitTimeout);
  onWaitTimeoutRef.current = onWaitTimeout;

  /** onForceClose ref — useCallback 재생성 방지 */
  const onForceCloseRef = useRef(onForceClose);
  onForceCloseRef.current = onForceClose;

  /**
   * # startWait
   * ---
   * - 간단설명: exchange/wait long-polling 시작, 기존 wait가 있으면 abort 후 재시작
   * - 제약사항 및 특이사항: 504 타임아웃 시 자동 재시작
   */
  const startWait = useCallback(() => {
    // 기존 wait가 있으면 abort (서버 cancel 없이 — 새 세션으로 대체)
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;
    setIsWaiting(true);
    setModalStep('QR');
    setReceivedProfile(null);

    const executeWait = (ctrl: AbortController) => {
      ExchangeAPI.wait(ctrl.signal)
        .then((res) => {
          if (ctrl.signal.aborted) return;
          console.log('[Exchange] wait 응답:', res.data);
          setReceivedProfile(res.data as MyProfileResponse);
          setModalStep('PREVIEW');
          setIsWaiting(false);
        })
        .catch((err) => {
          if (ctrl.signal.aborted) return;
          console.error('[Exchange] wait 실패:', err);
          const status = (err as AxiosError)?.response?.status;
          if (status === 409) {
            // 409: 상대방이 교환 대기 중이 아님 — 교환 중단 + 모달 닫기
            openErrorDialog({ title: '프로필 교환', message: '상대방이 교환 대기 중이 아닙니다' });
            resetState();
            onForceCloseRef.current?.();
          } else if (status === 504) {
            // 504 타임아웃 시 QR 재발급 콜백 호출 + wait 자동 재시작
            onWaitTimeoutRef.current?.();
            const newController = new AbortController();
            abortRef.current = newController;
            executeWait(newController);
          } else {
            openErrorDialog({ title: '프로필 교환', message: '교환 대기 중 오류가 발생했습니다' });
            resetState();
            onForceCloseRef.current?.();
          }
        });
    };

    executeWait(controller);
  }, [resetState]);

  /**
   * # cancelWait
   * ---
   * - 간단설명: 클라이언트 abort + 서버 cancel + 전체 상태 리셋
   */
  const cancelWait = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;

    ExchangeAPI.cancel().catch((err) => {
      console.error('[Exchange] cancel 실패:', err);
    });

    setReceivedProfile(null);
    setModalStep('QR');
    setIsWaiting(false);
  }, []);

  /**
   * # acceptExchange
   * ---
   * - 간단설명: 교환 수락 — accept API 호출 후 결과 페이지로 이동
   * ---
   * @param navigation 네비게이션 객체
   */
  const acceptExchange = useCallback(async (navigation: NavigationPropType) => {
    if (!receivedProfile) return;
    setModalStep('ACCEPTING');

    try {
      const { data } = await ExchangeAPI.accept(receivedProfile.id);
      console.log('[Exchange] accept 응답:', data);

      if (data.status === 'ACCEPTED' && data.result) {
        useExchangeFlowStore.setState({
          scannedProfile: data.result.profile ?? useExchangeFlowStore.getState().scannedProfile,
          exchangeResult: data.result,
          step: ExchangeFlowStep.RESULT,
        });
        logProfileExchangeCompleted();
        resetState();
        onForceCloseRef.current?.();
        navigation.navigate('exchangeResult');
      } else {
        openErrorDialog({ title: '프로필 교환', message: '교환이 완료되지 않았습니다' });
        resetState();
        onForceCloseRef.current?.();
      }
    } catch (err) {
      console.error('[Exchange] accept 실패:', err);
      const status = (err as AxiosError)?.response?.status;
      if (status === 409) {
        // 409: 상대방이 교환 대기 중이 아님 — 교환 중단 + 모달 닫기
        openErrorDialog({ title: '프로필 교환', message: '상대방이 교환 대기 중이 아닙니다' });
        resetState();
        onForceCloseRef.current?.();
      } else if (status === 504) {
        openErrorDialog({ title: '프로필 교환', message: '교환 시간이 만료되었습니다. 다시 시도해 주세요' });
        resetState();
        onForceCloseRef.current?.();
      } else {
        openErrorDialog({ title: '프로필 교환', message: '교환 수락 중 오류가 발생했습니다' });
        resetState();
        onForceCloseRef.current?.();
      }
    }
  }, [receivedProfile, resetState]);

  /**
   * # declineExchange
   * ---
   * - 간단설명: 교환 거절 — decline API 호출 후 상태 리셋
   */
  const declineExchange = useCallback(async () => {
    if (!receivedProfile) return;

    try {
      await ExchangeAPI.decline(receivedProfile.id);
    } catch (err) {
      console.error('[Exchange] decline 실패:', err);
    }

    resetState();
    onForceCloseRef.current?.();
  }, [receivedProfile, resetState]);

  return {
    receivedProfile,
    modalStep,
    isWaiting,
    startWait,
    cancelWait,
    acceptExchange,
    declineExchange,
    setModalStep,
    resetState,
  };
}
