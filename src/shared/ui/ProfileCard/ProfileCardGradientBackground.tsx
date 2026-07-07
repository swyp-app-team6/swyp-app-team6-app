import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import ProfileCardContainer from './ProfileCardContainer'

/**
 * # ProfileCardGradientBackground
 * ---
 * - 간단설명: 코스믹 유형 카드용 그라디언트 배경 (ProfileCardContainer 포함)
 * - 제약사항 및 특이사항:
 *   - ProfileCardContainer로 프레임(284x392) 감싸고, 내부를 그라디언트로 채움
 *   - colors prop으로 그라디언트 색상 커스터마이징 가능
 * ---
 * @param children 카드 내부 콘텐츠
 * @param colors 그라디언트 색상 [시작, 끝] (기본: 보라 0.8 opacity)
 * ---
 * @example
 * <ProfileCardGradientBackground>
 *   <Text>카드 내용</Text>
 * </ProfileCardGradientBackground>
 */
export default function ProfileCardGradientBackground({
  children,
  colors,
}: { children: React.ReactNode; colors?: [string, string] }) {
  return (
    <ProfileCardContainer className="border-purple-200 p-0 overflow-hidden items-stretch justify-start">
      <LinearGradient
        colors={colors ?? ['rgba(67, 56, 202, 0.8)', 'rgba(124, 58, 237, 0.8)']}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.5, y: 0 }}
        style={{ flex: 1 }}
      >
        {children}
      </LinearGradient>
    </ProfileCardContainer>
  )
}
