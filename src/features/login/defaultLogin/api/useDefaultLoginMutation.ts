import { useMutation } from '@tanstack/react-query';
import * as Sentry from '@sentry/react-native';
import { useAuthStore } from '../../../../entities/user';
import { UserAPI } from '../../../../entities/user/api/userApi';
import type { DefaultLoginRequest } from '../../../../entities/user/api/userApi';

/**
 * # useDefaultLoginMutation
 * ---
 * - 간단설명: 안내받은 계정 기반 이메일/비밀번호 로그인 mutation 훅
 * - 제약사항 및 특이사항:
 *   - 성공 시 authStore에 토큰 저장
 *   - requires_terms_agreement 값을 onSuccess 콜백으로 전달
 * ---
 * @example
 * const { mutate, isPending } = useDefaultLoginMutation();
 * mutate({ email: 'user@example.com', password: '1234' });
 */
export default function useDefaultLoginMutation() {
  const { setTokens } = useAuthStore();
  return useMutation({
    mutationFn: async (body: DefaultLoginRequest) => {
      const { data } = await UserAPI.defaultLogin(body);
      return data;
    },
    onSuccess: (data) => {
      setTokens({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
    },
    onError: (error) => {
      console.error(error);
      Sentry.captureException(error, { tags: { feature: 'default-login' } });
    },
  });
}
