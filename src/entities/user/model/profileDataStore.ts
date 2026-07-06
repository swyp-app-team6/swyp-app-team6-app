import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { INTEREST } from './types';
import type { TMIQuestionType } from '@/shared/enums';

/**
 * TMI 답변
 * - questionId: 질문 ID (API 기준 number)
 * - answerKind: 답변 종류 ('CHOICE' | 'TEXT')
 * - questionType: 질문 유형
 * - question: 질문 텍스트
 * - answer: 선택한 답변 또는 입력한 텍스트
 * - answerId: 선택형 답변 ID (선택형일 때만)
 */
interface TMIAnswer {
  questionId: number;
  answerKind: 'CHOICE' | 'TEXT';
  questionType: TMIQuestionType;
  question: string;
  answer: string;
  answerId?: number;
}

/**
 * 프로필 미리보기용 데이터 상태
 * - nickname: 이름
 * - profileImageUri: 로컬 이미지 URI (미리보기용)
 * - profileImageKey: S3 업로드 후 발급된 이미지 키
 * - gender: 성별 (M=남성, F=여성)
 * - age: 만 나이
 * - jobField: 직무분야
 * - region: 활동 지역 (시/도 코드)
 * - subArea: 활동 지역 하위 구/군
 * - bio: 자기소개
 * - interests: 관심사 목록
 * - tmiAnswers: TMI 답변 목록
 */
export interface ProfileData {
  nickname: string;
  profileImageUri: string | null;
  profileImageKey: string | null;
  gender: 'M' | 'F' | null;
  age: string;
  jobField: string;
  region: string;
  subArea: string;
  bio: string;
  interests: INTEREST[];
  tmiAnswers: TMIAnswer[];
}

interface ProfileDataStore {
  /** 프로필 데이터 */
  data: ProfileData;
  /** 프로필 데이터 전체 설정 */
  setProfileData: (data: ProfileData) => void;
  /** 프로필 데이터 부분 업데이트 */
  updateProfileData: (partial: Partial<ProfileData>) => void;
  /** 프로필 데이터 초기화 */
  reset: () => void;
}

/** 프로필 데이터 초기 상태 */
const INITIAL_DATA: ProfileData = {
  nickname: '',
  profileImageUri: null,
  profileImageKey: null,
  gender: null,
  age: '',
  jobField: '',
  region: '',
  subArea: '',
  bio: '',
  interests: [],
  tmiAnswers: [],
};

/**
 * # useProfileDataStore
 * ---
 * - 간단설명: 프로필 미리보기 화면에서 사용하는 프로필 데이터 Zustand 스토어
 * - 제약사항 및 특이사항:
 *   - 등록 폼(useRegisterFormStore)의 데이터를 복사하여 저장
 *   - MyProfileView에서 읽기 전용으로 참조
 *   - 등록 완료 또는 화면 이탈 시 reset() 호출 필요
 * ---
 * @example
 * const { data, setProfileData } = useProfileDataStore();
 * setProfileData({ nickname: '홍길동', age: '28', ... });
 */
const useProfileDataStore = create<ProfileDataStore>()(
  immer((set) => ({
    data: { ...INITIAL_DATA },

    setProfileData: (data: ProfileData) => {
      set((state) => {
        state.data = { ...data };
      });
    },

    updateProfileData: (partial: Partial<ProfileData>) => {
      set((state) => {
        Object.assign(state.data, partial);
      });
    },

    reset: () => {
      set((state) => {
        state.data = { ...INITIAL_DATA, tmiAnswers: [] };
      });
    },
  })),
);

export default useProfileDataStore;
