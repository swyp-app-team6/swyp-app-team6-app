import React, { memo } from 'react';
import { View, Text, Image, ActivityIndicator, type ImageSourcePropType } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { CosmicType } from '@/shared/enums';
import { useCosmicTypeQuery } from '@/entities/cosmic';
import { Button } from '@/shared/ui';
import type { NavigationPropType } from '@/shared/types';

/**
 * 코스믹 유형별 캐릭터 이미지 매핑
 */
const COSMIC_CHARACTER_IMAGE: Record<string, ImageSourcePropType> = {
  SHOOTING_STAR: require('@/assets/characters/cosmictype-shootingstar.png'),
  GALAXY: require('@/assets/characters/cosmictype-galaxy.png'),
  LUNA: require('@/assets/characters/cosmictype-luna.png'),
  SOLA: require('@/assets/characters/cosmictype-solar.png'),
};

/**
 * # CosmicTypeSection
 * ---
 * - 간단설명: 코스믹 유형 정보 표시 섹션
 * - 제약사항 및 특이사항:
 *   - cosmicType이 없으면 미노출 (null 반환)
 *   - cosmicType이 있으면 캐릭터 이미지 + 유형명 + 설명 표시
 *   - showRetestButton이 true이면 하단에 "유형테스트 다시하기" 버튼 표시
 *   - API에서 코스믹 유형 상세 정보를 조회하여 표시
 * ---
 * @param cosmicType 코스믹 유형 코드
 * @param showRetestButton 유형테스트 다시하기 버튼 표시 여부 (내 프로필에서만 true)
 * @example
 * <CosmicTypeSection cosmicType="SHOOTING_STAR" showRetestButton />
 */
const CosmicTypeSection = memo(function CosmicTypeSection({
  cosmicType,
  showRetestButton,
}: {
  cosmicType?: CosmicType;
  showRetestButton?: boolean;
}) {
  const navigation = useNavigation<NavigationPropType>();
  const { data: result, isLoading } = useCosmicTypeQuery(cosmicType);

  if (!cosmicType) {
    return null;
  }

  if (isLoading || !result) {
    return (
      <View
        className="bg-white rounded-xl px-5 py-7 overflow-hidden items-center"
        style={{ borderWidth: 1, borderColor: '#E3E3E3' }}
      >
        <ActivityIndicator size="small" />
      </View>
    );
  }

  const characterImage = COSMIC_CHARACTER_IMAGE[cosmicType];

  return (
    <View
      className="bg-white rounded-xl px-5 py-7 overflow-hidden"
      style={{ borderWidth: 1, borderColor: '#E3E3E3' }}
    >
      {/* 타이틀 */}
      <View className="gap-4">
        <Text
          className="text-base font-semibold text-text-black"
          style={{ lineHeight: 22.4 }}
        >
          코스믹 유형 테스트
        </Text>
      </View>

      {/* 캐릭터 이미지 + 유형 정보 */}
      <View className="items-center pt-4 gap-4">
        <View
          className="items-center justify-center"
          style={{ width: 160, height: 160 }}
        >
          {characterImage && (
            <Image
              source={characterImage}
              style={{ width: 160, height: 160 }}
              resizeMode="contain"
            />
          )}
        </View>

        <View className="items-center gap-2" style={{ width: 244 }}>
          <Text
            className="text-lg font-bold text-text-black text-center self-stretch"
            style={{ lineHeight: 25.2 }}
          >
            {result.cosmic_type.label}
          </Text>
          <Text
            className="text-sm font-medium text-text-black text-center self-stretch"
            style={{ lineHeight: 19.6 }}
          >
            {result.detail}
          </Text>
        </View>

        {showRetestButton && (
          <View className="w-full mt-2">
            <Button
              title="유형테스트 다시하기"
              variant="outline"
              onPress={() => navigation.navigate('cosmicTest')}
            />
          </View>
        )}
      </View>
    </View>
  );
});

export default CosmicTypeSection;
