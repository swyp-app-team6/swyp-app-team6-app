import React, { useCallback, useRef } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { Input, BottomCTA, Button } from '@/shared/ui';
import useRegisterFormStore from '../model/useRegisterFormStore';
import { REGION_OPTIONS } from '../model/types';
import RegionPicker from './RegionPicker';

/**
 * # Step2DetailInfoView
 * ---
 * - 간단설명: 프로필 등록 2단계 - 나이, 직무분야, 활동 지역 입력
 * - 제약사항 및 특이사항:
 *   - 나이: 숫자만 입력, 만 나이
 *   - 직무분야: 최대 10자, 글자수 카운터 표시
 *   - 활동 지역: Selectbox 트리거 → 바텀시트 내 시/도+구/군 2단 컬럼 피커
 *   - 모든 필수 항목 충족 시 "다음으로" 버튼 활성화
 * ---
 * @example
 * <Step2DetailInfoView />
 */
export default function Step2DetailInfoView() {
  const { form, updateForm, nextStep, isStep2Valid } = useRegisterFormStore();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();

  /** 나이 변경 핸들러 */
  const handleAgeChange = (text: string) => {
    updateForm({ age: text });
  };

  /** 직무분야 변경 핸들러 */
  const handleJobFieldChange = (text: string) => {
    updateForm({ jobField: text });
  };

  /** 지역 선택완료 핸들러 */
  const handleRegionConfirm = (region: string, subArea: string) => {
    updateForm({ region, subArea });
    bottomSheetRef.current?.dismiss();
  };

  /** 선택된 지역 라벨 생성 */
  const getRegionDisplayLabel = () => {
    if (!form.region) return null;
    const province = REGION_OPTIONS.find((o) => o.value === form.region);
    if (!province) return null;
    if (!form.subArea || form.subArea.endsWith('전체')) {
      return province.label;
    }
    return `${province.label} ${form.subArea}`;
  };

  const regionLabel = getRegionDisplayLabel();

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

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
          <Pressable
            onPress={() => bottomSheetRef.current?.present()}
            accessibilityRole="combobox"
            className="h-[52px] rounded-xl bg-text-gray7 border-0 px-4 flex-row items-center justify-between"
          >
            <Text className={regionLabel ? 'text-gray-900' : 'text-gray-400'}>
              {regionLabel ?? '서울'}
            </Text>
            <Text className="text-gray-400">▾</Text>
          </Pressable>
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

      {/* 지역 선택 바텀시트 */}
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={['50%']}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView>
          <View className="px-5 pb-3 pt-1">
            <Text className="text-xl font-bold text-text-black leading-7">
              활동 지역을 선택해주세요
            </Text>
          </View>
          <View className="px-5">
            <RegionPicker
              selectedRegion={form.region}
              selectedSubArea={form.subArea}
              onConfirm={handleRegionConfirm}
            />
          </View>
          <View style={{ height: bottom + 16 }} />
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}
