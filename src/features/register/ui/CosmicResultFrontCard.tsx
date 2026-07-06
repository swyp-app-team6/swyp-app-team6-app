import React from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import type { CosmicTypeResponse } from '@/entities/cosmic';

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
 *   - 보라 그라데이션 배경 (320x520, rounded-xl)
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
      className="w-80 rounded-xl overflow-hidden self-center"
      style={{ height: 520 }}
    >
      {/* 닉네임 + 유형명 */}
      <View className="items-center mt-7 px-8 gap-1">
        <Text className="text-base font-medium text-white text-center" style={{ lineHeight: 24 }}>
          {nickname} 님은
        </Text>
        <Text className="text-xl font-bold text-white text-center" style={{ lineHeight: 28 }}>
          {result.cosmic_type.label}
        </Text>
      </View>

      {/* 캐릭터 일러스트 영역 */}
      <View className="items-center justify-center" style={{ height: 192, marginTop: 24 }}>
        {/* 흰색 glow 배경 */}
        <View
          className="absolute rounded-full"
          style={{
            width: 128,
            height: 128,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          }}
        />
        {/* 캐릭터 이미지 */}
        {characterImage && (
          <Image
            source={characterImage}
            style={{ width: 168, height: 168 }}
            resizeMode="contain"
          />
        )}
      </View>

      {/* 태그 */}
      <View className="flex-row justify-center items-center gap-1 px-8">
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
      <View className="items-center mt-4 px-8">
        <Text
          className="text-sm font-semibold text-white text-center"
          style={{ lineHeight: 20 }}
        >
          {result.detail}
        </Text>
      </View>

      {/* 뒷면보기 버튼 */}
      <View className="items-center mt-4">
        <Pressable
          onPress={onFlip}
          className="flex-row items-center rounded-[20px] px-3 py-2"
          style={{ backgroundColor: 'rgba(245, 245, 245, 0.3)' }}
        >
          <FlipIcon />
          <Text className="text-sm text-white ml-1" style={{ lineHeight: 20 }}>
            뒷면보기
          </Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

/** 뒷면 보기 아이콘 */
function FlipIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M13.5 3.5L17 7l-3.5 3.5M3 13l3.5-3.5L3 6"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 7H8.5a4 4 0 00-4 4v2M3 13h8.5a4 4 0 004-4V7"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
