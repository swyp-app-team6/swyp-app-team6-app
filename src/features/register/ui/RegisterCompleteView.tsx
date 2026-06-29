import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/shared/ui';

interface Props {
  /** 프로필 보기 버튼 콜백 */
  onViewProfile: () => void;
  /** 홈으로 이동 버튼 콜백 */
  onGoHome: () => void;
}

/**
 * # RegisterCompleteView
 * ---
 * - 간단설명: 프로필 등록 완료 화면
 * - 제약사항 및 특이사항:
 *   - 축하 일러스트 (플레이스홀더)
 *   - "프로필 보기" + "홈으로" 두 개의 CTA 버튼
 * ---
 * @param onViewProfile 프로필 보기 버튼 콜백
 * @param onGoHome 홈으로 이동 버튼 콜백
 * @example
 * <RegisterCompleteView onViewProfile={...} onGoHome={...} />
 */
export default function RegisterCompleteView({ onViewProfile, onGoHome }: Props) {
  return (
    <View className="flex-1 items-center justify-center px-5">
      {/* 축하 일러스트 플레이스홀더 */}
      <View className="w-[160px] h-[160px] rounded-full bg-primary-lightest items-center justify-center mb-8">
        <Text className="text-6xl">🎉</Text>
      </View>

      <Text className="text-xl font-bold text-text-black text-center mb-2">
        축하드립니다{'\n'}프로필 카드를 작성했어요!
      </Text>
      <Text className="text-sm text-text-gray3 text-center mb-10">
        이제 새로운 만남을 시작할 모든 준비가 끝났어요
      </Text>

      <View className="w-full gap-3">
        <Button
          title="프로필 보기"
          onPress={onViewProfile}
        />
        <Button
          title="홈으로"
          variant="secondary"
          onPress={onGoHome}
        />
      </View>
    </View>
  );
}
