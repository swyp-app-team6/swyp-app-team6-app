import { useState } from 'react';
import { View } from 'react-native';
import { Textbox } from '@/shared/ui';
import Section from './Section';

/**
 * # TextboxExample
 * ---
 * - 간단설명: Textbox 멀티라인 입력의 기본/에러 상태를 확인하는 예제
 * ---
 * @example
 * <TextboxExample />
 */
export default function TextboxExample() {
  const [textboxValue, setTextboxValue] = useState('');

  return (
    <Section title="Textbox — 멀티라인 텍스트 입력 (글자수 카운터)">
      <View className="gap-3">
        <Textbox
          label="자기소개"
          value={textboxValue}
          onChangeText={setTextboxValue}
          maxLength={200}
          placeholder="자기소개를 입력해주세요"
        />
        <Textbox
          label="에러 상태"
          placeholder="에러 예시"
          error="200자 이내로 입력해주세요"
          maxLength={200}
        />
      </View>
    </Section>
  );
}
