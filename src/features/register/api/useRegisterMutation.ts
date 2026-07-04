import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProfileAPI, type ProfileRegisterRequest } from '@/entities/user';

/**
 * # useRegisterMutation
 * ---
 * - 간단설명: 프로필 등록 mutation 훅 (POST /profile)
 * - 제약사항 및 특이사항:
 *   - 성공 시 프로필 쿼리 캐시 무효화
 *   - ProfileRegisterRequest 형식으로 데이터 전달
 * ---
 * @example
 * const { mutate, isPending } = useRegisterMutation();
 * mutate({ nickname: '홍길동', gender: 'M', bio: '안녕하세요', interests: ['TRAVEL'] });
 */
export default function useRegisterMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProfileRegisterRequest) => {
      return ProfileAPI.registerProfile(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
