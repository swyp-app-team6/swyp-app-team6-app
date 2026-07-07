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
