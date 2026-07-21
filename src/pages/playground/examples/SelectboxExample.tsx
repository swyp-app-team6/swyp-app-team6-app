import { useState } from 'react';
import { Selectbox } from '@/shared/ui';
import Section from './Section';

/**
 * # SelectboxExample
 * ---
 * - 간단설명: Selectbox 드롭다운 옵션 선택을 확인하는 예제
 * ---
 * @example
 * <SelectboxExample />
 */
export default function SelectboxExample() {
  const [selectValue, setSelectValue] = useState<string | undefined>();

  return (
    <Section title="Selectbox — 드롭다운 옵션 선택">
      <Selectbox
        value={selectValue}
        onSelect={setSelectValue}
        placeholder="옵션을 선택하세요"
        options={[
          { label: '사과', value: 'apple' },
          { label: '바나나', value: 'banana' },
          { label: '체리', value: 'cherry' },
        ]}
      />
    </Section>
  );
}
