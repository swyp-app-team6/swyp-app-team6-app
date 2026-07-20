import { Alert, View } from 'react-native';
import { SelectedTMIPreviewButton } from '@/shared/ui';
import Section from './Section';

/**
 * # SelectedTMIPreviewButtonExample
 * ---
 * - 간단설명: SelectedTMIPreviewButton 선택 TMI 미리보기 버튼을 확인하는 예제
 * ---
 * @example
 * <SelectedTMIPreviewButtonExample />
 */
export default function SelectedTMIPreviewButtonExample() {
  return (
    <Section title="SelectedTMIPreviewButton — 선택 TMI 미리보기 버튼">
      <View className="gap-3">
        <SelectedTMIPreviewButton count={2} onPress={() => Alert.alert('미리보기')} />
        <SelectedTMIPreviewButton count={5} onPress={() => { }} />
      </View>
    </Section>
  );
}
