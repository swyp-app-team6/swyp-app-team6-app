import { Alert, View } from 'react-native';
import EmptyProfileCard from '@/shared/ui/ProfileCard/EmptyProfileCard';
import Section from './Section';

/**
 * # EmptyProfileCardExample
 * ---
 * - 간단설명: EmptyProfileCard 비어있는 프로필 카드를 확인하는 예제
 * ---
 * @example
 * <EmptyProfileCardExample />
 */
export default function EmptyProfileCardExample() {
  return (
    <Section title="EmptyProfileCard — 비어있는 프로필 카드">
      <View className="items-center gap-4">
        <EmptyProfileCard
          text="새로운 프로필 카드를 추가하세요"
          onPress={() => Alert.alert('EmptyProfileCard', '프로필 생성으로 이동')}
        />
        <EmptyProfileCard
          text="유형 테스트를 통해 나의 유형을 찾아보세요!"
          onPress={() => Alert.alert('EmptyProfileCard', '유형 테스트로 이동')}
        />
      </View>
    </Section>
  );
}
