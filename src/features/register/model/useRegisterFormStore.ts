import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { tmiKey, type RegisterFormState, type TMIAnswer } from './types';

/**
 * 프로필 등록 폼 스토어 상태
 * - form: 폼 데이터 객체
 * - 단계 관리는 React Navigation 스택에서 수행
 */
interface RegisterFormStore {
  form: RegisterFormState;
  updateForm: (partial: Partial<RegisterFormState>) => void;
  addTMIAnswer: (answer: TMIAnswer) => void;
  removeTMIAnswer: (answerKind: 'CHOICE' | 'TEXT', questionId: number) => void;
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
  gender: 'M',
  age: '',
  jobField: '',
  region: '',
  subArea: '',
  bio: '',
  interests: [],
  cosmicType: null,
  tmiAnswers: [],
};

/**
 * # useRegisterFormStore
 * ---
 * - 간단설명: 프로필 등록 폼 데이터를 관리하는 Zustand 스토어
 * - 제약사항 및 특이사항:
 *   - form 객체 1개로 모든 필드 통합 관리
 *   - immer middleware로 직접 수정 패턴 사용
 *   - 단계(currentStep)는 useRegisterStepStore에서 별도 관리
 *   - 등록 완료 또는 이탈 시 반드시 reset() 호출
 * ---
 * @example
 * const { form, updateForm } = useRegisterFormStore();
 * updateForm({ nickname: '홍길동' });
 */
const useRegisterFormStore = create<RegisterFormStore>()(
  immer((set, get) => ({
    form: { ...INITIAL_FORM },

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
        const key = tmiKey(answer.answerKind, answer.questionId);
        const idx = state.form.tmiAnswers.findIndex(
          (a) => tmiKey(a.answerKind, a.questionId) === key,
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
     * @param answerKind 답변 종류 (CHOICE/TEXT)
     * @param questionId 제거할 질문 ID
     */
    removeTMIAnswer: (answerKind: 'CHOICE' | 'TEXT', questionId: number) => {
      set((state) => {
        const key = tmiKey(answerKind, questionId);
        state.form.tmiAnswers = state.form.tmiAnswers.filter(
          (a) => tmiKey(a.answerKind, a.questionId) !== key,
        );
      });
    },

    /**
     * 폼 상태를 초기값으로 리셋
     */
    reset: () => {
      set((state) => {
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
        form.age.length > 0 ||
        form.jobField.length > 0 ||
        form.region.length > 0 ||
        form.bio.length > 0 ||
        form.interests.length > 0 ||
        form.tmiAnswers.length > 0
      );
    },

    /**
     * 1단계 유효성 검사 (필수 정보)
     * - 프로필 사진 등록 필수
     * - 이름 3~10자
     * - 성별 선택 필수
     */
    isStep1Valid: () => {
      const { form } = get();
      return (
        form.profileImageUri !== null &&
        form.nickname.length >= 3 &&
        form.gender !== null
      );
    },

    /**
     * 2단계 유효성 검사 (나이, 직무분야, 활동 지역)
     * - 나이: 입력 필수, 만 15세 이상 (14세 이하 불가)
     * - 직무분야: 입력 필수
     * - 활동 지역: 선택 필수
     */
    isStep2Valid: () => {
      const { form } = get();
      return (
        form.age.length > 0 &&
        Number(form.age) > 14 &&
        form.jobField.length > 0 &&
        form.region.length > 0
      );
    },
  })),
);

export default useRegisterFormStore;
