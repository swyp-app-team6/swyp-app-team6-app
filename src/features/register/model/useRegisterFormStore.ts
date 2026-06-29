import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { Interest } from '@/entities/user';
import type { RegisterFormState, TMIAnswer } from './types';

/**
 * 프로필 등록 폼 스토어 상태
 * - currentStep: 현재 단계 (0~4)
 * - form: 폼 데이터 객체
 */
interface RegisterFormStore {
  currentStep: number;
  form: RegisterFormState;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateForm: (partial: Partial<RegisterFormState>) => void;
  addTMIAnswer: (answer: TMIAnswer) => void;
  removeTMIAnswer: (questionId: string) => void;
  reset: () => void;
  isDirty: () => boolean;
  isStep1Valid: () => boolean;
  isStep2Valid: () => boolean;
}

/** 폼 초기 상태 */
const INITIAL_FORM: RegisterFormState = {
  nickname: '',
  profileImageUri: null,
  profileImageKey: null,
  gender: null,
  bio: '',
  interests: [],
  tmiAnswers: [],
};

/**
 * # useRegisterFormStore
 * ---
 * - 간단설명: 프로필 등록 5단계 폼 상태를 관리하는 Zustand 스토어
 * - 제약사항 및 특이사항:
 *   - form 객체 1개로 모든 필드 통합 관리
 *   - immer middleware로 직접 수정 패턴 사용
 *   - 등록 완료 또는 이탈 시 반드시 reset() 호출
 * ---
 * @example
 * const { form, currentStep, updateForm, nextStep } = useRegisterFormStore();
 * updateForm({ nickname: '홍길동' });
 */
const useRegisterFormStore = create<RegisterFormStore>()(
  immer((set, get) => ({
    currentStep: 0,
    form: { ...INITIAL_FORM },

    /**
     * 현재 단계를 설정 (0~4 범위 클램프)
     * @param step 이동할 단계 번호
     */
    setStep: (step: number) => {
      set((state) => {
        state.currentStep = Math.max(0, Math.min(3, step));
      });
    },

    /**
     * 다음 단계로 이동 (최대 4)
     */
    nextStep: () => {
      set((state) => {
        if (state.currentStep < 3) {
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
     * 폼 데이터 부분 업데이트
     * @param partial 업데이트할 필드들
     */
    updateForm: (partial: Partial<RegisterFormState>) => {
      set((state) => {
        Object.assign(state.form, partial);
      });
    },

    /**
     * TMI 답변 추가 (기존 답변이 있으면 교체)
     * @param answer TMI 답변 객체
     */
    addTMIAnswer: (answer: TMIAnswer) => {
      set((state) => {
        const idx = state.form.tmiAnswers.findIndex(
          (a) => a.questionId === answer.questionId,
        );
        if (idx >= 0) {
          state.form.tmiAnswers[idx] = answer;
        } else {
          state.form.tmiAnswers.push(answer);
        }
      });
    },

    /**
     * TMI 답변 제거
     * @param questionId 제거할 질문 ID
     */
    removeTMIAnswer: (questionId: string) => {
      set((state) => {
        state.form.tmiAnswers = state.form.tmiAnswers.filter(
          (a) => a.questionId !== questionId,
        );
      });
    },

    /**
     * 폼 상태를 초기값으로 리셋
     */
    reset: () => {
      set((state) => {
        state.currentStep = 0;
        state.form = { ...INITIAL_FORM, tmiAnswers: [] };
      });
    },

    /**
     * 폼에 입력된 데이터가 있는지 확인
     */
    isDirty: () => {
      const { form } = get();
      return (
        form.nickname.length > 0 ||
        form.profileImageUri !== null ||
        form.gender !== null ||
        form.bio.length > 0 ||
        form.interests.length > 0 ||
        form.tmiAnswers.length > 0
      );
    },

    /**
     * 1단계 유효성 검사 (필수 정보)
     * - 이름 2~10자, 한글/영문만
     * - 성별 선택 필수
     * - 자기소개 10~100자
     * - 프로필 사진은 선택사항
     */
    isStep1Valid: () => {
      const { form } = get();
      const nicknameRegex = /^[가-힣a-zA-Z]{2,10}$/;
      return (
        nicknameRegex.test(form.nickname) &&
        form.gender !== null &&
        form.bio.length >= 10 &&
        form.bio.length <= 100
      );
    },

    /**
     * 2단계 유효성 검사 (관심사)
     * - 3~5개 선택
     */
    isStep2Valid: () => {
      const { form } = get();
      return form.interests.length >= 3 && form.interests.length <= 5;
    },
  })),
);

export default useRegisterFormStore;
