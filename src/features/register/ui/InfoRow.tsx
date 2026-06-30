import React, { memo } from 'react';
import { View, Text } from 'react-native';

/**
 * # InfoRow
 * ---
 * - 간단설명: 기본정보 라벨-값 한 줄 표시
 * ---
 * @param label 라벨 텍스트
 * @param value 값 텍스트
 * ---
 * @example
 * <InfoRow label="나이" value="25세" />
 */
const InfoRow = memo(function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center gap-4">
      <Text
        className="text-sm font-medium text-text-gray4"
        style={{ width: 56, lineHeight: 19.6 }}
      >
        {label}
      </Text>
      <Text
        className="text-sm font-medium text-text-black flex-1"
        style={{ lineHeight: 19.6 }}
      >
        {value}
      </Text>
    </View>
  );
});

export default InfoRow;
