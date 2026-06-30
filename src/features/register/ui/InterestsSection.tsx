import React, { memo } from 'react';
import { View, Text } from 'react-native';
import InfoCard from './InfoCard';
import InterestTag from './InterestTag';

/**
 * # InterestsSection
 * ---
 * - 간단설명: 관심사 탭 섹션 (관심사 태그 목록)
 * ---
 * @param interests 관심사 값 배열
 * ---
 * @example
 * <InterestsSection interests={['TRAVEL', 'MUSIC']} />
 */
const InterestsSection = memo(function InterestsSection({
  interests,
}: {
  interests: string[];
}) {
  return (
    <InfoCard title="관심사">
      {interests.length > 0 ? (
        <View className="gap-2">
          <View className="flex-row flex-wrap gap-1">
            {interests.map((interest) => (
              <InterestTag key={interest} value={interest} variant="outlined" />
            ))}
          </View>
        </View>
      ) : (
        <Text className="text-sm text-text-gray4">
          등록된 관심사가 없습니다
        </Text>
      )}
    </InfoCard>
  );
});

export default InterestsSection;
