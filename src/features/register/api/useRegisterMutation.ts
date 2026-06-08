import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/entities/user';

/**
 * # useRegisterMutation
 * ---
 * - 간단설명: 회원가입 mutation 훅
 * - 제약사항 및 특이사항: API 연동 전 임시 더미 토큰 반환, 성공 시 authStore에 토큰 저장
 * ---
 * @example
 * const { mutate, isPending } = useRegisterMutation();
 * mutate({ id: 'user', password: 'pass' });
 */
export default function useRegisterMutation() {
  const { setTokens } = useAuthStore();
  return useMutation({
    mutationFn: async (_params: { id: string; password: string }) => {
      // TODO: API 형식에 맞춰 회원가입 작성
      return {
        accessToken: 'temp-access-token',
        refreshToken: 'temp-refresh-token',
      };
    },
    onSuccess: ({ accessToken, refreshToken }) => {
      setTokens({ accessToken, refreshToken });
    },
  });
}
