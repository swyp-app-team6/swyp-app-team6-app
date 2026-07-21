import { Alert, View } from 'react-native';
import { setAnalyticsUserId, testLogEvent } from '@/shared/lib/analytics';
import { Button } from '@/shared/ui';
import Section from './Section';

/**
 * # FirebaseAnalyticsExample
 * ---
 * - 간단설명: Firebase Analytics 이벤트 전송 및 userId 설정을 테스트하는 예제
 * ---
 * @example
 * <FirebaseAnalyticsExample />
 */
export default function FirebaseAnalyticsExample() {
  return (
    <Section title="Firebase Analytics 테스트">
      <View className="gap-3">
        <Button
          title="test event 이벤트 전송"
          variant="secondary"
          onPress={() => {
            testLogEvent();
            Alert.alert('Analytics', 'test event 이벤트 전송됨');
          }}
        />
        <Button
          title="setUserId (테스트 ID: 9999)"
          variant="secondary"
          onPress={() => {
            setAnalyticsUserId('9999');
            Alert.alert('Analytics', 'setUserId(9999) 완료');
          }}
        />
      </View>
    </Section>
  );
}
