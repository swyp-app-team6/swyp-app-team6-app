import { useQuery } from '@tanstack/react-query';
import { TermsAPI } from '@/entities/terms';
import useAuthStore from '@/entities/user/model/authStore';

/**
 * # useTermsQuery
 * ---
 * - 간단설명: GET /terms 약관 목록 조회 훅
 * - 제약사항 및 특이사항:
 *   - accessToken이 없으면 실행하지 않음
 *   - enabled 파라미터로 lazy fetch 지원 (바텀시트 열릴 때만 호출)
 * ---
 * @param enabled 쿼리 실행 여부 (기본값: true)
 * ---
 * @example
 * const { data, isLoading } = useTermsQuery(isOpen);
 */
export default function useTermsQuery(enabled = true) {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    ...TermsAPI.query.list(),
    enabled: !!accessToken && enabled,
  });
}
