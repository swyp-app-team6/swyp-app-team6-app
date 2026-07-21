import { View } from 'react-native';
import { Tag } from '@/shared/ui';
import Section from './Section';

/**
 * # TagExample
 * ---
 * - 간단설명: Tag 소형 라벨 태그의 5가지 variant를 확인하는 예제
 * ---
 * @example
 * <TagExample />
 */
export default function TagExample() {
  return (
    <Section title="Tag — 소형 라벨 태그 (5가지 variant)">
      <View className="flex-row flex-wrap gap-2">
        <Tag label="Q1" />
        <Tag label="연애" variant="primary" />
        <Tag label="정보" variant="primary-subtle" />
        <Tag label="성격" variant="secondary" />
        <Tag label="관심사" variant="outline" />
      </View>
    </Section>
  );
}
