import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { BottomCTA, Button } from '@/shared/ui';

interface Props {
  /** 프로필 보기 버튼 콜백 */
  onViewProfile: () => void;
  /** 홈으로 이동 버튼 콜백 */
  onGoHome: () => void;
}

/**
 * # RegisterCompleteView
 * ---
 * - 간단설명: 프로필 등록 완료 축하 화면 (Figma 디자인 시안 기반)
 * - 제약사항 및 특이사항:
 *   - 상단: 축하 일러스트 (플레이스홀더, 200x167)
 *   - 중앙: 축하 타이틀 + 서브 메시지
 *   - 하단 CTA: "프로필 보기"(회색 배경) + "홈으로"(보라 배경) 가로 배치
 *   - 프로필 보기 → profileCard 화면, 홈으로 → home 화면
 * ---
 * @param onViewProfile 프로필 보기 버튼 콜백
 * @param onGoHome 홈으로 이동 버튼 콜백
 * ---
 * @example
 * <RegisterCompleteView onViewProfile={...} onGoHome={...} />
 */
export default function RegisterCompleteView({ onViewProfile, onGoHome }: Props) {
  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-5">
        {/* 축하 일러스트 플레이스홀더 */}
        <View className="w-[200px] h-[167px] items-center justify-center mb-10">
          <Text className="text-7xl">🎉</Text>
        </View>

        {/* 축하 메시지 */}
        <Text
          className="text-xl font-bold text-text-gray2 text-center mb-3"
          style={{ lineHeight: 28 }}
        >
          {'축하드립니다\n프로필 카드를 작성했어요!'}
        </Text>
        <Text
          className="text-base font-medium text-text-gray4 text-center"
          style={{ lineHeight: 22.4 }}
        >
          {'이제 새로운 만남을 시작할\n모든 준비가 끝났어요'}
        </Text>
      </View>

      {/* 하단 CTA: 프로필 보기(회색) + 홈으로(보라) */}
      <BottomCTA>
        <View className="flex-row gap-3">
          <Pressable
            onPress={onViewProfile}
            className="h-14 rounded-xl bg-text-gray7 items-center justify-center px-6 active:opacity-80"
            accessibilityRole="button"
          >
            <Text
              className="text-base font-bold text-text-gray4 text-center"
              style={{ lineHeight: 22.4 }}
            >
              프로필 보기
            </Text>
          </Pressable>
          <View className="flex-1">
            <Button title="홈으로" onPress={onGoHome} />
          </View>
        </View>
      </BottomCTA>
    </View>
  );
}
