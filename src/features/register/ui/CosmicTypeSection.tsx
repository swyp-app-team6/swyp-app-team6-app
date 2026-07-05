import React, { memo } from 'react';
import { View, Text } from 'react-native';
import type { CosmicType } from '@/shared/enums';
import { COSMIC_TYPE_RESULTS } from '../model/cosmicTypeResults';
import InfoCard from './InfoCard';

/**
 * # CosmicTypeSection
 * ---
 * - 간단설명: 코스믹 유형 테스트 탭 섹션
 * - 제약사항 및 특이사항:
 *   - cosmicType이 없으면 미등록 안내 표시
 *   - API의 cosmicTypeDetail이 있으면 우선 사용, 없으면 로컬 결과 데이터 사용
 * ---
 * @param cosmicType 코스믹 유형 코드
 * @param cosmicTypeDetail 코스믹 유형 상세 설명 (API 응답)
 * @example
 * <CosmicTypeSection cosmicType="SHOOTING_STAR" cosmicTypeDetail="설명" />
 */
const CosmicTypeSection = memo(function CosmicTypeSection({
  cosmicType,
  cosmicTypeDetail,
}: {
  cosmicType?: CosmicType;
  cosmicTypeDetail?: string;
}) {
  if (!cosmicType) {
    return (
      <InfoCard title="코스믹 유형 테스트" centered>
        <Text className="text-sm text-text-gray4">
          등록된 코스믹 유형이 없습니다
        </Text>
      </InfoCard>
    );
  }

  const result = COSMIC_TYPE_RESULTS[cosmicType];
  const displayName = result?.name ?? cosmicType;
  const displayDesc = cosmicTypeDetail ?? result?.description ?? '';

  return (
    <InfoCard title="코스믹 유형 테스트" centered>
      <View className="items-center pt-4 gap-4">
        <View className="w-40 h-40 items-center justify-center overflow-hidden">
          <Text className="text-6xl">🔮</Text>
        </View>
        <View className="items-center gap-2">
          <Text
            className="text-lg font-bold text-text-black text-center"
            style={{ lineHeight: 25.2 }}
          >
            {displayName}
          </Text>
          <Text
            className="text-sm font-medium text-text-black text-center"
            style={{ lineHeight: 19.6 }}
          >
            {displayDesc}
          </Text>
        </View>
      </View>
    </InfoCard>
  );
});

export default CosmicTypeSection;
