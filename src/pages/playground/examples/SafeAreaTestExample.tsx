import { useNavigation } from '@react-navigation/native';
import type { NavigationPropType } from '@/shared/types';
import { Button } from '@/shared/ui';
import Section from './Section';

/**
 * # SafeAreaTestExample
 * ---
 * - 간단설명: SafeArea 테스트 페이지로 이동하는 버튼 예제
 * ---
 * @example
 * <SafeAreaTestExample />
 */
export default function SafeAreaTestExample() {
  const navigation = useNavigation<NavigationPropType>();

  return (
    <Section title="SafeArea 테스트">
      <Button
        title="SafeArea 테스트 페이지로 이동"
        variant="secondary"
        onPress={() => navigation.navigate('safeAreaTest')}
      />
    </Section>
  );
}
