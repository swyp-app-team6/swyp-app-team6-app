import React, { useCallback, useRef } from 'react';
import { View } from 'react-native';
import WebView, { type WebViewMessageEvent } from 'react-native-webview';
import { parseWebMessage, NATIVE_MSG_ID } from '@/shared/lib/nativeMessageFormat';
import { useForegroundLocationService } from '@/features/location';
import { useWebViewRpcHandler } from "@react-native-webview-rpc/native";
import { rpcs } from '../../location/rpcs';

interface AppWebViewProps {
  /** WebView에 로드할 URL */
  url: string;
}

/**
 * # AppWebView
 * ---
 * - 간단설명: 위치 데이터를 WebView로 전달하는 브릿지 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 위치 store 구독하여 변경 시 postMessage로 전송
 *   - Web→Native 메시지 수신하여 서비스 시작/중지
 *   - onLoadEnd에서 WEBVIEW_READY 전송
 * ---
 * @param url WebView에 로드할 URL
 * @example
 * <AppWebView url="https://map.example.com" />
 */
export default function AppWebView({ url }: AppWebViewProps) {
  const webViewRef = useRef<WebView>(null);
  const onRpcMessage = useWebViewRpcHandler(webViewRef, rpcs);
  const { startForeground, stopForeground } = useForegroundLocationService(webViewRef);

  /** 
   * Web→Native 메시지 수신 핸들러 
   * FIXME: react-native-webview-rpc 사용해 흐름 단순화 필요
   * */
  const handleMessage = useCallback((event: WebViewMessageEvent) => {
    onRpcMessage(event);
  }, [startForeground, stopForeground]);

  // /** WebView 로드 완료 시 WEBVIEW_READY 전송 */
  // const handleLoadEnd = useCallback(() => {
    

  //   const { accessToken } = useAuthStore.getState();
  //   const message = buildNativeMessage(NATIVE_MSG_ID.WEBVIEW_READY, {
  //     isFirst: true,
  //     token: accessToken,
  //   });
  //   webViewRef.current.postMessage(message);
  // }, []);

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ uri: url }}
        onMessage={handleMessage}
        onLoadEnd={() => {
          if (!webViewRef.current) return;
          rpcs.onWebviewLoadEnd();
        }}
        javaScriptEnabled
        domStorageEnabled
        geolocationEnabled
        style={{ flex: 1 }}
      />
    </View>
  );
}
