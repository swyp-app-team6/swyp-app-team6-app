/**
 * # BridgeProvider
 * ---
 * - 간단설명: NativeBridge 싱글턴을 React Context로 제공
 * - 제약사항 및 특이사항:
 *   - useState로 싱글턴 생성하여 리렌더 간 동일 인스턴스 보장
 * ---
 * @param children React children
 * @example
 * <BridgeProvider><App /></BridgeProvider>
 */

import { createContext, useContext, useState, type ReactNode } from 'react';
import { NativeBridge } from './NativeBridge';

const BridgeContext = createContext<NativeBridge | null>(null);

export function BridgeProvider({ children }: { children: ReactNode }) {
  const [bridge] = useState(() => new NativeBridge());
  return (
    <BridgeContext.Provider value={bridge}>
      {children}
    </BridgeContext.Provider>
  );
}

/**
 * # useBridge
 * ---
 * - 간단설명: BridgeContext에서 NativeBridge 인스턴스를 가져오는 훅
 * ---
 * @returns NativeBridge 인스턴스
 */
export function useBridge(): NativeBridge {
  const bridge = useContext(BridgeContext);
  if (!bridge) throw new Error('useBridge must be used within BridgeProvider');
  return bridge;
}
