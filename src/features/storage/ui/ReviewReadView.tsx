import React from 'react';
import { Text, View } from 'react-native';
import type { ReviewScore } from '@/entities/storage';

/** 만남 후기 만족도 옵션 (value = API score 1-4) */
const REVIEW_OPTIONS: { label: string; value: ReviewScore }[] = [
  { label: '매우 좋았어요', value: 4 },
  { label: '좋았어요', value: 3 },
  { label: '나쁘지 않았어요', value: 2 },
  { label: '잘 모르겠어요', value: 1 },
];

interface Props {
  /** 만족도 점수 (1-4) */
  score: ReviewScore;
  /** 후기 메모 */
  memo: string;
}

/**
 * # ReviewReadView
 * ---
 * - 간단설명: 등록된 만남 후기를 읽기 전용으로 표시하는 뷰 컴포넌트
 * - 제약사항 및 특이사항:
 *   - WriteReviewView와 동일한 UI 구조에 disabled 처리
 *   - 만족도 셀렉트: 선택된 라벨 텍스트만 표시 (드롭다운 아이콘 제거, 터치 불가)
 *   - 메모: View+Text로 읽기 전용 표시 (Textbox의 한글 IME 이슈 회피)
 *   - 프로필 카드, BottomCTA 없음
 * ---
 * @param score 만족도 점수 (1-4)
 * @param memo 후기 메모
 * ---
 * @example
 * <ReviewReadView score={4} memo="정말 좋은 만남이었어요" />
 */
export default function ReviewReadView({ score, memo }: Props) {
  const selectedLabel = REVIEW_OPTIONS.find((o) => o.value === score)?.label;

  return (
    <View>
      {/* 만족도 표시 */}
      <View className="pb-6 gap-3">
        <Text className="text-base font-medium text-[#18181B]">
          전체적인 만남은 어떠셨나요?
        </Text>
        <View className="flex-row items-center p-4 bg-[#F5F5F5] rounded-xl">
          <Text className="flex-1 text-sm font-medium text-[#1A1A1A]">
            {selectedLabel ?? ''}
          </Text>
        </View>
      </View>

      {/* 메모 표시 */}
      <View className="pb-6">
        <View className="flex-row items-center gap-1 mb-3">
          <Text className="text-base font-medium text-[#18181B]">
            메모를 남겨주세요
          </Text>
          <Text className="text-sm font-medium text-[#71717A]">
            (나만 볼 수 있어요)
          </Text>
        </View>
        <View className="rounded-xl bg-text-gray7 p-4" style={{ minHeight: 112 }}>
          <Text className="text-base text-text-black">
            {memo || ''}
          </Text>
        </View>
      </View>
    </View>
  );
}
