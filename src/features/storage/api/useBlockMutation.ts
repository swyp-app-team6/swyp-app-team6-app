import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ExchangeArchiveAPI } from '@/entities/storage';

/**
 * # useBlockMutation
 * ---
 * - 간단설명: 교환 프로필 유저 차단 요청 뮤테이션 훅
 * - 제약사항 및 특이사항:
 *   - 차단 성공 시 보관함 목록 쿼리 자동 무효화
 *   - 차단 시 양쪽 프로필에서 상대방 제거됨
 * ---
 * @param profileExchangeId 차단할 교환 프로필 ID
 * ---
 * @example
 * ```tsx
 * const { mutate: block } = useBlockMutation();
 * block(1, { onSuccess: () => console.log('차단 완료') });
 * ```
 */
export default function useBlockMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileExchangeId: number) =>
      ExchangeArchiveAPI.blockUser({
        profile_exchange_id: profileExchangeId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ExchangeArchiveAPI.query._def,
      });
    },
  });
}
