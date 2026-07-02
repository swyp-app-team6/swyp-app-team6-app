import type { BadgeLevel } from '@/shared/ui';

/**
 * 보관함 프로필 카드 데이터
 * - id = 프로필 고유 ID
 * - name = 이름
 * - age = 나이
 * - location = 거주 지역
 * - job = 직업
 * - cosmicType = 우주 유형
 * - imageUri = 프로필 이미지 URI
 * - isFavorited = 즐겨찾기 여부
 */
export interface StorageProfile {
  /** 프로필 고유 ID */
  id: number;
  /** 이름 */
  name: string;
  /** 나이 */
  age: number;
  /** 거주 지역 */
  location: string;
  /** 직업 */
  job: string;
  /** 우주 유형 */
  cosmicType: BadgeLevel;
  /** 프로필 이미지 URI */
  imageUri: string;
  /** 즐겨찾기 여부 */
  isFavorited: boolean;
}

/**
 * cosmicType → 한글 라벨 매핑
 * - star = 슈팅스타 유형
 * - galaxy = 갤럭시 유형
 * - solar = 솔라 유형
 * - luna = 루나 유형
 */
export const COSMIC_TYPE_LABEL: Record<BadgeLevel, string> = {
  star: '슈팅스타 유형',
  galaxy: '갤럭시 유형',
  solar: '솔라 유형',
  luna: '루나 유형',
};

/**
 * 교환 프로필 상세 데이터
 * - StorageProfile 기본 필드에 상세 정보 추가
 * - interests = 관심사 목록
 * - commonInterests = 공통 관심사 목록
 * - bio = 자기소개
 * - region = 시/도 코드
 * - subArea = 세부 지역
 * - jobField = 직업/직장
 * - tmiAnswers = TMI 답변 목록
 * - cosmicTypeDesc = 유형 설명
 * - isBlocked = 차단 여부
 */
export interface StorageProfileDetail extends StorageProfile {
  /** 관심사 목록 */
  interests: string[];
  /** 공통 관심사 목록 */
  commonInterests: string[];
  /** 자기소개 */
  bio: string;
  /** 시/도 코드 */
  region: string;
  /** 세부 지역 */
  subArea: string;
  /** 직업/직장 */
  jobField: string;
  /** TMI 답변 목록 */
  tmiAnswers: { questionId: string; answer: string }[];
  /** 유형 설명 */
  cosmicTypeDesc: string;
}
