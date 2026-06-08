import { useMutation } from '@tanstack/react-query';
import { AuthConfiguration, authorize } from 'react-native-app-auth';
import Config from 'react-native-config';
import { googleLogin } from '@/entities/user';
import useAuthStore from '@/entities/user/model/authStore';

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
