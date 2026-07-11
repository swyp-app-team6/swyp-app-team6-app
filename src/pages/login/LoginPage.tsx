import React, { useRef } from 'react';
import { Image, Platform, Pressable, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import { AppleLoginButton, GoogleLoginButton } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';
import type { NavigationPropType } from '@/shared/types';
import useGoogleLoginMutation from '@/features/login/googleLogin/api/useGoogleLoginMutation';
import useAppleLoginMutation from '@/features/login/appleLogin/api/useAppleLoginMutation';
import { TermsAgreementBottomSheet } from '@/features/terms';
import { PermissionGuideBottomSheet } from '@/features/permissionGuide';
import LoginTroubleBottomSheet from '@/features/login/ui/LoginTroubleBottomSheet';
import useConditionStateStore from '@/shared/model/conditionStateStore';
import useSafePaddingBottom from '@/shared/utils/useSafePaddingBottom';

/**
 * # LoginPage
 * ---
 * - 간단설명: Orbits 브랜딩 + 소셜 로그인 + 이용약관/접근권한 바텀시트를 제공하는 로그인 화면
 * - 제약사항 및 특이사항:
 *   - 로그인 API 응답의 requires_terms_agreement가 false이면 약관동의 바텀시트 노출
 *   - requires_terms_agreement가 true(이미 동의)이면 접근권한 또는 home으로 바로 이동
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
    isPermissionAllowed,
    setIsAgreedToTerms,
    setIsPermissionAllowed,
  } = useConditionStateStore();

  const termsRef = useRef<BottomSheetHandle>(null);
  const permissionRef = useRef<BottomSheetHandle>(null);
  const troubleRef = useRef<BottomSheetHandle>(null);

  /** 로그인 성공 후 플로우 분기: requires_terms_agreement가 true이면 약관 바텀시트 노출 */
  const handleLoginSuccess = (requiresTermsAgreement: boolean) => {
    if (requiresTermsAgreement) {
      termsRef.current?.open();
    } else {
      if (isPermissionAllowed) {
        permissionRef.current?.open();
      } else {
        navigation.reset({ index: 0, routes: [{ name: 'home' }] });
      }
    }
  };

  const handleGoogleLogin = async () => {
    const result = await googleLogin();
    if (!result) return;
    handleLoginSuccess(result.requires_terms_agreement);
  };

  const handleAppleLogin = async () => {
    const result = await appleLogin();
    if (!result) return;
    handleLoginSuccess(result.requires_terms_agreement);
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
    <LinearGradient
      colors={['#241A6F', '#7832D5']}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      style={{ flex: 1 }}
    >
      {/* 로고 영역 */}
      <View className="flex-1 justify-center items-center">
        <View className="items-center gap-5">
          <Image
            source={require('@/assets/characters/login-icon.png')}
            style={{ width: 216, height: 160 }}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* 소셜 로그인 버튼 */}
      <View className="px-5 gap-3" style={{ paddingBottom: safePadding.paddingBottom || 40 }}>
        <GoogleLoginButton onPress={handleGoogleLogin} loading={isGooglePending} disabled={isApplePending} />
        {showAppleLogin && (
          <AppleLoginButton onPress={handleAppleLogin} loading={isApplePending} disabled={isGooglePending} />
        )}

        {/* 로그인 문제 링크 */}
        <View className="items-center pt-2 mb-10">
          <Pressable onPress={() => troubleRef.current?.open()} hitSlop={8}>
            <Text className="text-xs text-white/60">
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
    </LinearGradient>
  );
}

export default LoginPage;
