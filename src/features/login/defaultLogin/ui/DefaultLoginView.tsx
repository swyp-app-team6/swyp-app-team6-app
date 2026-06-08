import React from 'react'
import { View } from 'react-native'
import { Button, Input } from '@/shared/ui'

/**
 * 기본 로그인 view
 */
export default function DefaultLoginView() {
  const { mutate, isPending } = useDefaultLoginMutation();
  return (
    <View>
      <Input
        placeholder='id'
      />
      <Input
        placeholder='password'
        secureTextEntry
      />
      <Button onPress={mutate} loading={isPending}
        className='w-full'
        title='로그인'
      />
    </View>
  )
}
