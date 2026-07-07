import React, { memo } from 'react'
import ProfileCardContainer from './ProfileCardContainer'
import { Text, View } from 'react-native'
import { ProfileCreatePlusIcon } from '../icons'


/**
 * Empty ProfileCard: 비어있는 프로필카드 (테스트, 프로필)
 * - Home에서 사용
 * - 클릭시 프로필생성/테스트 수행으로 이동
 */
function EmptyProfileCard({ text, onPress }: { text: string; onPress?: () => void }) {
  return <ProfileCardContainer className='border-primary-light bg-primary-lightest' onPress={onPress}>
    <View className="items-center">
      <View className="mb-3">
        <ProfileCreatePlusIcon size={40} />
      </View>
      <Text className="text-center text-[14px] font-medium leading-[20px] tracking-tight text-primary">
        {text}
      </Text>
    </View>
  </ProfileCardContainer>
}

export default memo(EmptyProfileCard)