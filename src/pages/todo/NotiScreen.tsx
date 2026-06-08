import React, { useEffect } from "react";
import { Button } from "@/shared/ui/Button";
import { View } from "react-native";
import notifee, { EventType } from '@notifee/react-native';

/**
 * # NotiScreen
 * ---
 * - 간단설명: 로컬 푸시 알림 테스트 화면 - 알림 권한 요청 및 즉시 발송 버튼 제공
 * - 제약사항 및 특이사항: iOS 권한 요청 필요, Android는 채널 생성 필요
 * ---
 * @example
 * <NotiScreen />
 */
export default function NotiScreen() {
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        console.log('Notification pressed:', detail.notification);
      }
    });
  }, []);

  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <View>
      <Button title="Display Notification" onPress={() => onDisplayNotification()} />
    </View>
  );
}