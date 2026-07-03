import { useMutation } from '@tanstack/react-query';
import { Platform, Alert } from 'react-native';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
import Config from 'react-native-config';
import { UserAPI, useAuthStore } from '@/entities/user';
import type { AppleLoginResponse } from '@/entities/user';

/**
 * # performAppleLoginIOS
 * ---
 * - 간단설명: iOS 네이티브 Apple Sign-In 수행 후 identityToken/authorizationCode 반환
 * ---
 */
async function performAppleLoginIOS() {
  const response = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
  });

  const credentialState = await appleAuth.getCredentialStateForUser(
    response.user,
  );

  if (credentialState !== appleAuth.State.AUTHORIZED) {
    throw new Error('Apple 로그인 실패: 인증되지 않은 사용자입니다.');
  }

  const { identityToken, authorizationCode } = response;

  if (!identityToken) {
    throw new Error('Apple 로그인 실패: identityToken을 가져올 수 없습니다.');
  }

  return { identityToken, authorizationCode: authorizationCode ?? undefined };
}

/**
 * # performAppleLoginAndroid
 * ---
 * - 간단설명: Android 웹 기반 Apple Sign-In 수행 후 identityToken/authorizationCode 반환
 * - 제약사항 및 특이사항:
 *   - Apple Developer 콘솔에서 Service ID + Return URL 설정 필요
 *   - .env에 APPLE_SERVICE_CLIENT_ID, APPLE_REDIRECT_URI 필요
 * ---
 */
async function performAppleLoginAndroid() {
  if (!appleAuthAndroid.isSupported) {
    throw new Error('Apple 로그인은 이 기기에서 지원되지 않습니다.');
  }

  appleAuthAndroid.configure({
    clientId: Config.APPLE_SERVICE_CLIENT_ID!,
    redirectUri: Config.APPLE_REDIRECT_URI!,
    responseType: appleAuthAndroid.ResponseType.ALL,
    scope: appleAuthAndroid.Scope.ALL,
    nonce: uuid(),
    state: uuid(),
  });

  const response = await appleAuthAndroid.signIn();

  const identityToken = response.id_token;
  const authorizationCode = response.code;

  if (!identityToken) {
    throw new Error('Apple 로그인 실패: identityToken을 가져올 수 없습니다.');
  }

  return { identityToken, authorizationCode: authorizationCode ?? undefined };
}

/**
 * # useAppleLoginMutation
 * ---
 * - 간단설명: Apple Sign-In을 통한 소셜 로그인 mutation 훅
 * - 제약사항 및 특이사항:
 *   - iOS: appleAuth.performRequest()로 네이티브 인증
 *   - Android: appleAuthAndroid.configure() + signIn()으로 웹 기반 인증
 *   - 성공 시 authStore에 토큰 자동 저장
 *   - 로그인 취소 시 null 반환 (에러로 처리하지 않음)
 * ---
 * @example
 * const { mutate, isPending } = useAppleLoginMutation();
 * mutate();
 */
export default function useAppleLoginMutation() {
  const { setTokens, fetchUserInfo } = useAuthStore();

  return useMutation<AppleLoginResponse | null, Error, void>({
    mutationFn: async () => {
      const { identityToken, authorizationCode } =
        Platform.OS === 'ios'
          ? await performAppleLoginIOS()
          : await performAppleLoginAndroid();

      const { data } = await UserAPI.appleLogin(
        identityToken,
        authorizationCode,
      );
      return data;
    },
    onSuccess: async (data) => {
      if (!data) return;
      const { access_token, refresh_token } = data;
      await setTokens({
        accessToken: access_token,
        refreshToken: refresh_token,
      });
      await fetchUserInfo();
    },
    onError: (error) => {
      console.error(error);
      // Apple 취소 에러(1001)는 사용자 의도이므로 Alert 미표시
      if ((error as any)?.code === '1001') return;
      Alert.alert('에러', error.message);
    },
  });
}
