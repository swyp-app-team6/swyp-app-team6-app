import React, { useState } from 'react';
import { View } from 'react-native';
import { BottomCTA, Button, Textbox } from '@/shared/ui';

interface Props {
  /** 프로필 ID */
  profileId: number;
  /** 후기 등록 콜백 */
  onSubmit: (reviewText: string) => void;
  /** 등록 중 로딩 상태 */
  loading?: boolean;
}

/**
 * # WriteReviewView
 * ---
 * - 간단설명: 만남 후기 작성 폼 뷰 컴포넌트
 * - 제약사항 및 특이사항:
 *   - Textbox로 후기 내용 입력 (최대 500자)
 *   - 입력이 없으면 "등록하기" 버튼 비활성화
 *   - 하단 BottomCTA에 등록 버튼 배치
 * ---
 * @param profileId 대상 프로필 ID
 * @param onSubmit 후기 등록 콜백
 * @param loading 로딩 상태
 * ---
 * @example
 * <WriteReviewView profileId={1} onSubmit={(text) => submit(text)} />
 */
export default function WriteReviewView({
  onSubmit,
  loading,
}: Props) {
  const [reviewText, setReviewText] = useState('');

  const isDisabled = reviewText.trim().length === 0;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 px-5 pt-6">
        <Textbox
          label="만남 후기"
          value={reviewText}
          onChangeText={setReviewText}
          placeholder="상대방과의 만남은 어떠셨나요? 나만 보는 후기를 작성해보세요."
          maxLength={500}
          minHeight={200}
        />
      </View>

      <BottomCTA>
        <Button
          title="등록하기"
          onPress={() => onSubmit(reviewText.trim())}
          disabled={isDisabled}
          loading={loading}
        />
      </BottomCTA>
    </View>
  );
}
