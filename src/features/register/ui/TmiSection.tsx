import React, { memo } from 'react';
import { View, Text } from 'react-native';
import InfoCard from './InfoCard';
import TmiItem from './TmiItem';

/**
 * # TmiSection
 * ---
 * - 간단설명: 나만의 TMI 탭 섹션 (질문-답변 목록)
 * ---
 * @param tmiAnswers TMI 답변 배열
 * ---
 * @example
 * <TmiSection tmiAnswers={[{ questionId: 'q1', answer: '답변' }]} />
 */
const TmiSection = memo(function TmiSection({
  tmiAnswers,
}: {
  tmiAnswers: { questionId: string; answer: string }[];
}) {
  return (
    <InfoCard title="나만의 TMI">
      {tmiAnswers.length > 0 ? (
        <View className="gap-3">
          {tmiAnswers.map((tmi) => (
            <TmiItem
              key={tmi.questionId}
              questionId={tmi.questionId}
              answer={tmi.answer}
            />
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
