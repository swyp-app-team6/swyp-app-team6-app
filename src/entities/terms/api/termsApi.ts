import { API } from '@/shared/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type {
  TermsListResponse,
  TermsAgreementRequest,
  TermsAgreementResponse,
} from '../model/types';

/**
 * # TermsAPI
 * ---
 * - 간단설명: 약관 관련 API를 정적 메서드로 관리하는 클래스
 * - 제약사항 및 특이사항:
 *   - 모든 엔드포인트 Bearer Token 필수 (skipAuth 없음)
 *   - POST /terms/agreements는 필수 약관 누락 시 400 반환 (부분 저장 없음)
 * ---
 * @example
 * const { data } = await TermsAPI.fetchTerms();
 * await TermsAPI.agreeTerms({ agreed_types: ['SERVICE', 'PRIVACY', 'AGE_OVER_14'] });
 */
export class TermsAPI {
  /**
   * # fetchTerms
   * ---
   * - 간단설명: 약관 종류/필수 여부/버전/명칭/내용 링크 목록을 조회
   * ---
   */
  static fetchTerms() {
    return API.get<TermsListResponse>('/terms');
  }

  /**
   * # agreeTerms
   * ---
   * - 간단설명: 사용자가 동의 체크한 약관 종류를 서버에 전송
   * - 제약사항 및 특이사항:
   *   - required: true인 항목 전부 포함 필수 (누락 시 400)
   *   - 부분 저장 없음 — 하나라도 빠지면 전체 거부
   * ---
   * @param data 동의한 약관 유형 목록
   */
  static agreeTerms(data: TermsAgreementRequest) {
    return API.post<TermsAgreementResponse>('/terms/agreements', data);
  }

  /** 쿼리 키 팩토리 */
  static query = createQueryKeys('terms', {
    list: () => ({
      queryKey: ['list'],
      queryFn: async () => {
        const { data } = await TermsAPI.fetchTerms();
        return data;
      },
    }),
  });
}
