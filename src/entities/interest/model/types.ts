import type { INTEREST } from '@/shared/enums';

/**
 * 관심사 항목
 * - type: 관심사 enum 값
 * - label: 화면 표시 라벨
 */
export interface InterestItem {
  /** 관심사 타입 */
  type: INTEREST;
  /** 화면 표시 라벨 */
  label: string;
}

/**
 * 관심사 목록 응답 (GET /interests)
 * - interests: 선택 가능한 관심사 목록
 */
export interface InterestResponse {
  /** 관심사 목록 */
  interests: InterestItem[];
}
