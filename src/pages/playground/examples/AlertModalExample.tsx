import { View } from 'react-native';
import { Button, openDialog } from '@/shared/ui';
import Section from './Section';

/**
 * # AlertModalExample
 * ---
 * - 간단설명: Dialog 알림 팝업 예제 (title+message / message only)
 * ---
 * @example
 * <AlertModalExample />
 */
export default function AlertModalExample() {
  return (
    <Section title="Dialog — 알림 팝업">
      <View className="gap-3">
        <Button
          title="title + message"
          variant="secondary"
          onPress={() =>
            openDialog({
              type: 'confirm',
              title: '삭제 확인',
              message: '정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
              okLabel: '삭제',
              cancelLabel: '취소',
            })
          }
        />
        <Button
          title="message only"
          variant="secondary"
          onPress={() =>
            openDialog({
              message: '회원 탈퇴가 완료되었습니다.',
            })
          }
        />
      </View>
    </Section>
  );
}
