import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExchangeArchiveAPI } from '@/entities/storage';
import type { ReviewScore } from '@/entities/storage';

/**
 * # useUpdateReviewMutation
 * ---
 * - 간단설명: 만남 후기(만족도 + 메모) 등록/수정 mutation 훅
 * - 제약사항 및 특이사항:
 *   - 성공 시 list 및 detail 쿼리 캐시 무효화
 * ---
 * @example
 * const { mutate, isPending } = useUpdateReviewMutation();
 * mutate({ exchangeId: 1, score: 1, review: '좋았습니다' });
 */
export default function useUpdateReviewMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      exchangeId,
      score,
      review,
    }: {
      exchangeId: number;
      score: ReviewScore;
      review?: string;
    }) => ExchangeArchiveAPI.updateReview(exchangeId, { score, review }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ExchangeArchiveAPI.query.list._def,
      });
      queryClient.invalidateQueries({
        queryKey: ExchangeArchiveAPI.query.detail._def,
      });
    },
  });
}
