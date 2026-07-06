import { create } from 'zustand';
import type { StorageProfileDetail } from '@/entities/storage';
import type { ExchangeFlowStep, QRExchangePayload } from './types';
import { computeCommonInterests, resolveScannedProfile } from './mockExchangeData';

interface ExchangeFlowState {
  /** 현재 교환 플로우 단계 */
  step: ExchangeFlowStep;
  /** 스캔된 QR 페이로드 */
  scannedPayload: QRExchangePayload | null;
  /** 스캔된 상대 프로필 */
  scannedProfile: StorageProfileDetail | null;
  /** 공통 관심사 목록 */
  commonInterests: string[];
  /** QR 스캔 완료 처리 — JSON 파싱 및 프로필 조회 후 confirm 단계로 전환 */
  onScanComplete: (rawValue: string) => void;
  /** 미리보기 단계로 전환 */
  goToPreview: () => void;
  /** 교환 시작 — 로딩 후 결과 단계로 전환, 완료 시 onComplete 콜백 호출 */
  startExchange: (myInterests: string[], onComplete?: () => void) => void;
  /** 교환 철회 — idle로 리셋 */
  cancelExchange: () => void;
  /** 전체 상태 초기화 */
  reset: () => void;
}

const initialState = {
  step: 'idle' as ExchangeFlowStep,
  scannedPayload: null,
  scannedProfile: null,
  commonInterests: [] as string[],
};

/**
 * # useExchangeFlowStore
 * ---
 * - 간단설명: QR 프로필 교환 플로우 상태 관리 스토어
 * - 제약사항 및 특이사항:
 *   - idle → confirm → preview → loading → result 단계 전환
 *   - startExchange는 2초 대기 후 공통관심사 계산하여 result로 전환
 *   - 목 데이터 기반 (추후 API 연동 시 교체)
 * ---
 */
const useExchangeFlowStore = create<ExchangeFlowState>((set, get) => ({
  ...initialState,

  onScanComplete: (rawValue: string) => {
    try {
      const payload: QRExchangePayload = JSON.parse(rawValue);

      if (payload.type !== 'swyp_exchange') {
        console.warn('유효하지 않은 QR 코드입니다.');
        return;
      }

      if (payload.expiresAt < Date.now()) {
        console.warn('만료된 QR 코드입니다.');
        return;
      }

      const profile = resolveScannedProfile(payload.userId);
      if (!profile) {
        console.warn('프로필을 찾을 수 없습니다.');
        return;
      }

      set({ scannedPayload: payload, scannedProfile: profile, step: 'confirm' });
    } catch {
      console.warn('QR 코드 파싱 실패:', rawValue);
    }
  },

  goToPreview: () => {
    set({ step: 'preview' });
  },

  startExchange: (myInterests: string[], onComplete?: () => void) => {
    set({ step: 'loading' });

    setTimeout(() => {
      const { scannedProfile } = get();
      if (!scannedProfile) return;

      const common = computeCommonInterests(
        myInterests,
        scannedProfile.interests,
      );

      set({ commonInterests: common, step: 'result' });
      onComplete?.();
    }, 2000);
  },

  cancelExchange: () => {
    set(initialState);
  },

  reset: () => {
    set(initialState);
  },
}));

export default useExchangeFlowStore;
