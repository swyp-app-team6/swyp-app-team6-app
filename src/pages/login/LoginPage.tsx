import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Layout } from '@/shared/ui';
import useAuthStore from '@/entities/user/model/authStore';
import type { NavigationPropType } from '@/shared/types';
import useGoogleLoginMutation from '@/features/login/googleLogin/api/useGoogleLoginMutation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * # LoginPage
 * ---
 * - 간단설명: 앱 로고 + 소셜 로그인 + 회원가입 버튼을 제공하는 로그인 화면
 * - 제약사항 및 특이사항:
 *   - Google 로그인 성공 시 home 화면으로 이동
 *   - Apple 로그인은 UI만 배치 (실제 연동 제외)
 *   - 개발용 더미 로그인으로 플로우 테스트 가능
 * ---
 * @example
 * <LoginPage />
 */
function LoginPage() {
  const navigation = useNavigation<NavigationPropType>();
  const { setTokens, setUser } = useAuthStore();
  const { mutateAsync: googleLogin, isPending: isGooglePending } = useGoogleLoginMutation();
  const { bottom } = useSafeAreaInsets();

  const handleGoogleLogin = async () => {
    await googleLogin();
    navigation.navigate('home');
  };

  const handleDummyLogin = () => {
    setTokens({
      accessToken: 'dummy-access-token',
      refreshToken: 'dummy-refresh-token',
    });
    setUser({
      id: 0,
      email: 'dummy@example.com',
      role: 'USER',
      provider: 'GOOGLE',
    });
    navigation.reset({
      index: 0,
      routes: [{ name: 'home' }],
    });
  };

  return (
    <Layout styleClass={{ root: 'bg-white' }}>
      <View className="flex-1 justify-center items-center">
        <Text className="text-4xl font-bold text-gray-900">SWYP</Text>
      </View>
      <View className="px-6 gap-3" style={{ paddingBottom: bottom || 40 }}>
        <Button title="Google로 로그인" variant="secondary" onPress={handleGoogleLogin} loading={isGooglePending} />
        <Button title="Apple로 로그인" variant="secondary" />
        <Button title="개발용 로그인" variant="ghost" onPress={handleDummyLogin} />
        <View className="items-center mt-1">
          <Button
            title="회원가입"
            variant="secondary"
            onPress={() => navigation.navigate('register')}
          />
        </View>
      </View>
    </Layout>
  );
}

export default LoginPage;
