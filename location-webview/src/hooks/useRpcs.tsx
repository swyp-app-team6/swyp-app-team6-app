/**
 * # useRpcs
 * ---
 * - 간단설명: @react-native-webview-rpc/web의 wrap() 인스턴스를 제공하는 훅
 * - 제약사항 및 특이사항:
 *   - 네이티브 함수를 비동기로 호출 가능
 * ---
 * @example
 * const rpcs = useRpcs();
 * await rpcs.onStartSendLocation();
 */

import { useMemo } from 'react';
import { wrap } from '@react-native-webview-rpc/web';

interface NativeRpcs {
  onStartSendLocation: () => Promise<void>;
  onStopSendLocation: () => Promise<void>;
  alert: (message: string) => Promise<void>;
}

export function useRpcs(): NativeRpcs {
  return useMemo(() => wrap<NativeRpcs>(), []);
}
