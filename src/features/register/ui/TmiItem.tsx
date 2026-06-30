import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { TMI_QUESTIONS } from '../model/tmiData';

/**
 * # TmiItem
 * ---
 * - 간단설명: TMI 개별 질문-답변 항목
 * ---
 * @param questionId TMI 질문 ID
 * @param answer 답변 텍스트
 * ---
 * @example
 * <TmiItem questionId="q1" answer="답변" />
 */
const TmiItem = memo(function TmiItem({
  questionId,
  answer,
}: {
  questionId: string;
  answer: string;
}) {
  const questionText =
    TMI_QUESTIONS.find((q) => q.id === questionId)?.question ?? '';

  return (
    <View>
      <Text
        className="text-sm font-medium text-text-gray4 mb-1"
        style={{ lineHeight: 19.6 }}
      >
        {questionText}
      </Text>
      <Text
        className="text-sm font-medium text-text-black"
        style={{ lineHeight: 19.6 }}
      >
        {answer}
      </Text>
    </View>
  );
});

export default TmiItem;
