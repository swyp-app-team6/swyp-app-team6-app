import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Button, Input } from '@/shared/ui';
import { WITHDRAWAL_REASONS, type WithdrawalReason } from '../model/types';

interface Props {
  /** 선택된 사유 */
  selectedReason: WithdrawalReason | null;
  /** 기타 입력 텍스트 */
  customReason: string;
  /** 사유 선택 핸들러 */
  onSelectReason: (reason: WithdrawalReason) => void;
  /** 기타 입력 핸들러 */
  onChangeCustomReason: (text: string) => void;
  /** 다음 단계로 이동 */
  onNext: () => void;
}

/**
 * # WithdrawalReasonView
 * ---
 * - 간단설명: 탈퇴 사유 선택 화면 (라디오 목록 + 기타 직접 입력)
 * ---
 * @param selectedReason 현재 선택된 사유
 * @param onSelectReason 사유 선택 콜백
 * @param onNext 다음 단계 이동 콜백
 */
export default function WithdrawalReasonView({
  selectedReason,
  customReason,
  onSelectReason,
  onChangeCustomReason,
  onNext,
}: Props) {
  return (
    <View className="flex-1">
      <Text className="text-lg font-bold mb-4">탈퇴 사유를 선택해주세요</Text>
      <View className="gap-2 mb-6">
        {WITHDRAWAL_REASONS.map((reason) => (
          <Pressable
            key={reason}
            onPress={() => onSelectReason(reason)}
            className={`p-3 rounded-lg border ${
              selectedReason === reason
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}>
            <Text
              className={
                selectedReason === reason ? 'text-blue-600' : 'text-gray-700'
              }>
              {reason}
            </Text>
          </Pressable>
        ))}
      </View>
      {selectedReason === '기타' && (
        <Input
          placeholder="탈퇴 사유를 입력해주세요"
          value={customReason}
          onChangeText={onChangeCustomReason}
        />
      )}
      <View className="mt-4">
        <Button
          title="다음"
          onPress={onNext}
          disabled={!selectedReason}
        />
      </View>
    </View>
  );
}
