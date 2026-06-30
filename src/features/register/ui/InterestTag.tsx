import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { INTEREST_OPTIONS } from '../model/types';

/**
 * # InterestTag
 * ---
 * - 간단설명: 관심사 태그 칩 (카드용 overlay / 목록용 outlined 두 가지 변형)
 * ---
 * @param value 관심사 값
 * @param variant 스타일 변형 (overlay: 반투명 흰색 배경, outlined: primary 테두리)
 * ---
 * @example
 * <InterestTag value="TRAVEL" variant="outlined" />
 */
const InterestTag = memo(function InterestTag({
  value,
  variant,
}: {
  value: string;
  variant: 'overlay' | 'outlined';
}) {
  const label = INTEREST_OPTIONS.find((o) => o.value === value)?.label ?? value;

  if (variant === 'overlay') {
    return (
      <View
        className="rounded px-2 py-1 overflow-hidden"
        style={{ backgroundColor: 'rgba(255,255,255,0.4)' }}
      >
        <Text
          className="text-sm font-medium text-white"
          style={{ lineHeight: 16.8 }}
        >
          {label}
        </Text>
      </View>
    );
  }

  return (
    <View className="rounded px-2 py-1 border border-primary overflow-hidden">
      <Text
        className="text-sm font-medium text-primary"
        style={{ lineHeight: 16.8 }}
      >
        {label}
      </Text>
    </View>
  );
});

export default InterestTag;
