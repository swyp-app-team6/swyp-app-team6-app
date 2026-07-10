import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExchangeArchiveAPI } from '@/entities/storage';

/**
 * # useUnblockMutation
 * ---
 * - 간단설명: 차단 해제 요청 뮤테이션 훅
 * - 제약사항 및 특이사항:
 *   - 해제 성공 시 차단 목록 쿼리 자동 무효화
 * ---
 * @example
 * ```tsx
 * const { mutate: unblock } = useUnblockMutation();
 * unblock(blockId, { onSuccess: () => console.log('차단 해제 완료') });
 * ```
 */
export default function useUnblockMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blockId: number) => ExchangeArchiveAPI.unblockUser(blockId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ExchangeArchiveAPI.query.blockList.queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: ExchangeArchiveAPI.query._def,
      });
    },
  });
}
