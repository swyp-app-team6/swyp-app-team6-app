/**
 * 교환 플로우 단계
 * - idle = 스캔 대기
 * - confirm = 교환 확인 모달
 * - preview = 내 프로필 미리보기
 * - loading = 교환 대기 중
 * - result = 공통 관심사 결과
 */
export type ExchangeFlowStep =
  | 'idle'
  | 'confirm'
  | 'preview'
  | 'loading'
  | 'result';

/**
 * QR 코드에 인코딩되는 교환 페이로드
 * - type = 페이로드 식별자 ('swyp_exchange')
 * - userId = 프로필 소유자 ID
 * - token = 교환 토큰
 * - expiresAt = 만료 시간 (Unix ms)
 */
export interface QRExchangePayload {
  /** 페이로드 식별자 */
  type: 'swyp_exchange';
  /** 프로필 소유자 ID */
  userId: number;
  /** 교환 토큰 */
  token: string;
  /** 만료 시간 (Unix ms) */
  expiresAt: number;
}
