import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CosmicType } from '@/shared/enums';
import { CosmicAPI } from './cosmicApi';
import { ProfileAPI } from '@/entities/user';

/**
 * # useUpdateCosmicMutation
 * ---
 * - 간단설명: 코스믹 유형 수정 mutation 훅 (PATCH /profile/cosmic)
 * - 제약사항 및 특이사항:
 *   - 성공 시 프로필 쿼리 캐시 무효화
 *   - 응답 204 No Content
 * ---
 * @example
 * const { mutate: updateCosmic, isPending } = useUpdateCosmicMutation();
 * updateCosmic('GALAXY');
 */
export default function useUpdateCosmicMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cosmicType: CosmicType) => CosmicAPI.updateCosmic(cosmicType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ProfileAPI.query._def });
    },
  });
}
