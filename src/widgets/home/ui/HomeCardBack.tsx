import React, { memo } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { CosmicType } from '@/shared/enums';
import { useCosmicTypeQuery } from '@/entities/cosmic';

/**
 * 코스믹 유형별 캐릭터 이미지 매핑
 */
const COSMIC_CHARACTER_IMAGE: Record<string, ImageSourcePropType> = {
  SHOOTING_STAR: require('@/assets/characters/cosmictype-shootingstar.png'),
  GALAXY: require('@/assets/characters/cosmictype-galaxy.png'),
  LUNA: require('@/assets/characters/cosmictype-luna.png'),
  SOLA: require('@/assets/characters/cosmictype-solar.png'),
};

interface Props {
  /** 코스믹 유형 */
  cosmicType: CosmicType;
}

/**
 * # HomeCardBack
 * ---
 * - 간단설명: 홈 화면 프로필 카드 뒷면 — 코스믹 유형 정보 표시
 * - 제약사항 및 특이사항:
 *   - 284x392 크기, 보라색 그라디언트 배경
 *   - 코스믹 유형별 캐릭터 이미지 중앙 표시 (white glow 효과)
 *   - 유형명 + 설명 + 키워드 태그
 *   - 뒷면 보기/전체보기 버튼은 부모(HomeWidget)에서 렌더링
 * ---
 * @param cosmicType 코스믹 유형 코드
 * ---
 * @example
 * <HomeCardBack cosmicType="SHOOTING_STAR" />
 */
const HomeCardBack = memo(function HomeCardBack({ cosmicType }: Props) {
  const { data: result, isLoading } = useCosmicTypeQuery(cosmicType);
  const characterImage = COSMIC_CHARACTER_IMAGE[cosmicType];

  return (
    <LinearGradient
      colors={['rgba(67, 56, 202, 0.8)', 'rgba(124, 58, 237, 0.8)']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      className="w-[284px] h-[392px] rounded-xl overflow-hidden items-center justify-center px-5"
      style={{
        borderWidth: 2,
        borderColor: '#E9D5FF',
      }}
    >
      {isLoading || !result ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          {/* 닉네임 + 유형명 */}
          <Text
            className="text-base font-semibold text-white text-center mb-1"
            style={{ lineHeight: 22 }}
          >
            {result.cosmic_type.label}
          </Text>

          {/* 캐릭터 이미지 + white glow */}
          <View className="items-center justify-center my-4" style={{ width: 160, height: 160 }}>
            {/* 캐릭터 이미지 */}
            {characterImage && (
              <Image
                source={characterImage}
                style={{ width: 160, height: 160 }}
                resizeMode="contain"
              />
            )}
          </View>

          {/* 키워드 태그 */}
          <View className="flex-row flex-wrap justify-center gap-1 mb-4">
            {result.tags.map((tag) => (
              <View
                key={tag}
                className="rounded-[20px] px-3 py-2"
                style={{ borderWidth: 1, borderColor: '#FFFFFF' }}
              >
                <Text className="text-xs text-white" style={{ lineHeight: 12 }}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>

          {/* 한줄 설명 */}
          <Text
            className="text-sm font-semibold text-white text-center"
            style={{ lineHeight: 19.6 }}
          >
            {result.detail}
          </Text>
        </>
      )}
    </LinearGradient>
  );
});

export default HomeCardBack;
