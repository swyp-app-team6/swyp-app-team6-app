import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { FavTag, BottomCTA, Button } from '@/shared/ui';
import useRegisterFormStore from '../model/useRegisterFormStore';
import { useInterestsQuery } from '@/entities/interest';
import type { INTEREST } from '@/entities/user';
import { INTEREST_EMOJI } from '../model/types';

/** 최대 선택 가능 관심사 수 */
const MAX_INTERESTS = 5;

/**
 * # Step2InterestsView
 * ---
 * - 간단설명: 프로필 등록 3단계 - 관심사 태그 등록 (3~5개 선택)
 * - 제약사항 및 특이사항:
 *   - FavTag를 2열 그리드로 배치하여 선택
 *   - 최소 3개, 최대 5개까지 선택 가능
 *   - 5개 선택 시 미선택 항목 비활성화
 *   - 3개 이상 선택 시 "다음" 버튼 활성화
 *   - 관심사 목록은 GET /interests API에서 조회
 * ---
 * @example
 * <Step2InterestsView />
 */
export default function Step2InterestsView() {
  const { form, updateForm, nextStep } = useRegisterFormStore();
  const { data, isLoading } = useInterestsQuery();

  /** 관심사 토글 핸들러 */
  const handleToggle = (value: INTEREST) => {
    const current = form.interests;
    if (current.includes(value)) {
      updateForm({ interests: current.filter((v) => v !== value) });
    } else if (current.length < MAX_INTERESTS) {
      updateForm({ interests: [...current, value] });
    }
  };

  const isMaxSelected = form.interests.length >= MAX_INTERESTS;
  const isValid = form.interests.length >= 3;

  const interestOptions = data?.interests ?? [];

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-xl font-bold text-text-black mb-2">
          본인의 관심사를 선택해주세요
        </Text>
        <Text className="text-sm text-text-gray4 mb-6">
          관심사를 3~5개 선택해주세요 ({form.interests.length}/{MAX_INTERESTS})
      </Text>

        {isLoading ? (
          <View className="items-center py-10">
            <ActivityIndicator size="large" />
          </View>
        ) : (
          <View className="flex-row flex-wrap gap-3">
            {interestOptions.map((option) => {
              const selected = form.interests.includes(option.type);
              return (
                <View key={option.type} style={{ width: '48%' }}>
                  <FavTag
                    emoji={INTEREST_EMOJI[option.type] ?? ''}
                    label={option.label}
                    selected={selected}
                    disabled={!selected && isMaxSelected}
                    onPress={() => handleToggle(option.type)}
                  />
                </View>
              );
            })}
          </View>
        )}

        <View className="h-24" />
      </ScrollView>

      <BottomCTA>
        <Button
          title="다음으로"
          disabled={!isValid}
          onPress={nextStep}
        />
      </BottomCTA>
    </View>
  );
}
