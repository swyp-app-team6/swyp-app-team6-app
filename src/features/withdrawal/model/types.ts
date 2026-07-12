/**
 * 탈퇴 사유 목록
 * - 서비스 이용이 불만족스럽습니다.
 * - 이미 다른 유사 서비스를 사용하고 있습니다.
 * - 너무 많은 이메일, 알림을 받습니다.
 * - 사유 없음
 * - 기타
 */
export const WITHDRAWAL_REASONS = [
  '서비스 이용이 불만족스럽습니다.',
  '이미 다른 유사 서비스를 사용하고 있습니다.',
  '너무 많은 이메일, 알림을 받습니다.',
  '사유 없음',
  '기타',
] as const;

/** 탈퇴 사유 타입 */
export type WithdrawalReason = (typeof WITHDRAWAL_REASONS)[number];

/**
 * 탈퇴 사유 코드
 * - SERVICE_UNSATISFIED = 서비스 이용이 불만족스럽습니다.
 * - USING_OTHER_SERVICE = 이미 다른 유사 서비스를 사용하고 있습니다.
 * - TOO_MANY_NOTIFICATIONS = 너무 많은 이메일, 알림을 받습니다.
 * - NO_REASON = 사유 없음
 * - ETC = 기타
 */
export const REASON_CODE_MAP: Record<WithdrawalReason, string> = {
  '서비스 이용이 불만족스럽습니다.': 'SERVICE_UNSATISFIED',
  '이미 다른 유사 서비스를 사용하고 있습니다.': 'USING_OTHER_SERVICE',
  '너무 많은 이메일, 알림을 받습니다.': 'TOO_MANY_NOTIFICATIONS',
  '사유 없음': 'NO_REASON',
  '기타': 'ETC',
};

/**
 * 회원 탈퇴 요청 바디
 * - reasonCode = 탈퇴 사유 코드
 * - reasonDetail = 기타 사유 상세 (선택)
 */
export interface WithdrawalRequest {
  /** 탈퇴 사유 코드 */
  reasonCode: string;
  /** 기타 사유 상세 */
  reasonDetail?: string;
}
