import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { cn } from '@/shared/lib/cn';
import Tag from '@/shared/ui/Tag';

interface StyleClass {
  root?: string;
  tag?: string;
  question?: string;
  answer?: string;
}

/**
 * # TMICard
 * ---
 * - 간단설명: TMI 질문/답변 카드 컴포넌트
 * - 제약사항 및 특이사항:
 *   - selected 상태에 따라 보라 테두리/배경 적용
 *   - tag prop 지정 시 좌상단에 Tag 컴포넌트 표시
 *   - answer가 있으면 질문 아래에 답변 텍스트 표시
 * ---
 * @param tag 태그 텍스트 (좌상단 태그)
 * @param question 질문 또는 제목 텍스트
 * @param answer 답변 내용
 * @param selected 선택 상태
 * @param onPress 터치 콜백
 * ---
 * @example
 * ```tsx
 * <TMICard
 *   tag="Q1"
 *   question="나는 연애할 때 이런 모습이다"
 *   selected={false}
 *   onPress={() => {}}
 * />
 *
 * <TMICard
 *   tag="Q2"
 *   question="내가 가장 자주 듣는 말은?"
 *   answer="너는 진짜 착한 것 같아!"
 *   selected={true}
 * />
 * ```
 */

export interface TMICardProps {
  /** 태그 텍스트 (좌상단 태그) */
  tag?: string;
  /** 질문 또는 제목 텍스트 */
  question: string;
  /** 답변 내용 */
  answer?: string;
  /** 선택 상태 */
  selected?: boolean;
  /** 터치 콜백 */
  onPress?: () => void;
  styleClass?: StyleClass;
}

export default function TMICard({
  tag,
  question,
  answer,
  selected = false,
  onPress,
  styleClass,
}: TMICardProps) {
  const Container = onPress ? Pressable : View;

  return (
    <Container
      {...(onPress ? { onPress, accessibilityRole: 'button' as const } : {})}
      className={cn(
        'w-full rounded-xl p-4 border',
        selected ? 'border-primary bg-white' : 'border-text-gray6 bg-white',
        styleClass?.root,
      )}
    >
      {tag && (
        <View className={cn('mb-2', styleClass?.tag)}>
          <Tag label={tag} variant={selected ? 'primary' : 'default'} />
        </View>
      )}

      <Text
        className={cn(
          'text-base font-medium text-text-black',
          styleClass?.question,
        )}
        numberOfLines={answer ? 2 : undefined}
      >
        {question}
      </Text>

      <Text
        className={cn('mt-2 text-sm font-normal text-text-gray4', styleClass?.answer)}
        numberOfLines={3}
      >
        {answer ?? '답변 없음'}
      </Text>
    </Container>
  );
}
