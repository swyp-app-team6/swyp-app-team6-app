import { useMutation } from '@tanstack/react-query'
import { useAuthStore } from '../../../../entities/user';

/**
 * # useDefaultLoginMutation
 * ---
 * - 간단설명: ID/비밀번호 기반 기본 로그인 mutation 훅
 * - 제약사항 및 특이사항: API 연동 전 임시 빈 토큰 반환, 성공 시 authStore에 토큰 및 유저 정보 저장
 * ---
 * @example
 * const { mutate, isPending } = useDefaultLoginMutation();
 * mutate();
 */
export default function useDefaultLoginMutation() {
  const { setTokens, setUser } = useAuthStore();
  return useMutation({
    mutationFn: async () => {
      // TODO: API 형식에 맞춰 로그인 작성
      return {
        access_token: '',
        refresh_token: '',
        user: null,
      }
    },
    onSuccess: ({ access_token, refresh_token, user }) => {
      setTokens({ access_token, refresh_token });
      if (user) setUser(user);
    },
  })
}
