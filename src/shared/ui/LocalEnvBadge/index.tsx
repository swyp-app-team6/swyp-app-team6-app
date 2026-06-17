import React from 'react';
import { View, Text } from 'react-native';
import Config from 'react-native-config';

/**
 * # LocalEnvBadge
 * ---
 * - 간단설명: PROJECT_ENV가 'local'일 때만 렌더링되는 로컬 환경 표시 뱃지
 * - 제약사항 및 특이사항:
 *   - Config.PROJECT_ENV === 'local'인 경우에만 표시됨
 *   - 절대 위치(absolute)로 배치되어야 하며, 부모 컨테이너 기준 우측 상단에 위치
 * ---
 * @example
 * <LocalEnvBadge />
 */
export default function LocalEnvBadge() {
  if (Config.PROJECT_ENV !== 'local') {
    return null;
  }

  return (
    <View
      testID="local-env-badge"
      className="absolute top-0 right-0 bg-red-500 px-2 py-0.5 rounded-bl-md z-50"
    >
      <Text className="text-white text-xs font-bold">LOCAL</Text>
    </View>
  );
}
