import { useInfiniteQuery } from '@tanstack/react-query';
import { ExchangeArchiveAPI } from './exchangeArchiveApi';
import useAuthStore from '@/entities/user/model/authStore';
import type { ExchangeArchiveParams } from '../model/types';

/**
 * # useExchangeArchiveListQuery
 * ---
 * - 간단설명: 교환 보관함 목록을 커서 기반 무한스크롤로 조회하는 React Query 훅
 * - 제약사항 및 특이사항:
 *   - 인증 토큰 존재 시에만 실행
 *   - params 변경 시 자동으로 refetch (queryKey에 포함)
 * ---
 * @param params 검색/필터/정렬/페이지 크기 파라미터 (cursor 제외)
 * @example
 * const { data, fetchNextPage, hasNextPage } = useExchangeArchiveListQuery({ size: 4 });
 */
export default function useExchangeArchiveListQuery(
  params?: Omit<ExchangeArchiveParams, 'cursor'>,
) {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useInfiniteQuery({
    queryKey: ExchangeArchiveAPI.query.list(params).queryKey,
    queryFn: async ({ pageParam }) => {
      const { data } = await ExchangeArchiveAPI.fetchList({
        ...params,
        cursor: pageParam,
      });
      return data;
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.next_cursor ?? undefined,
    enabled: !!accessToken,
  });
}
