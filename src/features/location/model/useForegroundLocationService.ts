import { useCallback, useEffect, useRef } from 'react';
import { NativeModules, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import type WebView from 'react-native-webview';
import { buildNativeMessage, NATIVE_MSG_ID } from '@/shared/lib/nativeMessageFormat';

const { ForegroundLocationService } = NativeModules;

/**
 * # useForegroundLocationService
 * ---
 * - 간단설명: Android Foreground Service 위치 수집을 제어하는 훅
 * - 제약사항 및 특이사항:
 *   - Android 전용 (iOS 미지원)
 *   - Android 10+: ACCESS_BACKGROUND_LOCATION 별도 요청 필요
 *   - 1초 간격 getLocationInfo() 폴링, 위치/방향값은 ref에 보관
 *   - webViewRef 전달 시 폴링마다 postMessage로 직접 전송 (store 경유 없음)
 *   - unmount 시 자동 정리 (폴링 중지, 서비스는 유지)
 * ---
 * @param webViewRef WebView ref — 전달하면 위치 변경 시 postMessage 자동 전송
 * @example
 * const { startForeground, stopForeground, isRunning } = useForegroundLocationService(webViewRef);
 */
export default function useForegroundLocationService(
  webViewRef?: React.RefObject<WebView | null>,
) {
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isRunningRef = useRef(false);

  /** 최신 위치/방향 값 (ref — 리렌더 없이 보관) */
  const latRef = useRef(0);
  const lngRef = useRef(0);
  const isEnabledRef = useRef(false);
  const degreeRef = useRef(0);

  /** 위치 권한 요청 (fine → background 순서) */
  const requestLocationPermission = useCallback(async (): Promise<boolean> => {
    if (Platform.OS !== 'android') return false;

    let status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (status !== RESULTS.GRANTED) {
      status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    if (status !== RESULTS.GRANTED) return false;

    const apiLevel = Platform.Version;
    if (typeof apiLevel === 'number' && apiLevel >= 29) {
      let bgStatus = await check(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
      if (bgStatus !== RESULTS.GRANTED) {
        bgStatus = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
      }
    }

    return true;
  }, []);

  /** 1초 간격 위치 폴링 시작 */
  const startPolling = useCallback(() => {
    if (pollingRef.current) return;

    pollingRef.current = setInterval(async () => {
      try {
        const info: string = await ForegroundLocationService.getLocationInfo();
        // ponytail: 슬래시 구분 레거시 포맷, 웹팀 준비되면 JSON으로 전환
        const parts = info.split('/');
        if (parts.length >= 3) {
          latRef.current = parseFloat(parts[0]);
          lngRef.current = parseFloat(parts[1]);
          isEnabledRef.current = parts[2] === 'true';

          // WebView로 직접 전송
          if (webViewRef?.current) {
            const positionData = `${latRef.current}/${lngRef.current}/${isEnabledRef.current}`;
            const message = buildNativeMessage(NATIVE_MSG_ID.UPDATE_CUR_POSITION, positionData);
            webViewRef.current.postMessage(message);
          }
        }
      } catch {
        // 서비스 중지 상태에서의 에러 무시
      }
    }, 1000);
  }, [webViewRef]);

  /** 폴링 중지 */
  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  /** Foreground Service 시작 */
  const startForeground = useCallback(async () => {
    if (Platform.OS !== 'android') return;

    const granted = await requestLocationPermission();
    if (!granted) return;

    ForegroundLocationService.start();
    isRunningRef.current = true;
    startPolling();
  }, [requestLocationPermission, startPolling]);

  /** Foreground Service 중지 */
  const stopForeground = useCallback(() => {
    if (Platform.OS !== 'android') return;

    stopPolling();
    ForegroundLocationService.stop();
    isRunningRef.current = false;
  }, [stopPolling]);

  /** 서버 전송용 인증 정보 설정 */
  const setConfig = useCallback((token: string, baseURL: string) => {
    if (Platform.OS !== 'android') return;
    ForegroundLocationService.setConfig(token, baseURL);
  }, []);

  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  return {
    startForeground,
    stopForeground,
    setConfig,
    isRunningRef,
    latRef,
    lngRef,
    isEnabledRef,
    degreeRef,
  };
}
