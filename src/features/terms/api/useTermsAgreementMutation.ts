import { useMutation } from '@tanstack/react-query';
import { TermsAPI } from '@/entities/terms';
import type { TermsAgreementRequest } from '@/entities/terms';

/**
 * # useTermsAgreementMutation
 * ---
 * - 간단설명: POST /terms/agreements 약관 동의 처리 mutation 훅
 * - 제약사항 및 특이사항:
 *   - required: true인 약관이 모두 포함되어야 함 (누락 시 400 에러)
 *   - 부분 저장 없음 — 하나라도 빠지면 전체 거부
 * ---
 * @example
 * const { mutateAsync } = useTermsAgreementMutation();
 * await mutateAsync({ agreed_types: ['SERVICE', 'PRIVACY', 'AGE_OVER_14'] });
 */
export default function useTermsAgreementMutation() {
  return useMutation({
    mutationFn: (data: TermsAgreementRequest) => TermsAPI.agreeTerms(data),
  });
}
