/**
 * index.js
 * 앱 실행시 초기 설정 필요한 부분은 전부 여기 작성
 */

if (__DEV__) {
  require('./src/shared/lib/reactotron');
}

import { AppRegistry } from 'react-native';
import App from './src/app/App';
import { name as appName } from './app.json';
import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';
import { PROJECT_ENV } from './src/shared/lib/env';
import setupInterceptors from './src/shared/api/setupInterceptors';
import { startMsw } from './src/shared/api/mocks/startMsw';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Background message:', remoteMessage);
// });

/**
 * Sentry config
 */
Sentry.init({
  /**
   * sentry dsn
   */
  dsn: Config.SENTRY_DSN,

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: false,

  // Enable Logs, 배포환경에서만 활성화
  enableLogs: !PROJECT_ENV,

  // Configure Session Replay
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

startMsw().then(() => {
  AppRegistry.registerComponent(appName, () => App);
});
