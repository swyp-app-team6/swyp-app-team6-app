import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/**
 * 프로필 등록 단계 상태
 * - currentStep: 현재 단계 (0~5, 총 6단계)
 * - isInitialized: 폼 초기화 완료 여부 (remount 시 중복 초기화 방지)
 */
interface RegisterStepStore {
  currentStep: number;
  isInitialized: boolean;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetStep: () => void;
}

/**
 * # useRegisterStepStore
 * ---
 * - 간단설명: 프로필 등록 단계(currentStep) 전용 Zustand 스토어
 * - 제약사항 및 특이사항:
 *   - 폼 데이터(useRegisterFormStore)와 분리하여 독립 관리
 *   - 컴포넌트 언마운트/재마운트 시 단계 유실 방지 목적
 *   - 총 6단계 (0~5), 범위 밖 값은 클램프 처리
 * ---
 * @example
 * const { currentStep, nextStep, prevStep } = useRegisterStepStore();
 */
const useRegisterStepStore = create<RegisterStepStore>()(
  immer((set) => ({
    currentStep: 0,
    isInitialized: false,

    /**
     * 현재 단계를 설정 (0~5 범위 클램프)
     * @param step 이동할 단계 번호
     */
    setStep: (step: number) => {
      set((state) => {
        state.currentStep = Math.max(0, Math.min(5, step));
      });
    },

    /**
     * 다음 단계로 이동 (최대 5)
     */
    nextStep: () => {
      set((state) => {
        if (state.currentStep < 5) {
          state.currentStep += 1;
        }
      });
    },

    /**
     * 이전 단계로 이동 (최소 0)
     */
    prevStep: () => {
      set((state) => {
        if (state.currentStep > 0) {
          state.currentStep -= 1;
        }
      });
    },

    /**
     * 단계를 초기값(0)으로 리셋
     */
    resetStep: () => {
      set((state) => {
        state.currentStep = 0;
        state.isInitialized = false;
      });
    },
  })),
);

export default useRegisterStepStore;
