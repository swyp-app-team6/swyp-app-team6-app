import React, { useRef } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppleLoginButton, GoogleLoginButton, Layout } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';
import type { NavigationPropType } from '@/shared/types';
import useGoogleLoginMutation from '@/features/login/googleLogin/api/useGoogleLoginMutation';
import { TermsAgreementBottomSheet } from '@/features/terms';
import { PermissionGuideBottomSheet } from '@/features/permissionGuide';
import { useAuthStore } from '@/entities/user';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * # LoginPage
 * ---
 * - 간단설명: 앱 로고 + 소셜 로그인 + 이용약관/접근권한 바텀시트를 제공하는 로그인 화면
 * - 제약사항 및 특이사항:
 *   - Google 로그인 성공 시 비회원이면 이용약관 → 접근권한 바텀시트 순서로 노출
 *   - 기존 회원이면 바로 home 화면으로 이동
 *   - Apple 로그인은 UI만 배치 (실제 연동 제외)
 * ---
 * @example
 * <LoginPage />
 */
function LoginPage() {
  const navigation = useNavigation<NavigationPropType>();
  const { mutateAsync: googleLogin, isPending: isGooglePending } = useGoogleLoginMutation();
  const { bottom } = useSafeAreaInsets();
  const {
    isAgreedToTerms,
    isPermissionAllowed,
    setIsAgreedToTerms,
    setIsPermissionAllowed,
  } = useAuthStore();

  const termsRef = useRef<BottomSheetHandle>(null);
  const permissionRef = useRef<BottomSheetHandle>(null);

  /** 로그인 성공 후 플로우 분기 */
  const handleLoginSuccess = () => {
    if (isAgreedToTerms) {
      termsRef.current?.open();
    } else if (isPermissionAllowed) {
      permissionRef.current?.open();
    } else {
      navigation.navigate('home');
    }
  };

  const handleGoogleLogin = async () => {
    await googleLogin();
    handleLoginSuccess();
  };

  /** 이용약관 동의 완료 → 접근권한 바텀시트 노출 */
  const handleTermsAgree = async () => {
    await setIsAgreedToTerms(false);
    if (isPermissionAllowed) {
      setTimeout(() => permissionRef.current?.open(), 300);
    } else {
      navigation.navigate('home');
    }
  };

  /** 접근권한 확인 완료 → 홈 이동 */
  const handlePermissionConfirm = async () => {
    await setIsPermissionAllowed(false);
    navigation.navigate('home');
  };

  return (
    <Layout styleClass={{ root: 'bg-white' }}>
      <View className="flex-1 justify-center items-center">
        <Text className="text-4xl font-bold text-gray-900">SWYP</Text>
      </View>
      <View className="px-6 gap-3" style={{ paddingBottom: bottom || 40 }}>
        <GoogleLoginButton onPress={handleGoogleLogin} loading={isGooglePending} />
        <AppleLoginButton onPress={() => {}} />
      </View>

      <TermsAgreementBottomSheet
        ref={termsRef}
        onAgree={handleTermsAgree}
      />
      <PermissionGuideBottomSheet
        ref={permissionRef}
        onConfirm={handlePermissionConfirm}
      />
    </Layout>
  );
}

export default LoginPage;
