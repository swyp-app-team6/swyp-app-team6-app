import React from 'react';
import { AppWebView } from '@/widgets/webview';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';

const WEBVIEW_URL = 'http://172.30.1.6:5173/location';

/**
 * # HomePage
 * ---
 * - 간단설명: WebView 지도 화면 (임시 — 원래 홈 위젯 대체)
 * ---
 */
function HomePage() {
  return <AppWebView url={WEBVIEW_URL} />;
}

export default withAuthorization(withLayout(HomePage));
