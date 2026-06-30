import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Textbox, BottomCTA, Button } from '@/shared/ui';
import useRegisterFormStore from '../model/useRegisterFormStore';

/**
 * # Step3BioView
 * ---
 * - 간단설명: 프로필 등록 3단계 - 자기소개 입력 (선택사항)
 * - 제약사항 및 특이사항:
 *   - 선택사항으로 건너뛰기 가능
 *   - 최대 100자, 글자수 카운터 표시
 *   - 100자 도달 시 카운터 빨간색 표시
 *   - 입력 없이도 "다음으로" 버튼 항상 활성화
 * ---
 * @example
 * <Step3BioView />
 */
export default function Step3BioView() {
  const { form, updateForm, nextStep } = useRegisterFormStore();

  /** 자기소개 변경 핸들러 */
  const handleBioChange = (text: string) => {
    updateForm({ bio: text });
  };

  return (
    <View className="flex-1 bg-white">
      {/* 건너뛰기 버튼 */}
      <View className="flex-row justify-end px-5">
        <Pressable onPress={nextStep} hitSlop={8}>
          <Text className="text-sm font-medium text-text-gray4">건너뛰기</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* 안내 타이틀 */}
        <Text className="text-xl font-bold text-text-black mt-6 mb-8">
          {'프로필에 넣을\n자기소개를 입력해주세요'}
        </Text>

        {/* 자기소개 입력 */}
        <Textbox
          label="자기소개"
          placeholder="자기소개를 작성해주세요"
          value={form.bio}
          onChangeText={handleBioChange}
          maxLength={100}
          minHeight={200}
        />

        <View className="h-24" />
      </ScrollView>

      <BottomCTA>
        <Button
          title="다음으로"
          onPress={nextStep}
        />
      </BottomCTA>
    </View>
  );
}
