import { useMutation } from '@tanstack/react-query';
import { AuthConfiguration, authorize } from 'react-native-app-auth';
import Config from 'react-native-config';
import { googleLogin } from '@/entities/user';
import useAuthStore from '@/entities/user/model/authStore';

/**
 * Google OAuth 인증 설정
 * - issuer: Google 인증 서버 주소
 * - clientId: 환경변수(GOOGLE_OAUTH_CLIENT_ID)에서 주입
 * - scopes: openid, profile, email
 */
const googleAuthConfig: AuthConfiguration = {
  issuer: 'https://accounts.google.com',
  clientId: Config.GOOGLE_OAUTH_CLIENT_ID ?? '',
  redirectUrl: `${Config.GOOGLE_OAUTH_REDIRECT_SCHEME}:/oauth2redirect`,
  scopes: ['openid', 'profile', 'email'],
  additionalParameters: { prompt: 'select_account' },
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
  },
};

/**
 * # useGoogleLoginMutation
 * ---
 * - 간단설명: Google OAuth를 통한 소셜 로그인 mutation 훅
 * - 제약사항 및 특이사항: react-native-app-auth 사용, 성공 시 authStore에 토큰 및 유저 정보 저장
 * ---
 * @example
 * const { mutate, isPending } = useGoogleLoginMutation();
 * mutate();
 */
export default function useGoogleLoginMutation() {
  const { setTokens, setUser } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      console.log('##########', Config.GOOGLE_OAUTH_CLIENT_ID_ANDROID)
      const result = await authorize(googleAuthConfig);
      const { data } = await googleLogin(result.idToken);
      return data;
    },
    onSuccess: ({ accessToken, refreshToken, user }) => {
      setTokens({ accessToken, refreshToken });
      setUser(user);
    },
  });
}
