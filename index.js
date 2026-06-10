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
import * as Sentry from "@sentry/react-native";
import Config from 'react-native-config';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Background message:', remoteMessage);
// });

/**
 * Sentry config
 */
Sentry.init({
  dsn: Config.SENTRY_DSN,
  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,
});

AppRegistry.registerComponent(appName, () => App);
