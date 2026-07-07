import { useQuery } from '@tanstack/react-query';
import { ExchangeArchiveAPI } from './exchangeArchiveApi';
import useAuthStore from '@/entities/user/model/authStore';

/**
 * # useExchangeArchiveDetailQuery
 * ---
 * - 간단설명: 교환 보관함 상세 정보를 조회하는 React Query 훅
 * - 제약사항 및 특이사항:
 *   - 인증 토큰과 exchangeId 존재 시에만 실행
 * ---
 * @param exchangeId 교환 고유 ID
 * @example
 * const { data, isLoading } = useExchangeArchiveDetailQuery(1);
 */
export default function useExchangeArchiveDetailQuery(exchangeId: number) {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    ...ExchangeArchiveAPI.query.detail(exchangeId),
    enabled: !!accessToken && !!exchangeId,
  });
}
