import { useState } from 'react';
import { View } from 'react-native';
import { TMICard } from '@/shared/ui';
import Section from './Section';

/**
 * # TMICardExample
 * ---
 * - 간단설명: TMICard 질문/답변 카드의 선택 상태를 확인하는 예제
 * ---
 * @example
 * <TMICardExample />
 */
export default function TMICardExample() {
  const [selectedTMI, setSelectedTMI] = useState('');

  return (
    <Section title="TMICard — TMI 질문/답변 카드">
      <View className="gap-3">
        <TMICard
          tag="Q1"
          question="나는 연애할 때 이런 모습이다"
          selected={selectedTMI === '1'}
          onPress={() => setSelectedTMI('1')}
        />
        <TMICard
          tag="Q2"
          question="내가 가장 자주 듣는 말은?"
          answer="너는 진짜 착한 것 같아!"
          selected={selectedTMI === '2'}
          onPress={() => setSelectedTMI('2')}
        />
      </View>
    </Section>
  );
}
