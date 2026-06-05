// TODO: ios/GoogleService-Info.plist 추가 후 다시 적용

// import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
// import { Alert, Linking } from 'react-native'
// import notifee from '@notifee/react-native';
// import { AndroidColor } from '@notifee/react-native';
// import React, { useEffect, useRef } from 'react';

// /**
//  * background/quit 상태
//  */
// export default function useFcmMessage() {
//   const pushAuthorizedStatus = useRef<typeof AuthorizationStatus[keyof typeof AuthorizationStatus] | null>(null)
//   useEffect(() => {
//     let _unsubscribeMsg: null | (() => void) = null;
//     (async () => {
//       // 1. 권한 상태 확인
//       await getPermissionStatus();
//       if (isAuthorized()) {
//         // 2. 토큰 발급 후 토픽 구독
//         await getToken();
//         await messaging().subscribeToTopic('all');
//         console.log('######### authorized')
//         /**
//          * foreground message
//          */
//         _unsubscribeMsg = messaging().onMessage(async msg => {
//           const title = msg.notification?.title;
//           const body = msg.notification?.body;
//           title && body && showNotiMsg(title, body)
//           console.log('Foreground message:', msg);
//         });
//         /**
//          * background message
//          */
//         messaging().setBackgroundMessageHandler(async msg => {
//           const title = msg.notification?.title;
//           const body = msg.notification?.body;
//           title && body && showNotiMsg(title, body)
//           console.log('created', msg)
//         });
//       } else if (isDenied()) {
//         // 거부된 상태: 설정 유도
//         Alert.alert(
//           '알림 권한이 꺼져있어요',
//           '푸시 알림을 받으려면 설정에서 권한을 켜주세요.',
//           [
//             { text: '취소', style: 'cancel' },
//             { text: '설정으로 이동', onPress: () => Linking.openSettings() },
//           ]
//         );
//       } else {
//         // 미결정 상태: 권한 요청 후 재시도
//         await messaging().requestPermission();
//         await getToken();
//         await messaging().subscribeToTopic('all');
//       }
//     })();
//     return () => {
//       _unsubscribeMsg && _unsubscribeMsg();
//     }
//   }, [])

//   const showNotiMsg = async (title: string, body: string) => {
//     await notifee.requestPermission()
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//     })
//     await notifee.displayNotification({
//       title,
//       body,
//       android: {
//         channelId
//       }
//     })
//   }

//   const isAuthorized = () => {
//     const status = pushAuthorizedStatus.current;
//     return status === AuthorizationStatus.AUTHORIZED || status === AuthorizationStatus.PROVISIONAL;
//   }


//   const isDenied = () => {
//     const status = pushAuthorizedStatus.current;
//     return status === messaging.AuthorizationStatus.DENIED;
//   }

//   const isNotAuthorized = () => {
//     const status = pushAuthorizedStatus.current;
//     return status === messaging.AuthorizationStatus.NOT_DETERMINED;
//   }

//   const getPermissionStatus = async () => {
//     if (!pushAuthorizedStatus.current) {
//       pushAuthorizedStatus.current = await messaging().requestPermission();
//     }
//     return pushAuthorizedStatus.current;
//   }

//   const getToken = async () => {
//     const token = await messaging().getToken()
//     return token;
//   }
// }
