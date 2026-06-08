import React from 'react'
import { View } from 'react-native'
import { Button, Input } from '@/shared/ui'
import useDefaultLoginMutation from '../api/useDefaultLoginMutation';

/**
 * # DefaultLoginView
 * ---
 * - 간단설명: ID/비밀번호 기반 기본 로그인 UI 컴포넌트
 * - 제약사항 및 특이사항: API 연동 전까지 mutationFn은 빈 토큰 반환
 * ---
 * @example
 * <DefaultLoginView />
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
      <Button onPress={() => mutate()} loading={isPending}
        className='w-full'
        title='로그인'
      />
    </View>
  )
}
