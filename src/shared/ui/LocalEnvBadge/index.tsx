import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { NavigationPropType } from '@/shared/types';

/**
 * # LocalEnvBadge
 * ---
 * - 간단설명: PROJECT_ENV가 'local'일 때만 렌더링되는 로컬 환경 FAB 그룹
 * - 제약사항 및 특이사항:
 *   - Config.PROJECT_ENV === 'local'인 경우에만 표시됨
 *   - LOG FAB: API 로그 페이지로 이동
 *   - DOCS FAB: 컴포넌트 플레이그라운드로 이동
 * ---
 * @example
 * <LocalEnvBadge />
 */
export default function LocalEnvBadge() {
  const navigation = useNavigation<NavigationPropType>();

  if (Config.PROJECT_ENV !== 'local') {
    return null;
  }

  return (
    <View className="absolute bottom-24 right-4 z-50 items-center gap-2">
      <TouchableOpacity
        testID="api-log-badge"
        className="bg-blue-600 w-14 h-14 rounded-full items-center justify-center shadow-lg elevation-5"
        onPress={() => navigation.navigate('apiLog')}
      >
        <Text className="text-white text-sm font-bold">LOG</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="local-env-badge"
        className="bg-red-500 w-14 h-14 rounded-full items-center justify-center shadow-lg elevation-5"
        onPress={() => navigation.navigate('playground')}
      >
        <Text className="text-white text-sm font-bold">DOCS</Text>
      </TouchableOpacity>
    </View>
  );
}
