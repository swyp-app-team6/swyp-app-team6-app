import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

/**
 * 프로필 카드 그라디언트 효과
 * - 코스믹 유형 카드의 배경에 사용됨
 */
export default function ProfileGradient({
  children
}: { children: React.ReactNode }) {
  return <LinearGradient
    colors={['rgba(67, 56, 202, 0.8)', 'rgba(124, 58, 237, 0.8)']}
    start={{ x: 0.5, y: 1 }}
    end={{ x: 0.5, y: 0 }}
    className="w-full rounded-xl overflow-hidden self-center"
    style={{
      height: 392,
      borderWidth: 2,
      borderRadius: 12,
      margin: 16,
      borderColor: '#E9D5FF',
    }}
  >{children}</LinearGradient>
}
