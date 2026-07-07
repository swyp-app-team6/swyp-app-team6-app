/**
 * 약관 유형
 * - SERVICE = 서비스 이용약관
 * - PRIVACY = 개인정보 처리방침
 * - AGE_OVER_14 = 만 14세 이상
 */
export type TermsType = 'SERVICE' | 'PRIVACY' | 'AGE_OVER_14';

/**
 * 약관 항목 (GET /terms 응답의 개별 항목)
 * - type: 약관 유형
 * - required: 필수 동의 여부
 * - version: 약관 버전 (개정 시 증가)
 * - label: 약관 명칭
 * - content_url: 약관 상세 내용 링크 (없으면 null)
 */
export interface TermsItem {
  type: TermsType;
  required: boolean;
  version: number;
  label: string;
  content_url: string | null;
}

/**
 * GET /terms 응답
 */
export interface TermsListResponse {
  terms: TermsItem[];
}

/**
 * POST /terms/agreements 요청
 * - agreed_types: 동의한 약관 유형 목록 (required: true인 항목 전부 포함 필수)
 */
export interface TermsAgreementRequest {
  agreed_types: TermsType[];
}

/**
 * POST /terms/agreements 응답
 * - agreed_types: 동의 처리된 약관 유형
 * - agreed_at: 동의 처리 시각
 */
export interface TermsAgreementResponse {
  agreed_types: TermsType[];
  agreed_at: string;
}
