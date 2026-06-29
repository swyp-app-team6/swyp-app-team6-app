import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ChipSelect, BottomCTA, Button } from '@/shared/ui';
import useRegisterFormStore from '../model/useRegisterFormStore';
import { INTEREST_OPTIONS } from '../model/types';
import type { Interest } from '@/entities/user';

/**
 * # Step2InterestsView
 * ---
 * - 간단설명: 프로필 등록 2단계 - 관심사 태그 등록 (3~5개 선택)
 * - 제약사항 및 특이사항:
 *   - 최소 3개, 최대 5개까지 선택 가능
 *   - 3개 이상 선택 시 "다음" 버튼 활성화
 * ---
 * @example
 * <Step2InterestsView />
 */
export default function Step2InterestsView() {
  const { form, updateForm, nextStep, isStep2Valid } = useRegisterFormStore();

  /** 관심사 선택 핸들러 */
  const handleSelect = (values: string[]) => {
    updateForm({ interests: values as Interest[] });
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-xl font-bold text-text-black mb-2">
          관심사를 선택해주세요
        </Text>
        <Text className="text-sm text-text-gray3 mb-6">
          3~5개를 선택해주세요 ({form.interests.length}/5)
        </Text>

        <ChipSelect
          options={INTEREST_OPTIONS}
          selected={form.interests}
          onSelect={handleSelect}
          max={5}
          styleClass={{ root: 'gap-3' }}
        />

        <View className="h-24" />
      </ScrollView>

      <BottomCTA>
        <Button
          title="다음으로"
          disabled={!isStep2Valid()}
          onPress={nextStep}
        />
      </BottomCTA>
    </View>
  );
}
