import React, { memo } from 'react';
import { View, Text } from 'react-native';
import InfoCard from './InfoCard';

/**
 * # CosmicTypeSection
 * ---
 * - 간단설명: 코스믹 유형 테스트 탭 섹션
 * ---
 * @example
 * <CosmicTypeSection />
 */
const CosmicTypeSection = memo(function CosmicTypeSection() {
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
            슈팅스타 유형
          </Text>
          <Text
            className="text-sm font-medium text-text-black text-center"
            style={{ lineHeight: 19.6 }}
          >
            {'사랑이 시작되면\n누구보다 빠르게 빛나는 사람'}
          </Text>
        </View>
      </View>
    </InfoCard>
  );
});

export default CosmicTypeSection;
