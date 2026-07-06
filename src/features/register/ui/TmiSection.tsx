import React, { memo } from 'react';
import { View, Text } from 'react-native';
import InfoCard from './InfoCard';

/**
 * TMI 답변 항목
 * - question: 질문 텍스트
 * - answer: 답변 텍스트
 */
interface TmiAnswerItem {
  question: string;
  answer: string;
}

/**
 * # TmiSection
 * ---
 * - 간단설명: 나만의 TMI 탭 섹션 (질문-답변 목록)
 * - 제약사항 및 특이사항:
 *   - API의 choice_template + short_template 데이터를 question/answer 형식으로 수용
 * ---
 * @param tmiAnswers TMI 답변 배열 ({ question, answer })
 * ---
 * @example
 * <TmiSection tmiAnswers={[{ question: '전화파 vs 문자파?', answer: '문자파' }]} />
 */
const TmiSection = memo(function TmiSection({
  tmiAnswers,
}: {
  tmiAnswers: TmiAnswerItem[];
}) {
  return (
    <InfoCard title="나만의 TMI">
      {tmiAnswers.length > 0 ? (
        <View className="gap-3">
          {tmiAnswers.map((tmi, index) => (
            <View key={index}>
              <Text
                className="text-sm font-medium text-text-gray4 mb-1"
                style={{ lineHeight: 19.6 }}
              >
                {tmi.question}
              </Text>
              <Text
                className="text-sm font-medium text-text-black"
                style={{ lineHeight: 19.6 }}
              >
                {tmi.answer}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <Text className="text-sm text-text-gray4">
          등록된 TMI가 없습니다
        </Text>
      )}
    </InfoCard>
  );
});

export default TmiSection;
