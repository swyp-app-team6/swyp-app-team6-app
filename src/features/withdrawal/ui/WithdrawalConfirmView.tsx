import React from 'react';
import { View, Text } from 'react-native';
import { Button, Checkbox } from '@/shared/ui';

interface Props {
  /** 체크 여부 */
  confirmed: boolean;
  /** 체크 토글 핸들러 */
  onToggleConfirm: () => void;
  /** 탈퇴 실행 핸들러 */
  onWithdraw: () => void;
}

/**
 * # WithdrawalConfirmView
 * ---
 * - 간단설명: 최종 확인 체크박스 + 탈퇴 버튼
 * ---
 * @param confirmed 체크 여부
 * @param onToggleConfirm 체크 토글 콜백
 * @param onWithdraw 탈퇴 실행 콜백
 */
export default function WithdrawalConfirmView({
  confirmed,
  onToggleConfirm,
  onWithdraw,
}: Props) {
  return (
    <View className="flex-1">
      <Text className="text-lg font-bold mb-4">최종 확인</Text>
      <Text className="text-base text-gray-600 mb-6">
        탈퇴 후에는 계정을 복구할 수 없습니다.
      </Text>
      <View className="mb-6">
        <Checkbox
          checked={confirmed}
          onValueChange={() => onToggleConfirm()}
          label="위 내용을 확인했습니다"
        />
      </View>
      <Button
        title="탈퇴하기"
        onPress={onWithdraw}
        disabled={!confirmed}
      />
    </View>
  );
}
