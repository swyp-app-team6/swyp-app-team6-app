import { useState } from 'react';
import { Text } from 'react-native';
import { ChipSelect } from '@/shared/ui';
import Section from './Section';

/**
 * # ChipSelectExample
 * ---
 * - 간단설명: ChipSelect 다중 선택 칩의 최대 N개 제한을 확인하는 예제
 * ---
 * @example
 * <ChipSelectExample />
 */
export default function ChipSelectExample() {
  const [chipSelected, setChipSelected] = useState<string[]>([]);

  return (
    <Section title="ChipSelect — 다중 선택 칩 (최대 N개)">
      <ChipSelect
        options={[
          { label: '운동', value: 'exercise' },
          { label: '독서', value: 'reading' },
          { label: '음악', value: 'music' },
          { label: '여행', value: 'travel' },
          { label: '요리', value: 'cooking' },
        ]}
        selected={chipSelected}
        onSelect={setChipSelected}
        max={3}
      />
      <Text className="mt-2 text-xs text-gray-400">
        선택: {chipSelected.length > 0 ? chipSelected.join(', ') : '없음'}
      </Text>
    </Section>
  );
}
