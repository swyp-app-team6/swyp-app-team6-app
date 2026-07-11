import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * safearea 사이즈 획득 hook
 * - 안드로이드 작동안됨->32 추가
 */
export default function useSafePaddingBottom() {
  const { bottom } = useSafeAreaInsets();

  return {
    paddingBottom: Platform.OS === 'ios' ? bottom : Math.max(bottom, 8)
  }
}
