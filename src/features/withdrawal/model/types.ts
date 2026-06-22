/**
 * 탈퇴 플로우 단계
 * - INFO = 안내
 * - REASON = 사유 선택
 * - CONFIRM = 최종 확인
 * - COMPLETE = 완료
 */
export type WithdrawalStep = 'info' | 'reason' | 'confirm' | 'complete';

/**
 * 탈퇴 사유 목록
 */
export const WITHDRAWAL_REASONS = [
  '사용 빈도가 낮아서',
  '원하는 기능이 없어서',
  '다른 서비스를 이용하려고',
  '개인정보 우려',
  '기타',
] as const;

export type WithdrawalReason = (typeof WITHDRAWAL_REASONS)[number];
