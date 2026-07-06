import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileAPI } from './profileApi';

/**
 * # useDeleteProfileMutation
 * ---
 * - 간단설명: 프로필 삭제 mutation 훅 (DELETE /profile)
 * - 제약사항 및 특이사항:
 *   - 성공 시 프로필 쿼리 캐시 무효화
 * ---
 * @example
 * const { mutate: deleteProfile, isPending } = useDeleteProfileMutation();
 * deleteProfile();
 */
export default function useDeleteProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => ProfileAPI.deleteProfile(),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ProfileAPI.query._def });
    },
  });
}
