import type { MyProfileResponse } from '@/entities/user';

/**
 * 교환 결과 상태
 * - ACCEPTED = 수락됨
 * - DECLINED = 거절됨
 */
export type ExchangeStatus = 'ACCEPTED' | 'DECLINED';

/**
 * 교환 결과 상세 데이터
 * - is_matched = 관심사 매칭 여부
 * - matched_interests = 매칭된 관심사 목록
 * - memo = 후기 메모
 * - score = 점수
 * - created_at = 교환 시간
 * - profile_response = 상대방 프로필
 */
export interface ExchangeResult {
  /** 관심사 매칭 여부 */
  is_matched: boolean;
  /** 매칭된 관심사 목록 */
  matched_interests: { type: string; label: string }[];
  /** 후기 메모 */
  memo?: string;
  /** 점수 */
  score?: number;
  /** 교환 시간 */
  created_at: string;
  /** 상대방 프로필 */
  profile_response: MyProfileResponse;
}

/**
 * 교환 API 응답
 * - status = 수락/거절 상태
 * - result = 수락 시에만 포함되는 교환 결과
 */
export interface ExchangeResponse {
  /** 수락/거절 상태 */
  status: ExchangeStatus;
  /** 교환 결과 (ACCEPTED 시에만 포함) */
  result?: ExchangeResult;
}
