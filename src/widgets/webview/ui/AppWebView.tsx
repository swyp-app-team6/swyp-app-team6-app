import React, { useCallback, useRef } from 'react';
import { View } from 'react-native';
import WebView, { type WebViewMessageEvent } from 'react-native-webview';
import { useWebViewRpcHandler } from "@react-native-webview-rpc/native";
import { useRpcs } from '../../location/rpcs';

interface AppWebViewProps {
  /** WebView에 로드할 URL */
  url: string;
}

/**
 * # AppWebView
 * ---
 * - 간단설명: 위치 데이터를 WebView로 전달하는 브릿지 컴포넌트
 * - 제약사항 및 특이사항:
 *   - useRpcs 훅으로 위치 추적 + RPC 통합
 *   - Web→Native 메시지는 react-native-webview-rpc로 처리
 * ---
 * @param url WebView에 로드할 URL
 * @example
 * <AppWebView url="https://map.example.com" />
 */
export default function AppWebView({ url }: AppWebViewProps) {
  const webViewRef = useRef<WebView>(null);
  // TODO: 자체 rpc 라이브러리 사용해 리팩토링 필요
  const rpcs = useRpcs(webViewRef);
  const onRpcMessage = useWebViewRpcHandler(webViewRef, rpcs);

  const handleMessage = useCallback((event: WebViewMessageEvent) => {
    onRpcMessage(event);
  }, [onRpcMessage]);

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
