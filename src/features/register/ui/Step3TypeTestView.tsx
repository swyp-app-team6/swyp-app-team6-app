import React from 'react';
import { View, Text } from 'react-native';
import { BottomCTA, Button } from '@/shared/ui';

/**
 * # Step3TypeTestView
 * ---
 * - 간단설명: 프로필 등록 3단계 - 유형 테스트 (플레이스홀더)
 * - 제약사항 및 특이사항:
 *   - 현재 미확정 상태로 플레이스홀더만 표시
 *   - 추후 6문항 4지선다 유형 테스트로 교체 예정
 *   - "건너뛰기" 버튼으로 다음 단계 이동
 * ---
 * @param onNext 다음 단계 이동 콜백
 * @example
 * <Step3TypeTestView onNext={() => {}} />
 */
export default function Step3TypeTestView({ onNext }: { onNext: () => void }) {

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-5">
        <Text className="text-5xl mb-6">🔮</Text>
        <Text className="text-xl font-bold text-text-black mb-3">
          유형 테스트
        </Text>
        <Text className="text-sm text-text-gray3 text-center leading-5">
          나의 유형을 알아보는 테스트입니다{'\n'}
          (준비 중입니다)
        </Text>
      </View>

      <BottomCTA>
        <Button
          title="건너뛰기"
          variant="secondary"
          onPress={onNext}
        />
      </BottomCTA>
    </View>
  );
}
