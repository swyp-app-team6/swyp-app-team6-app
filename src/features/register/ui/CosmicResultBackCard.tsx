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
 * # CosmicResultBackCard
 * ---
 * - 간단설명: 코스믹 유형 테스트 결과 카드 뒷면
 * - 제약사항 및 특이사항:
 *   - ProfileCardGradientBackground 사용 (보라 그라데이션, opacity 1)
 *   - 닉네임 + 유형명 상단 표시
 *   - 반투명 흰색 내부 패널에 연애 스타일 / 자주 듣는 말 / 궁합이 좋은 유형 3개 섹션
 *   - 카드 비율 350:520 (디자인 스펙), 좌우 20px 여백
 *   - 내부 레이아웃은 퍼센트/flex 기반 반응형
 *   FIXME: ios 그라디언트 적용시 ui 깨지는 문제 발생해 단색으로 처리된 상황
 * ---
 * @param result 유형 결과 데이터 (API 응답)
 * @param nickname 사용자 닉네임
 * ---
 * @example
 * <CosmicResultBackCard result={cosmicData} nickname="홍길동" />
 */
export default function CosmicResultBackCard({ result, nickname }: Props) {
  return (
    <View style={{ paddingHorizontal: 20, width: '100%' }}>
      <ProfileCardGradientBackground
        colors={['#5032D5', '#8743ED']}
        style={{ width: '100%', aspectRatio: 350 / 520 }}
      >
        {/* 콘텐츠 영역 - 세로 중앙 배치 */}
        <View className="flex-1 justify-center" style={{ paddingVertical: '6%', gap: 12 }}>
          {/* 닉네임 + 유형명 */}
          <View className="items-center gap-1" style={{ paddingHorizontal: '9%' }}>
            <Text className="text-base font-medium text-white text-center" style={{ lineHeight: 22.4 }}>
              {nickname} 님은
            </Text>
            <Text className="text-xl font-bold text-white text-center" style={{ lineHeight: 28 }}>
              {result.cosmic_type.label}
            </Text>
          </View>

          {/* 내부 콘텐츠 패널 */}
          <View
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              marginHorizontal: '5.7%',
              marginTop: '3%',
              padding: '5.7%',
            }}
          >
          {/* 연애 스타일 */}
          <View className="gap-1">
            <Text className="text-base font-semibold text-white" style={{ lineHeight: 22.4 }}>
              연애 스타일
            </Text>
            <Text className="text-sm text-white" style={{ lineHeight: 19.6 }}>
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
            className="my-4"
            style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          />

          {/* 자주 듣는 말 */}
          <View className="gap-1">
            <Text className="text-base font-semibold text-white" style={{ lineHeight: 22.4 }}>
              이런 말을 자주 들어요
            </Text>
            <Text className="text-sm text-white" style={{ lineHeight: 19.6 }}>
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
            className="my-4"
            style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
          />

          {/* 궁합이 좋은 유형 */}
          <View className="gap-1">
            <Text className="text-base font-semibold text-white" style={{ lineHeight: 22.4 }}>
              궁합이 좋은 유형
            </Text>
            <View className="flex-row items-center gap-2 mt-1">
              {result.matches.map((match) => {
                const matchImage = COSMIC_CHARACTER_IMAGE[match.type];
                return (
                  <View key={match.type} style={{ width: 50 }} className="items-center">
                    <View style={{ width: 50, height: 50 }} className="items-center justify-center">
                      {matchImage ? (
                        <Image
                          source={matchImage}
                          style={{ width: 50, height: 43 }}
                          resizeMode="contain"
                        />
                      ) : (
                        <Text className="text-lg">✨</Text>
                      )}
                    </View>
                    <Text className="text-sm text-white text-center" style={{ lineHeight: 19.6 }}>
                      {match.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
        </View>
      </ProfileCardGradientBackground>
    </View>
  );
}
