import React from 'react';
import { View, Text, Image } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import type { CosmicTypeResponse } from '@/entities/cosmic';
import ProfileCardGradientBackground from '@/shared/ui/ProfileCard/ProfileCardGradientBackground';

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
  /** 유형 결과 데이터 (API 응답) */
  result: CosmicTypeResponse;
  /** 사용자 닉네임 */
  nickname: string;
}

/**
 * # CosmicResultFrontCard
 * ---
 * - 간단설명: 코스믹 유형 테스트 결과 카드 앞면
 * - 제약사항 및 특이사항:
 *   - ProfileCardGradientBackground 사용 (보라 그라데이션)
 *   - 닉네임 + 유형명 + 캐릭터 일러스트(glow 효과) + 태그 3개 + 한줄설명
 *   - CosmicTypeResponse API 데이터를 주입받아 렌더링
 *   - 카드 비율 350:520 (디자인 스펙), 좌우 20px 여백
 *   - 내부 레이아웃은 퍼센트/flex 기반 반응형
 * ---
 * @param result 유형 결과 데이터 (API 응답)
 * @param nickname 사용자 닉네임
 * ---
 * @example
 * <CosmicResultFrontCard result={cosmicData} nickname="홍길동" />
 */
export default function CosmicResultFrontCard({
  result,
  nickname,
}: Props) {
  const characterImage = COSMIC_CHARACTER_IMAGE[result.cosmic_type.type];

  return (
    <View style={{ paddingHorizontal: 20, width: '100%' }}>
      <ProfileCardGradientBackground
        colors={['rgba(80, 50, 213, 0.80)', 'rgba(135, 67, 237, 0.80)']}
        style={{ width: '100%', aspectRatio: 350 / 520 }}
      >
        {/* 닉네임 + 유형명 */}
        <View className="items-center gap-1" style={{ marginTop: '5.4%', paddingHorizontal: '9%' }}>
          <Text className="text-base font-medium text-white text-center" style={{ lineHeight: 22.4 }}>
            {nickname} 님은
          </Text>
          <Text className="text-xl font-bold text-white text-center" style={{ lineHeight: 28 }}>
            {result.cosmic_type.label}
          </Text>
        </View>

        {/* 캐릭터 일러스트 영역 */}
        <View className="items-center justify-center" style={{ width: '57%', aspectRatio: 1, alignSelf: 'center' }}>
          {/* glow 효과 */}
          <View
            style={{
              position: 'absolute',
              width: '62%',
              aspectRatio: 1,
              borderRadius: 9999,
              backgroundColor: 'rgba(255, 255, 255, 0.40)',
            }}
          />
          {characterImage && (
            <Image
              source={characterImage}
              style={{ width: '84%', aspectRatio: 1 }}
              resizeMode="contain"
            />
          )}
        </View>

        {/* 태그 */}
        <View className="flex-row justify-center items-center gap-1" style={{ paddingHorizontal: '9%' }}>
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
        <View className="items-center" style={{ marginTop: '2.5%', paddingHorizontal: '9%' }}>
          <Text
            className="text-sm font-semibold text-white text-center"
            style={{ lineHeight: 19.6 }}
          >
            {result.detail}
          </Text>
        </View>
      </ProfileCardGradientBackground>
    </View>
  );
}
