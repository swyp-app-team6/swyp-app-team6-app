import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { CosmicTypeResponse } from '@/entities/cosmic';
import { FlipIcon } from '../../../shared/ui';

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
  /** 뒷면보기 콜백 */
  onFlip: () => void;
}

/**
 * # CosmicResultFrontCard
 * ---
 * - 간단설명: 코스믹 유형 테스트 결과 카드 앞면
 * - 제약사항 및 특이사항:
 *   - 보라 그라데이션 배경 (284x392, rounded-xl)
 *   - 닉네임 + 유형명 + 캐릭터 일러스트(glow 효과) + 태그 3개 + 한줄설명
 *   - "뒷면보기" 버튼으로 카드 전환
 *   - CosmicTypeResponse API 데이터를 주입받아 렌더링
 * ---
 * @param result 유형 결과 데이터 (API 응답)
 * @param nickname 사용자 닉네임
 * @param onFlip 뒷면보기 콜백
 * ---
 * @example
 * <CosmicResultFrontCard result={cosmicData} nickname="홍길동" onFlip={() => setIsBack(true)} />
 */
export default function CosmicResultFrontCard({
  result,
  nickname,
  onFlip,
}: Props) {
  const characterImage = COSMIC_CHARACTER_IMAGE[result.cosmic_type.type];

  return (
    <LinearGradient
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
    >
      {/* 닉네임 + 유형명 */}
      <View className="items-center mt-5 px-5 gap-1">
        <Text className="text-sm font-medium text-white text-center" style={{ lineHeight: 20 }}>
          {nickname} 님은
        </Text>
        <Text className="text-base font-bold text-white text-center" style={{ lineHeight: 22 }}>
          {result.cosmic_type.label}
        </Text>
      </View>

      {/* 캐릭터 일러스트 영역 */}
      <View className="items-center justify-center my-3" style={{ width: 160, height: 160, alignSelf: 'center' }}>
        {/* 캐릭터 이미지 */}
        {characterImage && (
          <Image
            source={characterImage}
            style={{ width: 160, height: 160 }}
            resizeMode="contain"
          />
        )}
      </View>

      {/* 태그 */}
      <View className="flex-row justify-center items-center gap-1 px-5">
        {result.tags.map((tag) => (
          <View
            key={tag}
            className="rounded-[20px] px-3 py-1.5"
            style={{ borderWidth: 1, borderColor: '#FFFFFF' }}
          >
            <Text className="text-xs text-white" style={{ lineHeight: 12 }}>
              {tag}
            </Text>
          </View>
        ))}
      </View>

      {/* 한줄 설명 */}
      <View className="items-center mt-3 px-5">
        <Text
          className="text-sm font-semibold text-white text-center"
          style={{ lineHeight: 19.6 }}
        >
          {result.detail}
        </Text>
      </View>

      {/* 뒷면보기 버튼 */}
      <View className="items-center mt-3">
        <Pressable
          onPress={onFlip}
          className="flex-row items-center rounded-[20px] px-3 py-1.5"
          style={{ backgroundColor: 'rgba(245, 245, 245, 0.3)' }}
        >
          <FlipIcon color='white' />
          <Text className="text-xs text-white ml-1" style={{ lineHeight: 16 }}>
            뒷면보기
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}