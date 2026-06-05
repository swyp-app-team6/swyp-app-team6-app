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

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Background message:', remoteMessage);
// });

AppRegistry.registerComponent(appName, () => App);
