import { useState } from 'react';
import { View } from 'react-native';
import { Button } from '@/shared/ui';
import CommonInterestCard from '@/pages/exchangeResult/CommonInterestCard';
import Section from './Section';

/**
 * # CommonInterestCardExample
 * ---
 * - 간단설명: CommonInterestCard 공통 관심사 결과 카드의 있음/없음 상태를 확인하는 예제
 * ---
 * @example
 * <CommonInterestCardExample />
 */
export default function CommonInterestCardExample() {
  const [commonInterestHasCommon, setCommonInterestHasCommon] = useState(true);

  return (
    <Section title="CommonInterestCard — 공통된 관심사 결과 카드">
      <View className="mb-3 flex-row gap-2">
        <Button
          title="공통 있음"
          variant={commonInterestHasCommon ? 'primary' : 'secondary'}
          onPress={() => setCommonInterestHasCommon(true)}
        />
        <Button
          title="공통 없음"
          variant={!commonInterestHasCommon ? 'primary' : 'secondary'}
          onPress={() => setCommonInterestHasCommon(false)}
        />
      </View>
      <View className="items-center">
        <CommonInterestCard
          hasCommon={commonInterestHasCommon}
          interests={commonInterestHasCommon
            ? ['TRAVEL', 'MUSIC', 'CAFE']
            : ['SPORTS', 'GAME', 'MOVIE']
          }
          theirName="민수"
        />
      </View>
    </Section>
  );
}
