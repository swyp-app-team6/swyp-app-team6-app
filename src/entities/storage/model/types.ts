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
/** 관심사 항목 */
export interface InterestItem {
  /** 관심사 코드 */
  type: string;
  /** 관심사 한글 라벨 */
  label: string;
}

const API_TO_BADGE: Record<string, BadgeLevel> = {
  SHOOTING_STAR: 'star',
  GALAXY: 'galaxy',
  SOLA: 'solar',
  LUNA: 'luna',
};

const BADGE_TO_API: Record<BadgeLevel, string> = {
  star: 'SHOOTING_STAR',
  galaxy: 'GALAXY',
  solar: 'SOLA',
  luna: 'LUNA',
};

/**
 * # apiValueToCosmicType
 * ---
 * - 간단설명: API cosmic_type 문자열을 앱의 BadgeLevel로 변환
 * ---
 * @param apiValue API 응답의 cosmic_type 값
 * @example apiValueToCosmicType('SHOOTING_STAR') // 'star'
 */
export function apiValueToCosmicType(apiValue: string): BadgeLevel {
  return API_TO_BADGE[apiValue] ?? 'star';
}

/**
 * # cosmicTypeToApiValue
 * ---
 * - 간단설명: 앱의 BadgeLevel을 API cosmic_type 문자열로 변환
 * ---
 * @param badge 앱의 BadgeLevel 값
 * @example cosmicTypeToApiValue('star') // 'SHOOTING_STAR'
 */
export function cosmicTypeToApiValue(badge: BadgeLevel): string {
  return BADGE_TO_API[badge];
}

/**
 * GET /exchange/archive 응답의 개별 교환 프로필
 */
export interface ExchangeArchiveItem {
  exchange_id: number;
  nickname: string;
  cosmic_type: string;
  cosmic_type_image_key: string;
  interests: InterestItem[];
  bio: string;
  matched_interests: InterestItem[];
  memo: string | null;
  score: number | null;
  is_liked: boolean;
  exchanged_at: string;
}

/**
 * GET /exchange/archive 페이지네이션 응답
 */
export interface ExchangeArchiveResponse {
  exchanges: ExchangeArchiveItem[];
  total_count: number;
  next_cursor: string | null;
}

/**
 * GET /exchange/archive 요청 파라미터
 */
export interface ExchangeArchiveParams {
  keyword?: string;
  regions?: string[];
  types?: string[];
  liked?: boolean;
  sort?: 'RECENT' | 'OLDEST';
  cursor?: string;
  size?: number;
}

/**
 * GET /exchange/archive/{exchangeId} 상세 응답
 */
export interface ExchangeArchiveDetailResponse {
  exchange_id: number;
  exchanged_at: string;
  is_matched: boolean;
  matched_interests: InterestItem[];
  memo: string;
  score: number;
  is_liked: boolean;
  my_profile: {
    nickname: string;
    cosmic_type: string;
    cosmic_type_image_key: string;
  };
  profile: Record<string, unknown>;
}

export interface ExchangeLikeRequest { liked: boolean; }
export interface ExchangeLikeResponse { exchange_id: number; is_liked: boolean; }
export interface ExchangeDeleteRequest { exchange_ids: number[]; }
export interface ExchangeDeleteResponse { deleted_count: number; deleted_ids: number[]; }

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
