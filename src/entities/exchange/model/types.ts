import type { MyProfileResponse } from '@/entities/user';

/**
 * 교환 결과 상태
 * - ACCEPTED = 수락됨
 * - DECLINED = 거절됨
 */
export type ExchangeStatus = 'ACCEPTED' | 'DECLINED';

/**
 * 교환 결과 상세 데이터
 * - exchange_id = 교환 ID
 * - exchanged_at = 교환 시간
 * - is_matched = 관심사 매칭 여부
 * - matched_interests = 매칭된 관심사 목록 ({type, label} 객체 배열)
 * - memo = 후기 메모
 * - score = 점수
 * - is_liked = 좋아요 여부
 * - profile = 상대방 프로필
 */
export interface ExchangeResult {
  /** 교환 ID: 교환 id는 이걸 써야 함 */
  exchange_id: number;
  /** 교환 시간 */
  exchanged_at: string;
  /** 관심사 매칭 여부 */
  is_matched: boolean;
  /** 매칭된 관심사 목록 */
  matched_interests: { type: string; label: string }[];
  /** 후기 메모 */
  memo?: string;
  /** 점수 */
  score?: number;
  /** 좋아요 여부 */
  is_liked: boolean;
  /** 상대방 프로필 */
  profile: MyProfileResponse;
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
