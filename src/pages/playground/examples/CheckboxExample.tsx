import { useState } from 'react';
import { View } from 'react-native';
import { Checkbox } from '@/shared/ui';
import Section from './Section';

/**
 * # CheckboxExample
 * ---
 * - 간단설명: Checkbox 컴포넌트의 다양한 상태를 확인하는 예제
 * ---
 * @example
 * <CheckboxExample />
 */
export default function CheckboxExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Section title="Checkbox — 약관 동의 등 체크박스">
      <View className="gap-3">
        <Checkbox
          checked={checked}
          onValueChange={setChecked}
          label={checked ? '체크됨' : '체크 안됨'}
        />
        <Checkbox checked={true} onValueChange={() => { }} label="비활성(checked)" disabled />
        <Checkbox checked={false} onValueChange={() => { }} label="비활성(unchecked)" disabled />
      </View>
    </Section>
  );
}
