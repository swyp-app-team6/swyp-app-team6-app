import React, { memo } from 'react';
import { View, Text } from 'react-native';

/**
 * # TmiItem
 * ---
 * - 간단설명: TMI 개별 질문-답변 항목
 * ---
 * @param question 질문 텍스트
 * @param answer 답변 텍스트
 * ---
 * @example
 * <TmiItem question="전화파 vs 문자파?" answer="문자파" />
 */
const TmiItem = memo(function TmiItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <View>
      <Text
        className="text-sm font-medium text-text-gray4 mb-1"
        style={{ lineHeight: 19.6 }}
      >
        {question}
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
