import { Button, Input } from '@/shared/ui'
import React from 'react'
import { Text, View } from 'react-native'
import useGoogleLoginMutation from '@/features/login/googleLogin/api/useGoogleLoginMutation';
import DefaultLoginView from '@/features/login/defaultLogin/ui/DefaultLoginView';

export default function LoginPage() {
  return (
    <View className='w-full h-full flex justify-center items-center flex-col gap-4'>
      <Text className='text-xl'>로그인</Text>
      <DefaultLoginView />
    </View>
  )
}
