import { Button, Header, Input, Layout } from '@/shared/ui'
import React from 'react'
import { Text, View } from 'react-native'
import DefaultLoginView from '@/features/login/defaultLogin/ui/DefaultLoginView';
import { useNavigation } from '@react-navigation/native';
import withLayout from '../../shared/hoc/withLayout';

/**
 * # LoginPage
 * ---
 * - 간단설명: 로그인 화면 - 기본 로그인 폼, 회원가입 및 비밀번호 찾기 버튼 제공
 * ---
 * @example
 * <LoginPage />
 */
function LoginPage() {
  const navigation = useNavigation();
  return (
    <>
      <Header
        title="갤러리"
      />
      <Layout.Body>
        <DefaultLoginView />
        <View className='w-full inline-flex flex-row'>
          <Button title='회원가입' onPress={() => navigation.navigate('register')} />
          <Button title='비밀번호 찾기' />
        </View>
      </Layout.Body>
    </>
  )
}

export default withLayout(LoginPage);