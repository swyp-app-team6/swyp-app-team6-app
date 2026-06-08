import { Button, Input } from '@/shared/ui'
import React from 'react'
import { Text, View } from 'react-native'
import useGoogleLoginMutation from '@/features/auth/googleLogin/api/useGoogleLoginMutation';

export default function LoginPage() {
  const { mutate, isPending } = useGoogleLoginMutation();

  return (
    <View className='w-full h-full flex justify-center items-center flex-col gap-4'>
      <Text className='text-xl'>로그인</Text>
      <View>
        <Input
          placeholder='id'
        />
        <Input
          placeholder='password'
          secureTextEntry
        />
      </View>
    </View>
  )
}
