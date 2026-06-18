import { Button, Header, Layout } from '@/shared/ui';
import React from 'react';
import { View } from 'react-native';
import DefaultLoginView from '@/features/login/defaultLogin/ui/DefaultLoginView';
import GoogleLoginButton from '@/features/login/googleLogin/ui/GoogleLoginButton';
import useGoogleLoginMutation from '@/features/login/googleLogin/api/useGoogleLoginMutation';
import { useNavigation } from '@react-navigation/native';
import { NavigationPropType } from '../../shared/types';

/**
 * # LoginPage
 * ---
 * - 간단설명: 로그인 화면 - 기본 로그인 폼, Google 소셜 로그인, 회원가입 및 비밀번호 찾기 버튼 제공
 * ---
 * @example
 * <LoginPage />
 */
function LoginPage() {
  const navigation = useNavigation<NavigationPropType>();
  const { mutate: googleLogin, isPending } = useGoogleLoginMutation();

  return (
    <>
      <Header title="로그인" />
      <Layout.Body styleClass={{ root: 'px-6 pt-20' }}>
        <DefaultLoginView />
        <View className="w-full mt-4">
          <GoogleLoginButton onPress={() => googleLogin()} loading={isPending} />
        </View>
        <View className="w-full flex flex-row justify-between mt-4">
          <Button title="회원가입" variant="secondary" onPress={() => navigation.navigate('register')} />
          <Button title="비밀번호 찾기" variant="secondary" />
        </View>
      </Layout.Body>
    </>
  );
}

export default LoginPage;