import { useQuery } from '@tanstack/react-query';
import { ExchangeArchiveAPI } from '@/entities/storage';
import useAuthStore from '@/entities/user/model/authStore';

/**
 * # useBlockListQuery
 * ---
 * - 간단설명: 차단한 유저 목록을 조회하는 React Query 훅
 * - 제약사항 및 특이사항:
 *   - 인증 토큰 존재 시에만 실행
 * ---
 * @example
 * const { data: blockedUsers } = useBlockListQuery();
 */
export default function useBlockListQuery() {
  const accessToken = useAuthStore((s) => s.accessToken);

  return useQuery({
    queryKey: ExchangeArchiveAPI.query.blockList.queryKey,
    queryFn: ExchangeArchiveAPI.query.blockList.queryFn,
    enabled: !!accessToken,
  });
}
