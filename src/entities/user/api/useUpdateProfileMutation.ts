import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileAPI } from './profileApi';
import type { ProfileUpdateRequest } from '../model/types';

/**
 * # useUpdateProfileMutation
 * ---
 * - 간단설명: 프로필 수정 mutation 훅 (PATCH /profile)
 * - 제약사항 및 특이사항:
 *   - 성공 시 프로필 쿼리 캐시 무효화
 *   - 변경할 필드만 전송
 * ---
 * @example
 * const { mutate: updateProfile, isPending } = useUpdateProfileMutation();
 * updateProfile({ nickname: '새닉네임' });
 */
export default function useUpdateProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileUpdateRequest) => ProfileAPI.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ProfileAPI.query._def });
    },
  });
}
