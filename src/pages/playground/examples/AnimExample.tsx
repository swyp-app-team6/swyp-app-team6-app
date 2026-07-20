import { useState } from 'react';
import { Text, View } from 'react-native';
import { Anim, Button } from '@/shared/ui';
import Section from './Section';

/**
 * # AnimExample
 * ---
 * - 간단설명: Anim.Fade / Anim.ScaleFade 등장 애니메이션을 확인하는 예제
 * ---
 * @example
 * <AnimExample />
 */
export default function AnimExample() {
  const [animType, setAnimType] = useState<'in' | 'out'>('in');

  return (
    <Section title="Anim — 페이드/스케일 등장 애니메이션">
      <View className="mb-3 flex-row gap-2">
        <Button
          title="Fade In"
          variant={animType === 'in' ? 'primary' : 'secondary'}
          onPress={() => setAnimType('in')}
        />
        <Button
          title="Fade Out"
          variant={animType === 'out' ? 'primary' : 'secondary'}
          onPress={() => setAnimType('out')}
        />
      </View>
      <Anim.Fade type={animType} direction="up" styleClass={{ root: 'mb-3' }}>
        <View className="rounded-lg bg-blue-100 p-4">
          <Text className="text-blue-800">Anim.Fade (direction: up)</Text>
        </View>
      </Anim.Fade>
      <Anim.ScaleFade type={animType}>
        <View className="rounded-lg bg-green-100 p-4">
          <Text className="text-green-800">Anim.ScaleFade</Text>
        </View>
      </Anim.ScaleFade>
    </Section>
  );
}
