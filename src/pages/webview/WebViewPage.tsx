import React from 'react';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { AppWebView } from '@/widgets/webview';
import type { NavigatorType } from '@/shared/types';

const WEBVIEW_URL = 'http://172.30.1.6:5173/location';
/**
 * # WebViewPage
 * ---
 * - 간단설명: WebView를 전체 화면으로 표시하는 페이지
 * - 제약사항 및 특이사항:
 *   - url 파라미터로 로드할 웹 앱 URL 전달
 *   - 위치 서비스 ↔ WebView 브릿지 자동 연결
 * ---
 * @example
 * navigation.navigate('webview', { url: 'https://map.example.com' })
 */
function WebViewPage() {
  // const route = useRoute<RouteProp<NavigatorType, 'webview'>>();
  return <AppWebView url={WEBVIEW_URL} />;
}

export default WebViewPage;
