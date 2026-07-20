import { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, ProgressBar } from '@/shared/ui';
import Section from './Section';

/**
 * # ProgressBarExample
 * ---
 * - 간단설명: ProgressBar 진행률 표시 바의 연속/단계(steps) 모드를 확인하는 예제
 * ---
 * @example
 * <ProgressBarExample />
 */
export default function ProgressBarExample() {
  const [progress, setProgress] = useState(40);

  return (
    <Section title="ProgressBar — 진행률 표시 바">
      <View className="gap-4">
        <ProgressBar value={progress} />
        <View className="flex-row gap-2">
          <Button title="0%" variant="secondary" onPress={() => setProgress(0)} />
          <Button title="50%" variant="secondary" onPress={() => setProgress(50)} />
          <Button title="100%" variant="secondary" onPress={() => setProgress(100)} />
        </View>
        <Text className="text-xs text-text-gray4">Steps (5단계)</Text>
        <ProgressBar value={progress} steps={5} />
      </View>
    </Section>
  );
}
