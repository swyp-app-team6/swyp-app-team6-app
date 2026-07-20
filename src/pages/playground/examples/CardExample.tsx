import { useState } from 'react';
import { Text, View } from 'react-native';
import { Card, SwipeableCard } from '@/shared/ui';
import Section from './Section';

const INITIAL_CARDS = [
  { id: '1', title: '첫 번째 카드', description: '오른쪽으로 스와이프해서 삭제하세요.' },
  { id: '2', title: '두 번째 카드', description: '카드 컴포넌트 예시입니다.' },
  { id: '3', title: '세 번째 카드', description: '삭제 버튼을 탭하면 사라집니다.' },
];

/**
 * # CardExample
 * ---
 * - 간단설명: Card / SwipeableCard 카드 컨테이너와 스와이프 삭제를 확인하는 예제
 * ---
 * @example
 * <CardExample />
 */
export default function CardExample() {
  const [cards, setCards] = useState(INITIAL_CARDS);

  return (
    <Section title="Card / SwipeableCard — 카드 컨테이너 (스와이프 삭제)">
      <Card styleClass={{ root: 'mb-3' }}>
        <Text className="font-semibold text-gray-900">기본 카드</Text>
        <Text className="text-sm text-gray-500 mt-1">rounded card 컴포넌트입니다.</Text>
      </Card>
      <View className="gap-2">
        {cards.map((card) => (
          <SwipeableCard
            key={card.id}
            onDelete={() => setCards((prev) => prev.filter((c) => c.id !== card.id))}
          >
            <Text className="font-semibold text-gray-900">{card.title}</Text>
            <Text className="text-sm text-gray-500 mt-1">{card.description}</Text>
          </SwipeableCard>
        ))}
        {cards.length === 0 && (
          <Text className="text-center text-gray-400 text-sm py-4">모든 카드가 삭제되었습니다.</Text>
        )}
      </View>
    </Section>
  );
}
