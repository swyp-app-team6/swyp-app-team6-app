import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { REGION_OPTIONS, REGION_SUB_AREAS } from '../model/types';

interface Props {
  /** 선택된 시/도 값 (예: 'SEOUL') */
  selectedRegion: string;
  /** 선택된 하위 지역 라벨 (예: '강남구') */
  selectedSubArea: string;
  /** 지역 선택 시 호출되는 콜백 */
  onSelect: (region: string, subArea: string) => void;
}

/**
 * # RegionPicker
 * ---
 * - 간단설명: 시/도 + 구/군 2단 컬럼 지역 선택 피커
 * - 제약사항 및 특이사항:
 *   - 왼쪽 컬럼: 시/도 목록 (스크롤 가능)
 *   - 오른쪽 컬럼: 선택된 시/도의 하위 지역 목록 (스크롤 가능)
 *   - 선택된 항목: 회색 배경(#F5F5F5) + 볼드 텍스트
 *   - 미선택 항목: 흰 배경 + 회색 텍스트(#888888)
 *   - 중앙 1px 구분선으로 컬럼 분리
 * ---
 * @param selectedRegion 선택된 시/도 코드
 * @param selectedSubArea 선택된 하위 지역 라벨
 * @param onSelect 지역 선택 콜백 (region, subArea)
 * @example
 * <RegionPicker
 *   selectedRegion="SEOUL"
 *   selectedSubArea="강남구"
 *   onSelect={(region, subArea) => { ... }}
 * />
 */
export default function RegionPicker({ selectedRegion, selectedSubArea, onSelect }: Props) {
  const selectedOption = REGION_OPTIONS.find((o) => o.value === selectedRegion);
  const selectedLabel = selectedOption?.label ?? REGION_OPTIONS[0].label;
  const [activeProvince, setActiveProvince] = useState(selectedLabel);

  const subAreas = REGION_SUB_AREAS[activeProvince] ?? [];

  /** 시/도 탭 핸들러 */
  const handleProvincePress = (label: string) => {
    setActiveProvince(label);
  };

  /** 하위 지역 탭 핸들러 */
  const handleSubAreaPress = (subArea: string) => {
    const regionOption = REGION_OPTIONS.find((o) => o.label === activeProvince);
    if (regionOption) {
      onSelect(regionOption.value, subArea);
    }
  };

  return (
    <View className="flex-row h-[288px]">
      {/* 시/도 컬럼 */}
      <ScrollView className="w-[120px]" showsVerticalScrollIndicator={false}>
        {REGION_OPTIONS.map((option) => {
          const isActive = option.label === activeProvince;
          return (
            <Pressable
              key={option.value}
              onPress={() => handleProvincePress(option.label)}
              className={`h-12 px-4 rounded-xl justify-center mb-1 ${
                isActive ? 'bg-gray7' : 'bg-white'
              }`}
            >
              <Text
                className={`text-base ${
                  isActive
                    ? 'font-bold text-text-gray2'
                    : 'font-medium text-text-gray4'
                }`}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* 구분선 */}
      <View className="w-px bg-text-gray6 self-stretch" />

      {/* 하위 지역 컬럼 */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {subAreas.map((area) => {
          const isActive = selectedRegion === (REGION_OPTIONS.find((o) => o.label === activeProvince)?.value) && selectedSubArea === area;
          return (
            <Pressable
              key={area}
              onPress={() => handleSubAreaPress(area)}
              className={`h-12 px-4 rounded-xl justify-center mb-1 ${
                isActive ? 'bg-gray7' : 'bg-white'
              }`}
            >
              <Text
                className={`text-base ${
                  isActive
                    ? 'font-bold text-text-gray2'
                    : 'font-medium text-text-gray4'
                }`}
              >
                {area}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
