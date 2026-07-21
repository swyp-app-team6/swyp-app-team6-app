import { View } from 'react-native';
import { Badge } from '@/shared/ui';
import Section from './Section';

/**
 * # BadgeExample
 * ---
 * - 간단설명: Badge 등급/유형 표시 그라디언트 뱃지를 확인하는 예제
 * ---
 * @example
 * <BadgeExample />
 */
export default function BadgeExample() {
  return (
    <Section title="Badge — 등급/유형 표시 그라디언트 뱃지">
      <View className="flex-row flex-wrap gap-2">
        <Badge level="star" />
        <Badge level="galaxy" />
        <Badge level="solar" />
        <Badge level="luna" />
      </View>
    </Section>
  );
}
