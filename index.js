/**
 * @format
 */

if (__DEV__) {
  require('./src/shared/lib/reactotron');
}

// TODO: ios/GoogleService-Info.plist 추가 후 다시 적용
// import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import App from './src/app/App';
import { name as appName } from './app.json';
import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

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
  sendDefaultPii: true,

  // Enable Logs, 배포환경에서만 활성화
  enableLogs: Config.PROJECT_ENV === 'prod',

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

AppRegistry.registerComponent(appName, () => App);
