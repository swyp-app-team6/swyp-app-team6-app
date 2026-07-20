import { View } from 'react-native';
import { TextField } from '@/shared/ui';
import Section from './Section';

/**
 * # TextFieldExample
 * ---
 * - 간단설명: TextField 컴포넌트의 기본/에러/라벨없음 상태를 확인하는 예제
 * ---
 * @example
 * <TextFieldExample />
 */
export default function TextFieldExample() {
  return (
    <Section title="TextField — 라벨+에러 지원 단일행 입력">
      <View className="gap-3">
        <TextField label="기본 입력" placeholder="입력하세요" />
        <TextField label="에러 상태" placeholder="입력하세요" error="필수 항목입니다" />
        <TextField placeholder="라벨 없음" />
      </View>
    </Section>
  );
}
