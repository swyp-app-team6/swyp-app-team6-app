import { useMutation } from '@tanstack/react-query';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import { googleLogin } from '@/entities/user';
import useAuthStore from '@/entities/user/model/authStore';

/**
 * # useGoogleLoginMutation
 * ---
 * - 간단설명: Google Sign-In을 통한 소셜 로그인 mutation 훅
 * - 제약사항 및 특이사항:
 *   - GoogleSignin.configure()를 내부에서 호출함
 *   - 성공 시 authStore에 토큰 및 유저 정보 자동 저장
 *   - 로그인 취소 시 null 반환 (에러로 처리하지 않음)
 * ---
 * @example
 * const { mutate, isPending } = useGoogleLoginMutation();
 * mutate();
 */
export default function useGoogleLoginMutation() {
  const { setTokens, setUser } = useAuthStore();

  return useMutation({
    mutationFn: async () => {
      GoogleSignin.configure({
        webClientId: Config.GOOGLE_WEB_CLIENT,
        iosClientId: Config.GOOGLE_IOS_CLIENT,
      });

      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (!isSuccessResponse(response)) {
        return null;
      }

      const idToken = response.data?.idToken;
      if (!idToken) {
        throw new Error('Google 로그인 실패: idToken을 가져올 수 없습니다.');
      }

      const { data } = await googleLogin(idToken);
      return data;
    },
    onSuccess: (data) => {
      if (!data) return;
      const { accessToken, refreshToken, user } = data;
      setTokens({ accessToken, refreshToken });
      setUser(user);
    },
    onError: (error) => {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // 이미 로그인 진행 중
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android: Play Services 없음
            break;
          default:
            break;
        }
      }
    },
  });
}
