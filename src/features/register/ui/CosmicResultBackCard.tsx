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
  /** 앞면보기 콜백 */
  onFlip?: () => void;
}

/**
 * # CosmicResultBackCard
 * ---
 * - 간단설명: 코스믹 유형 테스트 결과 카드 뒷면
 * - 제약사항 및 특이사항:
 *   - 보라 그라데이션 배경 (284x392, rounded-xl)
 *   - 닉네임 + 유형명 상단 표시
 *   - 반투명 흰색 내부 패널에 연애 스타일 / 자주 듣는 말 / 궁합이 좋은 유형 3개 섹션
 *   - 섹션 구분선 (white/10)
 *   - 궁합 유형에 캐릭터 이미지 표시
 *   - "앞면보기" 버튼으로 카드 전환
 *   - CosmicTypeResponse API 데이터를 주입받아 렌더링
 *  FIXME: ios 그라디언트 적용시 ui 깨지는 문제 발생해 단색으로 처리된 상황
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
      className="w-[284px] rounded-xl overflow-hidden self-center"
      style={{
        height: 392,
        borderWidth: 2,
        borderRadius: 12,
        margin: 16,
        borderColor: '#E9D5FF',
      }}
    >
      {/* 닉네임 + 유형명 */}
      <View className="items-center mt-4 px-5 gap-0.5">
        <Text className="text-sm font-medium text-white text-center" style={{ lineHeight: 20 }}>
          {nickname} 님은
        </Text>
        <Text className="text-base font-bold text-white text-center" style={{ lineHeight: 22 }}>
          {result.cosmic_type.label}
        </Text>
      </View>

      {/* 내부 콘텐츠 패널 */}
      <View
        className="mx-4 mt-2 rounded-xl overflow-hidden px-4 py-3"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.1)',
          flex: 1,
        }}
      >
        {/* 연애 스타일 */}
        <View className="gap-0.5">
          <Text className="text-sm font-semibold text-white" style={{ lineHeight: 20 }}>
            연애 스타일
          </Text>
          <Text className="text-xs text-white" style={{ lineHeight: 17 }}>
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
          className="my-2"
          style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        />

        {/* 자주 듣는 말 */}
        <View className="gap-0.5">
          <Text className="text-sm font-semibold text-white" style={{ lineHeight: 20 }}>
            이런 말을 자주 들어요
          </Text>
          <Text className="text-xs text-white" style={{ lineHeight: 17 }}>
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
          className="my-2"
          style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
        />

        {/* 궁합이 좋은 유형 */}
        <View className="gap-0.5">
          <Text className="text-sm font-semibold text-white" style={{ lineHeight: 20 }}>
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
                  <Text className="text-xs text-white text-center" style={{ lineHeight: 16 }}>
                    {match.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* 앞면보기 버튼 (ProfileFlipWrapper 사용 시 onFlip 생략) */}
      {onFlip && (
        <View className="items-center my-2">
          <Pressable
            onPress={onFlip}
            className="flex-row items-center rounded-[20px] px-3 py-1.5"
            style={{ backgroundColor: 'rgba(245, 245, 245, 0.3)' }}
          >
            <FlipIcon color='white' />
            <Text className="text-xs text-white ml-1" style={{ lineHeight: 16 }}>
              앞면보기
            </Text>
          </Pressable>
        </View>
      )}
    </LinearGradient>
  );
}