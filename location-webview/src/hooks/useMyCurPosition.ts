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

  // TODO: 자체 rpc 라이브러리 사용해 리팩토링 필요
  useEffect(() => {
    const unsubPosition = bridge.on('positionUpdate', (data) => {
      const { lat, lng, isEnabled } = data as { lat: number; lng: number; isEnabled: boolean };
      console.log('positionUpdate', data);
      setPosition(lat, lng);
      setEnabled(isEnabled);
    });

    const unsubDegree = bridge.on('degreeUpdate', (data) => {
      const { degree } = data as { degree: number };
      setDegree(degree);
    });

    window.onLocationUpdate = (data) => {
      const { lat, lng, degree } = data as { lat: number; lng: number; degree: number; isEnabled: boolean };
      console.log('onLocationUpdate', data);
      setPosition(lat, lng);
      setDegree(degree);
    }

    return () => {
      unsubPosition();
      unsubDegree();
    };
  }, [bridge, setPosition, setDegree, setEnabled]);

  const startMyLocation = async () => {
    try {
      await rpcs.onStartSendLocation();
      setEnabled(true);
    } catch {
      console.warn('[Location] 추적 시작 실패');
    }
  };

  const stopMyLocation = async () => {
    try {
      await rpcs.onStopSendLocation();
      reset();
    } catch {
      console.warn('[Location] 추적 중지 실패');
    }
  };

  return { startMyLocation, stopMyLocation };
}
