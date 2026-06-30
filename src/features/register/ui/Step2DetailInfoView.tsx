import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Input, BottomCTA, Button, Selectbox } from '@/shared/ui';
import useRegisterFormStore from '../model/useRegisterFormStore';
import { REGION_OPTIONS } from '../model/types';

/**
 * # Step2DetailInfoView
 * ---
 * - 간단설명: 프로필 등록 2단계 - 나이, 직무분야, 활동 지역 입력
 * - 제약사항 및 특이사항:
 *   - 나이: 숫자만 입력, 만 나이
 *   - 직무분야: 최대 10자, 글자수 카운터 표시
 *   - 활동 지역: Selectbox(바텀시트 드롭다운)로 선택
 *   - 모든 필수 항목 충족 시 "다음으로" 버튼 활성화
 * ---
 * @example
 * <Step2DetailInfoView />
 */
export default function Step2DetailInfoView() {
  const { form, updateForm, nextStep, isStep2Valid } = useRegisterFormStore();
  const [ageError, setAgeError] = useState<string | undefined>();

  /** 나이 변경 핸들러 */
  const handleAgeChange = (text: string) => {
    const numbersOnly = text.replace(/[^0-9]/g, '');
    updateForm({ age: numbersOnly });

    if (numbersOnly.length > 0) {
      const num = Number(numbersOnly);
      if (num < 1 || num > 99) {
        setAgeError('1~99 사이의 나이를 입력해주세요');
      } else {
        setAgeError(undefined);
      }
    } else {
      setAgeError(undefined);
    }
  };

  /** 직무분야 변경 핸들러 */
  const handleJobFieldChange = (text: string) => {
    updateForm({ jobField: text });
  };

  /** 활동 지역 선택 핸들러 */
  const handleRegionSelect = (value: string) => {
    updateForm({ region: value });
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* 안내 타이틀 */}
        <Text className="text-xl font-bold text-text-black mt-6 mb-8">
          {'프로필에 넣을\n정보를 입력해주세요'}
        </Text>

        {/* 나이 */}
        <View className="mb-8">
          <Input
            label="나이"
            placeholder="만 나이를 입력해주세요"
            value={form.age}
            onChangeText={handleAgeChange}
            keyboardType="number-pad"
            error={ageError}
          />
        </View>

        {/* 직무분야 */}
        <View className="mb-8">
          <Input
            label="직무분야"
            placeholder="본인의 직무,직업,직장을 입력해주세요"
            value={form.jobField}
            onChangeText={handleJobFieldChange}
            maxLength={10}
          />
        </View>

        {/* 활동 지역 */}
        <View className="mb-8">
          <Text className="mb-3 text-base font-medium text-text-black">활동 지역</Text>
          <Selectbox
            value={form.region}
            options={REGION_OPTIONS}
            onSelect={handleRegionSelect}
            placeholder="서울"
            styleClass={{
              trigger:
                'h-[52px] rounded-xl bg-text-gray7 border-0 px-4 flex-row items-center justify-between',
            }}
          />
        </View>

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
