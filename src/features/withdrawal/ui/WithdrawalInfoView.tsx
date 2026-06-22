import React from 'react';
import { View, Text } from 'react-native';
import { Button } from '@/shared/ui';

interface Props {
  /** 다음 단계로 이동 */
  onNext: () => void;
}

/**
 * # WithdrawalInfoView
 * ---
 * - 간단설명: 탈퇴 시 삭제되는 데이터 안내 화면
 * ---
 * @param onNext 다음 단계로 이동하는 콜백
 */
export default function WithdrawalInfoView({ onNext }: Props) {
  return (
    <View className="flex-1">
      <Text className="text-lg font-bold mb-4">탈퇴 시 삭제되는 데이터</Text>
      <View className="gap-2 mb-6">
        <Text className="text-base text-gray-600">• 프로필 정보</Text>
        <Text className="text-base text-gray-600">• 매칭 기록</Text>
        <Text className="text-base text-gray-600">• 채팅 내역</Text>
        <Text className="text-base text-gray-600">• 갤러리 사진</Text>
      </View>
      <Text className="text-sm text-red-500 mb-6">
        삭제된 데이터는 복구할 수 없습니다.
      </Text>
      <Button title="다음" onPress={onNext} />
    </View>
  );
}
