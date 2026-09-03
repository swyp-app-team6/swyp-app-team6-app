import React, { useCallback, useRef } from 'react';
import { Alert, NativeModules, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import type WebView from 'react-native-webview';
import { useAuthStore } from '../../entities/user';

const { ForegroundLocationService } = NativeModules;

/**
 * # useRpcs
 * ---
 * - 간단설명: WebView RPC 핸들러 훅 — 위치 추적 제어 + 초기값 전달
 * - 제약사항 및 특이사항:
 *   - Android 전용 위치 서비스 (iOS 미지원)
 *   - 1초 간격 getLocationInfo() 폴링, 위치값은 ref에 보관
 *   - onSendLocation 호출 시 현재 ref 값 반환
 *   - Android 10+: ACCESS_BACKGROUND_LOCATION 별도 요청
 * ---
 * @example
 * const rpcs = useRpcs();
 * // AppWebView에서: useWebViewRpcHandler(webViewRef, rpcs)
 */
export function useRpcs(webViewRef: React.RefObject<WebView | null>) {
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isRunningRef = useRef(false);
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

  /** 폴링 시작 — 1초마다 네이티브에서 위치 읽어 ref 갱신 */
  const startPolling = useCallback(() => {
    if (pollingRef.current) return;

    pollingRef.current = setInterval(async () => {
      try {
        const info: string = await ForegroundLocationService.getLocationInfo();
        const parts = info.split('/');
        if (parts.length >= 3) {
          latRef.current = parseFloat(parts[0]);
          lngRef.current = parseFloat(parts[1]);
          isEnabledRef.current = parts[2] === 'true';

          // WebView로 push
          if (webViewRef.current) {
            const payload = JSON.stringify({
              lat: latRef.current,
              lng: lngRef.current,
              degree: degreeRef.current,
              isEnabled: isEnabledRef.current,
            });
            console.log('########111', payload);
            webViewRef.current.injectJavaScript(
              `window.onLocationUpdate && window.onLocationUpdate(${payload}); true;`
            );
          }
        }
      } catch {
        // 서비스 중지 상태에서의 에러 무시
      }
    }, 1000);
  }, []);

  /** 폴링 중지 */
  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const rpcs = {
    /**
     * 네이티브 Alert 표시
     */
    async alert(title: string, body: string) {
      Alert.alert(title, body);
      return 'ok';
    },

    /**
     * WebView 로드 완료 시 초기값 전달
     */
    onWebviewLoadEnd() {
      const { accessToken } = useAuthStore.getState();
      return { accessToken };
    },

    /**
     * 위치 전송 시작 — 권한 요청 → Foreground Service 시작 → 폴링 시작
     */
    async onStartSendLocation() {
      console.log('[Location] onStartSendLocation 호출됨, platform:', Platform.OS);
      if (Platform.OS !== 'android') return { success: false };

      const granted = await requestLocationPermission();
      console.log('[Location] 권한 결과:', granted);
      if (!granted) return { success: false };

      ForegroundLocationService.start();
      isRunningRef.current = true;
      startPolling();
      console.log('[Location] 서비스 + 폴링 시작됨');
      return { success: true };
    },

    /**
     * 위치 전송 종료 — 폴링 중지 → Foreground Service 중지
     */
    onStopSendLocation() {
      if (Platform.OS !== 'android') return;

      stopPolling();
      ForegroundLocationService.stop();
      isRunningRef.current = false;
    },

    /**
     * 현재 위치/방향값을 WebView에 전달
     */
    onSendLocation() {
      return {
        lat: latRef.current,
        lng: lngRef.current,
        degree: degreeRef.current,
        isEnabled: isEnabledRef.current,
        isRunning: isRunningRef.current,
      };
    },

    /**
     * 서버 전송용 인증 정보 설정
     */
    setConfig(token: string, baseURL: string) {
      if (Platform.OS !== 'android') return;
      ForegroundLocationService.setConfig(token, baseURL);
    },
  };

  return rpcs;
}

export type WebViewRpcs = ReturnType<typeof useRpcs>;
