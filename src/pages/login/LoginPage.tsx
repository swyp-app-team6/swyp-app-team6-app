import { Button, Input } from '@/shared/ui'
import React from 'react'
import { Text, View } from 'react-native'
import DefaultLoginView from '@/features/login/defaultLogin/ui/DefaultLoginView';
import { useNavigation } from '@react-navigation/native';

/**
 * # LoginPage
 * ---
 * - 간단설명: 로그인 화면 - 기본 로그인 폼, 회원가입 및 비밀번호 찾기 버튼 제공
 * ---
 * @example
 * <LoginPage />
 */
export default function LoginPage() {
  const navigation = useNavigation();
  return (
    <View className='w-full h-full flex justify-center items-center flex-col gap-4'>
      <Text className='text-xl'>로그인</Text>
      <DefaultLoginView />
      <View className='w-full'>
        <Button title='회원가입' onPress={() => navigation.navigate('register')}/>
        <Button title='비밀번호 찾기' />
      </View>
    </View>
  )
}
