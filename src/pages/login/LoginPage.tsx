import React, { useRef } from 'react';
import { Image, Platform, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { AppleLoginButton, GoogleLoginButton, Layout } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';
import type { NavigationPropType } from '@/shared/types';
import useGoogleLoginMutation from '@/features/login/googleLogin/api/useGoogleLoginMutation';
import useAppleLoginMutation from '@/features/login/appleLogin/api/useAppleLoginMutation';
import { TermsAgreementBottomSheet } from '@/features/terms';
import { PermissionGuideBottomSheet } from '@/features/permissionGuide';
import LoginTroubleBottomSheet from '@/features/login/ui/LoginTroubleBottomSheet';
import { ProfileAPI } from '@/entities/user';
import useConditionStateStore from '@/shared/model/conditionStateStore';
import useSafePaddingBottom from '@/shared/utils/useSafePaddingBottom';

/**
 * # LoginPage
 * ---
 * - 간단설명: Orbits 브랜딩 + 소셜 로그인 + 이용약관/접근권한 바텀시트를 제공하는 로그인 화면
 * - 제약사항 및 특이사항:
 *   - Google 로그인 성공 시 비회원이면 이용약관 → 접근권한 바텀시트 순서로 노출
 *   - 기존 회원이면 바로 home 화면으로 이동
 *   - Apple 로그인은 UI만 배치 (실제 연동 제외)
 *   - "로그인에 문제가 있나요?" → LoginTroubleBottomSheet → DefaultLoginPage 진입
 * ---
 * @example
 * <LoginPage />
 */
function LoginPage() {
  const navigation = useNavigation<NavigationPropType>();
  const { mutateAsync: googleLogin, isPending: isGooglePending } = useGoogleLoginMutation();
  const { mutateAsync: appleLogin, isPending: isApplePending } = useAppleLoginMutation();
  const safePadding = useSafePaddingBottom();
  const {
    isAgreedToTerms,
    isPermissionAllowed,
    setIsAgreedToTerms,
    setIsPermissionAllowed,
  } = useConditionStateStore();

  const termsRef = useRef<BottomSheetHandle>(null);
  const permissionRef = useRef<BottomSheetHandle>(null);
  const troubleRef = useRef<BottomSheetHandle>(null);

  /** 프로필 존재 여부를 확인하여 home 또는 register로 분기 */
  const navigateByProfile = async () => {
    try {
      await ProfileAPI.fetchProfile();
      navigation.reset({ index: 0, routes: [{ name: 'home' }] });
    } catch {
    }
  };

  /** 로그인 성공 후 플로우 분기 */
  const handleLoginSuccess = () => {
    if (isAgreedToTerms) {
      termsRef.current?.open();
    } else if (isPermissionAllowed) {
      permissionRef.current?.open();
    } else {
      navigateByProfile();
    }
  };

  const handleGoogleLogin = async () => {
    await googleLogin();
    handleLoginSuccess();
  };

  const handleAppleLogin = async () => {
    await appleLogin();
    handleLoginSuccess();
  };

  /** Apple 로그인 버튼 노출 여부 (iOS: 항상, Android: API 19+ 지원 시) */
  const showAppleLogin = Platform.OS === 'ios' || appleAuthAndroid.isSupported;

  /** 이용약관 동의 완료 → 접근권한 바텀시트 노출 */
  const handleTermsAgree = async () => {
    await setIsAgreedToTerms(false);
    if (isPermissionAllowed) {
      setTimeout(() => permissionRef.current?.open(), 300);
    } else {
      navigation.reset({ index: 0, routes: [{ name: 'home' }] });
    }
  };

  /** 접근권한 확인 완료 → home으로 이동 */
  const handlePermissionConfirm = async () => {
    await setIsPermissionAllowed(false);
    navigation.reset({ index: 0, routes: [{ name: 'home' }] });
  };

  return (
    <Layout styleClass={{ root: 'bg-primary' }}>
      {/* 로고 영역 */}
      <View className="flex-1 justify-center items-center">
        <Image
          source={require('@/assets/orbits-character-icon.png')}
          className="w-28 h-28 mb-4"
          resizeMode="contain"
        />
        <Image
          source={require('@/assets/orbits-name-icon.png')}
          className="w-52 h-14"
          resizeMode="contain"
        />
        <Text className="text-base text-white/80 mt-4">
          대화를 여는 프로필 카드
        </Text>
      </View>

      {/* 소셜 로그인 버튼 */}
      <View className="px-5 gap-3" style={{ paddingBottom: safePadding.paddingBottom || 40 }}>
        <GoogleLoginButton onPress={handleGoogleLogin} loading={isGooglePending} disabled={isApplePending} />
        {showAppleLogin && (
          <AppleLoginButton onPress={handleAppleLogin} loading={isApplePending} disabled={isGooglePending} />
        )}

        {/* 로그인 문제 링크 */}
        <View className="items-center pt-2">
          <Pressable onPress={() => troubleRef.current?.open()} hitSlop={8}>
            <Text className="text-xs text-white/60 underline">
              로그인에 문제가 있나요?
            </Text>
          </Pressable>
        </View>
      </View>

      <TermsAgreementBottomSheet
        ref={termsRef}
        onAgree={handleTermsAgree}
      />
      <PermissionGuideBottomSheet
        ref={permissionRef}
        onConfirm={handlePermissionConfirm}
      />
      <LoginTroubleBottomSheet
        ref={troubleRef}
        onDefaultLogin={() => navigation.navigate('defaultLogin')}
      />
    </Layout>
  );
}

export default LoginPage;
