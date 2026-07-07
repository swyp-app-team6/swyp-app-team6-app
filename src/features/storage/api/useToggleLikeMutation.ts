import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { ExchangeArchiveAPI } from '@/entities/storage';
import type { ExchangeArchiveResponse } from '@/entities/storage';

/**
 * # useToggleLikeMutation
 * ---
 * - 간단설명: 보관함 항목의 좋아요를 토글하는 mutation 훅
 * - 제약사항 및 특이사항:
 *   - optimistic update 적용 — UI 즉시 반영 후 실패 시 rollback
 * ---
 * @example
 * const { mutate } = useToggleLikeMutation();
 * mutate({ exchangeId: 1, liked: true });
 */
export default function useToggleLikeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ exchangeId, liked }: { exchangeId: number; liked: boolean }) =>
      ExchangeArchiveAPI.toggleLike(exchangeId, { liked }),

    onMutate: async ({ exchangeId, liked }) => {
      await queryClient.cancelQueries({ queryKey: ExchangeArchiveAPI.query._def });

      const previousData = queryClient.getQueriesData<
        InfiniteData<ExchangeArchiveResponse>
      >({ queryKey: ExchangeArchiveAPI.query._def });

      queryClient.setQueriesData<InfiniteData<ExchangeArchiveResponse>>(
        { queryKey: ExchangeArchiveAPI.query._def },
        (old) => {
          if (!old) return old;
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              exchanges: page.exchanges.map((item) =>
                item.exchange_id === exchangeId
                  ? { ...item, is_liked: liked }
                  : item,
              ),
            })),
          };
        },
      );

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousData) {
        for (const [key, data] of context.previousData) {
          queryClient.setQueryData(key, data);
        }
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ExchangeArchiveAPI.query._def });
    },
  });
}
