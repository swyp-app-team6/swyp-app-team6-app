import React, { memo } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { ImageSourcePropType } from 'react-native';
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
  /** 뱃지 카운트 (전달 시 카드 상단에 빨간 뱃지 표시) */
  badgeCount?: number;
}

/**
 * # HomeCardBackNew
 * ---
 * - 간단설명: 홈 화면 프로필 카드 뒷면 (신규 디자인) — 코스믹 유형 캐릭터·유형명·설명 표시
 * - 제약사항 및 특이사항:
 *   - 284×392 고정 크기
 *   - 보라색 세로 그라디언트 배경 (react-native-linear-gradient)
 *   - 캐릭터 이미지에 흰색 glow 그림자 효과 적용 (iOS shadowColor)
 *   - badgeCount 전달 시 좌상단 빨간 뱃지 노출
 * ---
 * @param cosmicType 코스믹 유형 코드
 * @param badgeCount 선택적 뱃지 숫자
 * ---
 * @example
 * <HomeCardBackNew cosmicType="SHOOTING_STAR" badgeCount={1} />
 */
const HomeCardBackNew = memo(function HomeCardBackNew({ cosmicType, badgeCount }: Props) {
  const { data: result, isLoading } = useCosmicTypeQuery(cosmicType);
  const characterImage = COSMIC_CHARACTER_IMAGE[cosmicType];

  return (
    <View style={{ width: 284, height: 392 }}>
      {/* 카드 배경: 보라색 그라디언트 + 테두리 */}
      <LinearGradient
        colors={['rgba(135,67,237,0.8)', 'rgba(80,50,213,0.8)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: 'absolute',
          width: 284,
          height: 392,
          borderRadius: 12,
          overflow: 'hidden',
          borderWidth: 2,
          borderColor: '#EADCFF',
        }}
      >
        {/* 뱃지 */}
        {badgeCount !== undefined && (
          <View
            style={{
              position: 'absolute',
              left: 43,
              top: 30,
              width: 25,
              height: 26,
              backgroundColor: '#FF0000',
              borderRadius: 999,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 14, fontFamily: 'Pretendard', fontWeight: '400' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </LinearGradient>

      {/* 캐릭터 이미지 (흰색 glow 그림자) */}
      {characterImage && (
        <Image
          source={characterImage}
          style={{
            position: 'absolute',
            left: 56,
            top: 76,
            width: 172,
            height: 169,
            shadowColor: '#FFFFFF',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.5,
            shadowRadius: 10,
          }}
          resizeMode="contain"
        />
      )}

      {/* 텍스트 영역: 유형명 + 설명 */}
      {isLoading || !result ? (
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={{ position: 'absolute', top: 160, left: 112 }}
        />
      ) : (
        <View
          style={{
            position: 'absolute',
            left: 20,
            top: 265,
            width: 244,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              alignSelf: 'stretch',
              textAlign: 'center',
              color: 'white',
              fontSize: 18,
              fontFamily: 'Pretendard',
              fontWeight: '700',
              lineHeight: 25.2,
            }}
          >
            {result.cosmic_type.label}
          </Text>
          <Text
            style={{
              alignSelf: 'stretch',
              textAlign: 'center',
              color: 'white',
              fontSize: 14,
              fontFamily: 'Pretendard',
              fontWeight: '500',
              lineHeight: 19.6,
              marginTop: 8,
            }}
          >
            {result.detail}
          </Text>
        </View>
      )}
    </View>
  );
});

export default HomeCardBackNew;
