/**
 * # useMyCurPosition
 * ---
 * - 간단설명: 위치 추적 시작/중지 + 브릿지 이벤트 수신 훅
 * - 제약사항 및 특이사항:
 *   - bridge.on으로 positionUpdate, degreeUpdate 이벤트 구독
 *   - useEffect cleanup으로 구독 해제
 * ---
 * @example
 * const { startMyLocation, stopMyLocation } = useMyCurPosition();
 */

import { useEffect } from 'react';
import { useBridge } from '../bridge/BridgeProvider';
import { useLocationStore } from '../stores/locationStore';
import { useRpcs } from './useRpcs';

export function useMyCurPosition() {
  const bridge = useBridge();
  const rpcs = useRpcs();
  const { setPosition, setDegree, setEnabled, reset } = useLocationStore();

  useEffect(() => {
    const unsubPosition = bridge.on('positionUpdate', (data) => {
      const { lat, lng, isEnabled } = data as { lat: number; lng: number; isEnabled: boolean };
      setPosition(lat, lng);
      setEnabled(isEnabled);
    });

    const unsubDegree = bridge.on('degreeUpdate', (data) => {
      const { degree } = data as { degree: number };
      setDegree(degree);
    });

    return () => {
      unsubPosition();
      unsubDegree();
    };
  }, [bridge, setPosition, setDegree, setEnabled]);

  const startMyLocation = async () => {
    await rpcs.onStartSendLocation();
    setEnabled(true);
  };

  const stopMyLocation = async () => {
    await rpcs.onStopSendLocation();
    reset();
  };

  return { startMyLocation, stopMyLocation };
}
