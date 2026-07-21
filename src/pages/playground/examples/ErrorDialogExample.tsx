import { Alert } from 'react-native';
import { View } from 'react-native';
import { Button, openErrorDialog } from '@/shared/ui';
import Section from './Section';

/**
 * # ErrorDialogExample
 * ---
 * - 간단설명: ErrorDialog 전역 에러 다이얼로그의 기본/커스텀 호출을 확인하는 예제
 * ---
 * @example
 * <ErrorDialogExample />
 */
export default function ErrorDialogExample() {
  return (
    <Section title="ErrorDialog — 에러 발생 시 전역 다이얼로그 (함수 호출)">
      <View className="gap-2">
        <Button
          title="기본 에러 다이얼로그"
          variant="secondary"
          onPress={() => openErrorDialog()}
        />
        <Button
          title="커스텀 에러 다이얼로그"
          variant="secondary"
          onPress={() =>
            openErrorDialog({
              title: '네트워크 오류',
              message: '인터넷 연결을 확인해주세요',
              buttonLabel: '재시도',
              onRetry: () => Alert.alert('재시도', '재시도 콜백 실행됨'),
            })
          }
        />
      </View>
    </Section>
  );
}
