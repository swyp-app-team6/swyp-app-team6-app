import { View } from 'react-native';
import CosmicResultFrontCard from '@/features/register/ui/CosmicResultFrontCard';
import CosmicResultBackCard from '@/features/register/ui/CosmicResultBackCard';
import { CosmicType } from '@/shared/enums';
import Section from './Section';

const COSMIC_RESULT = {
  cosmic_type: { type: CosmicType.SHOOTING_STAR, label: '별똥별' },
  tags: ['#열정적', '#모험가', '#솔직한'],
  detail: '당신은 강렬한 첫인상으로 상대의 마음을 사로잡는 타입입니다.',
  image_key: 'shooting_star',
  features: ['적극적으로 다가가는 편', '감정 표현이 솔직함'],
  mentions: ['"너는 진짜 솔직한 것 같아"', '"첫인상이 강렬해"'],
  matches: [
    { type: CosmicType.GALAXY, label: '은하수' },
    { type: CosmicType.LUNA, label: '루나' },
  ],
};

/**
 * # CosmicResultCardExample
 * ---
 * - 간단설명: CosmicResultFrontCard / CosmicResultBackCard 코스믹 유형 결과 카드를 확인하는 예제
 * ---
 * @example
 * <CosmicResultCardExample />
 */
export default function CosmicResultCardExample() {
  return (
    <Section title="CosmicResultCard — 코스믹 유형 결과 카드 (앞/뒤)">
      <View className="items-center gap-4">
        <CosmicResultFrontCard nickname="홍길동" result={COSMIC_RESULT} />
        <CosmicResultBackCard nickname="홍길동" result={COSMIC_RESULT} />
      </View>
    </Section>
  );
}
