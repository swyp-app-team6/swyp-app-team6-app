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
  /** 앞면보기 콜백 */
  onFlip: () => void;
}

/**
 * # CosmicResultBackCard
 * ---
 * - 간단설명: 코스믹 유형 테스트 결과 카드 뒷면
 * - 제약사항 및 특이사항:
 *   - 보라 그라데이션 배경 (320x520, rounded-xl)
 *   - 닉네임 + 유형명 상단 표시
 *   - 반투명 흰색 내부 패널에 연애 스타일 / 자주 듣는 말 / 궁합이 좋은 유형 3개 섹션
 *   - 섹션 구분선 (white/10)
 *   - 궁합 유형에 캐릭터 이미지 표시
 *   - "앞면보기" 버튼으로 카드 전환
 *   - CosmicTypeResponse API 데이터를 주입받아 렌더링
 * ---
 * @param result 유형 결과 데이터 (API 응답)
 * @param nickname 사용자 닉네임
 * @param onFlip 앞면보기 콜백
 * ---
 * @example
 * <CosmicResultBackCard result={cosmicData} nickname="홍길동" onFlip={() => setIsBack(false)} />
 */
export default function CosmicResultBackCard({ result, nickname, onFlip }: Props) {
  return (
    <LinearGradient
      colors={['rgba(67, 56, 202, 1)', 'rgba(124, 58, 237, 1)']}
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

      {/* 내부 콘텐츠 패널 */}
      <View
        className="mx-5 mt-2 rounded-xl overflow-hidden px-5 py-5"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          height: 384,
        }}
      >
        {/* 연애 스타일 */}
        <View className="gap-1">
          <Text className="text-base font-semibold text-white" style={{ lineHeight: 24 }}>
            연애 스타일
          </Text>
          <Text className="text-sm text-white" style={{ lineHeight: 20 }}>
            {result.features.map((item, i) => (
              <React.Fragment key={item}>
                {' '}{item}
                {i < result.features.length - 1 ? '\n' : ''}
              </React.Fragment>
            ))}
          </Text>
        </View>

        {/* 구분선 */}
        <View
          className="my-3"
          style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        />

        {/* 자주 듣는 말 */}
        <View className="gap-1">
          <Text className="text-base font-semibold text-white" style={{ lineHeight: 24 }}>
            이런 말을 자주 들어요
          </Text>
          <Text className="text-sm text-white" style={{ lineHeight: 20 }}>
            {result.mentions.map((quote, i) => (
              <React.Fragment key={quote}>
                {quote}
                {i < result.mentions.length - 1 ? '\n' : ''}
              </React.Fragment>
            ))}
          </Text>
        </View>

        {/* 구분선 */}
        <View
          className="my-3"
          style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        />

        {/* 궁합이 좋은 유형 */}
        <View className="gap-1">
          <Text className="text-base font-semibold text-white" style={{ lineHeight: 24 }}>
            궁합이 좋은 유형
          </Text>
          <View className="flex-row items-start gap-2 mt-1">
            {result.matches.map((match) => {
              const matchImage = COSMIC_CHARACTER_IMAGE[match.type];
              return (
                <View key={match.type} className="w-12 items-center">
                  <View className="w-12 h-12 items-center justify-center">
                    {matchImage ? (
                      <Image
                        source={matchImage}
                        style={{ width: 48, height: 44 }}
                        resizeMode="contain"
                      />
                    ) : (
                      <Text className="text-lg">✨</Text>
                    )}
                  </View>
                  <Text className="text-sm text-white text-center" style={{ lineHeight: 20 }}>
                    {match.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* 앞면보기 버튼 */}
      <View className="items-center mt-3">
        <Pressable
          onPress={onFlip}
          className="flex-row items-center rounded-[20px] px-3 py-2"
          style={{ backgroundColor: 'rgba(245, 245, 245, 0.3)' }}
        >
          <FlipIcon />
          <Text className="text-sm text-white ml-1" style={{ lineHeight: 20 }}>
            앞면보기
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
