import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExchangeArchiveAPI } from '@/entities/storage';

/**
 * # useDeleteArchivesMutation
 * ---
 * - 간단설명: 보관함 항목을 다건 삭제하는 mutation 훅
 * - 제약사항 및 특이사항:
 *   - 삭제 성공 시 목록 캐시 무효화 및 삭제된 항목의 상세 캐시 제거
 * ---
 * @example
 * const { mutate } = useDeleteArchivesMutation();
 * mutate({ exchange_ids: [1, 2, 3] });
 */
export default function useDeleteArchivesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ exchange_ids }: { exchange_ids: number[] }) =>
      ExchangeArchiveAPI.deleteArchives({ exchange_ids }),

    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ExchangeArchiveAPI.query._def });

      for (const id of response.data.deleted_ids) {
        queryClient.removeQueries({
          queryKey: ExchangeArchiveAPI.query.detail(id).queryKey,
        });
      }
    },
  });
}
