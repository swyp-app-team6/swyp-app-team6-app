import { View } from 'react-native';
import { Input, SearchIcon } from '@/shared/ui';
import Section from './Section';

/**
 * # InputExample
 * ---
 * - 간단설명: Input 컴포넌트의 prefix/suffix 슬롯, 라벨, 카운터, 에러 상태를 확인하는 예제
 * ---
 * @example
 * <InputExample />
 */
export default function InputExample() {
  return (
    <Section title="Input — prefix/suffix 슬롯 + 라벨/카운터 인라인 입력">
      <View className="gap-3">
        <Input
          placeholder="검색어 입력 후 Enter"
          prefix={<SearchIcon size={18} color="#BFBFBF" />}
          onEnter={() => { }}
        />
        <Input
          label="이름"
          placeholder="프로필 이름을 입력해주세요"
          maxLength={10}
        />
        <Input
          label="에러 상태"
          placeholder="입력하세요"
          error="필수 항목입니다"
        />
      </View>
    </Section>
  );
}
