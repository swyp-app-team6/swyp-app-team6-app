import { useState } from 'react';
import { Alert } from 'react-native';
import { AlertModal, Button } from '@/shared/ui';
import Section from './Section';

/**
 * # AlertModalExample
 * ---
 * - 간단설명: AlertModal 확인/취소 알림 팝업을 확인하는 예제
 * ---
 * @example
 * <AlertModalExample />
 */
export default function AlertModalExample() {
  const [alertVisible, setAlertVisible] = useState(false);

  return (
    <Section title="AlertModal — 확인/취소 알림 팝업">
      <Button title="알림 모달 열기" variant="secondary" onPress={() => setAlertVisible(true)} />
      <AlertModal
        visible={alertVisible}
        title="삭제 확인"
        message="정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmText="삭제"
        cancelText="취소"
        onConfirm={() => {
          setAlertVisible(false);
          Alert.alert('삭제 완료', '항목이 삭제되었습니다.');
        }}
        onCancel={() => setAlertVisible(false)}
      />
    </Section>
  );
}
