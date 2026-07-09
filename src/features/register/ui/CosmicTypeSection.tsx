import React, { memo } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { CosmicType } from '@/shared/enums';
import { useCosmicTypeQuery } from '@/entities/cosmic';
import { Button } from '@/shared/ui';
import type { NavigationPropType } from '@/shared/types';
import InfoCard from './InfoCard';

/**
 * # CosmicTypeSection
 * ---
 * - 간단설명: 코스믹 유형 테스트 탭 섹션
 * - 제약사항 및 특이사항:
 *   - cosmicType이 없으면 미등록 안내 + 유형테스트 하기 버튼 표시
 *   - cosmicType이 있으면 유형 정보 + 유형테스트 다시하기 버튼 표시
 *   - API에서 코스믹 유형 상세 정보를 조회하여 표시
 * ---
 * @param cosmicType 코스믹 유형 코드
 * @example
 * <CosmicTypeSection cosmicType="SHOOTING_STAR" />
 */
const CosmicTypeSection = memo(function CosmicTypeSection({
  cosmicType,
}: {
  cosmicType?: CosmicType;
}) {
  const navigation = useNavigation<NavigationPropType>();
  const { data: result, isLoading } = useCosmicTypeQuery(cosmicType);

  if (!cosmicType) {
    return (
      <InfoCard title="코스믹 유형 테스트" centered>
        <Text className="text-sm text-text-gray4">
          등록된 코스믹 유형이 없습니다
        </Text>
        <View className="mt-4">
          <Button
            title="유형테스트 하기"
            variant="outline"
            onPress={() => navigation.navigate('cosmicTest')}
          />
        </View>
      </InfoCard>
    );
  }

  if (isLoading || !result) {
    return (
      <InfoCard title="코스믹 유형 테스트" centered>
        <ActivityIndicator size="small" />
      </InfoCard>
    );
  }

  return (
    <InfoCard title="코스믹 유형 테스트" centered>
      <View className="items-center pt-4 gap-4">
        <View className="items-center gap-2">
          <Text
            className="text-lg font-bold text-text-black text-center"
            style={{ lineHeight: 25.2 }}
          >
            {result.cosmic_type.label}
          </Text>
          <Text
            className="text-sm font-medium text-text-black text-center"
            style={{ lineHeight: 19.6 }}
          >
            {result.detail}
          </Text>
        </View>
        <View className="w-full mt-2">
          <Button
            title="유형테스트 다시하기"
            variant="outline"
            onPress={() => navigation.navigate('cosmicTest')}
          />
        </View>
      </View>
    </InfoCard>
  );
});

export default CosmicTypeSection;
