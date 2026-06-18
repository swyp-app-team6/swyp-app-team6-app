import { useMutation } from '@tanstack/react-query';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Config from 'react-native-config';
import useAuthStore from '@/entities/user/model/authStore';

const OAUTH_URL = `${Config.API_URL}/oauth2/authorization/google`;
const DEEP_LINK_CALLBACK = 'swyp://oauth/callback';

/**
 * # performGoogleLogin
 * ---
 * - 간단설명: InAppBrowser로 Google OAuth 인증 수행 후 토큰 저장 및 유저 정보 조회
 * - 제약사항 및 특이사항:
 *   - 백엔드가 swyp://oauth/callback?access_token=xxx&refresh_token=xxx 로 리다이렉트해야 함
 *   - 사용자가 브라우저를 닫으면 아무 동작 없이 종료
 * ---
 * @example
 * await performGoogleLogin();
 */
export async function performGoogleLogin(): Promise<void> {
  const result = await InAppBrowser.openAuth(OAUTH_URL, DEEP_LINK_CALLBACK, {
    ephemeralWebSession: true,
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
  });

  if (result.type !== 'success') {
    return;
  }

  const url = new URL(result.url);
  const accessToken = url.searchParams.get('access_token');
  const refreshToken = url.searchParams.get('refresh_token');

  if (!accessToken || !refreshToken) {
    throw new Error('OAuth 콜백에서 토큰을 추출할 수 없습니다.');
  }

  const { setTokens, fetchAndSetMe } = useAuthStore.getState();
  setTokens({ access_token: accessToken, refresh_token: refreshToken });
  await fetchAndSetMe();
}

/**
 * # useGoogleLoginMutation
 * ---
 * - 간단설명: Google OAuth 소셜 로그인 mutation 훅
 * - 제약사항 및 특이사항: InAppBrowser 사용, 성공 시 authStore에 토큰 및 유저 정보 저장
 * ---
 * @example
 * const { mutate, isPending } = useGoogleLoginMutation();
 * mutate();
 */
export default function useGoogleLoginMutation() {
  return useMutation({
    mutationFn: performGoogleLogin,
  });
}
