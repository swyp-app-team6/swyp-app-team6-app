import { Button, Header, Input, Layout } from '@/shared/ui'
import React from 'react'
import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native';

/**
 * # RegisterPage
 * ---
 * - 간단설명: 회원가입 화면 - 아이디/비밀번호/비밀번호 확인 입력 및 가입 버튼 제공
 * ---
 * @example
 * <RegisterPage />
 */
export default function RegisterPage() {
  const navigation = useNavigation();
  return (
    <>
      <Header title="회원가입" />
      <Layout.Body styleClass={{ root: 'px-6 pt-20' }}>
        <View className='gap-3'>
          <Input placeholder='아이디' />
          <Input placeholder='비밀번호' secureTextEntry />
          <Input placeholder='비밀번호 확인' secureTextEntry />
          <Button className='w-full' title='회원가입' />
        </View>
        <View className='w-full flex flex-row justify-center mt-4'>
          <Button title='로그인으로 돌아가기' variant='ghost' onPress={() => navigation.goBack()} />
        </View>
      </Layout.Body>
    </>
  )
}
