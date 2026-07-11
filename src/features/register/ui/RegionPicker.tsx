import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Button } from '@/shared/ui';
import { REGION_OPTIONS, REGION_SUB_AREAS } from '../model/types';

interface Props {
  /** 현재 확정된 시/도 값 (예: 'SEOUL') */
  selectedRegion: string;
  /** 현재 확정된 하위 지역 라벨 (예: '강남구') */
  selectedSubArea: string;
  /** 선택완료 시 호출되는 콜백 */
  onConfirm: (region: string, subArea: string) => void;
}

/**
 * # RegionPicker
 * ---
 * - 간단설명: 시/도 + 구/군 2단 컬럼 지역 선택 피커 (CTA 포함)
 * - 제약사항 및 특이사항:
 *   - 내부에서 임시 선택 상태를 관리하고, "선택완료" CTA 클릭 시에만 onConfirm 호출
 *   - 왼쪽 컬럼: 시/도 목록 (스크롤 가능)
 *   - 오른쪽 컬럼: 선택된 시/도의 하위 지역 목록 (스크롤 가능)
 *   - 중앙 1px 구분선으로 컬럼 분리
 * ---
 * @param selectedRegion 현재 확정된 시/도 코드
 * @param selectedSubArea 현재 확정된 하위 지역 라벨
 * @param onConfirm 선택완료 콜백 (region, subArea)
 * @example
 * <RegionPicker
 *   selectedRegion="SEOUL"
 *   selectedSubArea="강남구"
 *   onConfirm={(region, subArea) => { ... }}
 * />
 */
export default function RegionPicker({ selectedRegion, selectedSubArea, onConfirm }: Props) {
  const selectedOption = REGION_OPTIONS.find((o) => o.value === selectedRegion);
  const selectedLabel = selectedOption?.label ?? REGION_OPTIONS[0].label;

  const [activeProvince, setActiveProvince] = useState(selectedLabel);
  const [tempRegion, setTempRegion] = useState(selectedRegion);
  const [tempSubArea, setTempSubArea] = useState(selectedSubArea);

  const subAreas = REGION_SUB_AREAS[activeProvince] ?? [];

  /** 시/도 탭 핸들러 — 시/도 변경 시 상세지역을 첫 번째 항목으로 초기화 */
  const handleProvincePress = (label: string) => {
    setActiveProvince(label);
    const regionOption = REGION_OPTIONS.find((o) => o.label === label);
    if (regionOption) {
      const firstSubArea = REGION_SUB_AREAS[label]?.[0] ?? '';
      setTempRegion(regionOption.value);
      setTempSubArea(firstSubArea);
    }
  };

  /** 하위 지역 탭 핸들러 — 임시 상태에만 저장 */
  const handleSubAreaPress = (subArea: string) => {
    const regionOption = REGION_OPTIONS.find((o) => o.label === activeProvince);
    if (regionOption) {
      setTempRegion(regionOption.value);
      setTempSubArea(subArea);
    }
  };

  /** 선택완료 핸들러 */
  const handleConfirm = () => {
    onConfirm(tempRegion, tempSubArea);
  };

  return (
    <View>
      <View className="flex-row h-[240px]">
        {/* 시/도 컬럼 */}
        <BottomSheetScrollView className="w-[120px]" showsVerticalScrollIndicator={false}>
          {REGION_OPTIONS.map((option) => {
            const isActive = option.label === activeProvince;
            return (
              <Pressable
                key={option.value}
                onPress={() => handleProvincePress(option.label)}
                className="h-12 px-4 rounded-xl justify-center mb-1 mr-4"
                style={{ backgroundColor: isActive ? '#F5F5F5' : '#FFFFFF' }}
              >
                <Text
                  className="text-base"
                  style={{
                    color: isActive ? '#1B1B1B' : '#888888',
                    fontWeight: isActive ? '700' : '500',
                  }}
                >
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </BottomSheetScrollView>

        {/* 구분선 */}
        <View className="w-px self-stretch" style={{ backgroundColor: '#D9D9D9' }} />

        {/* 하위 지역 컬럼 */}
        <BottomSheetScrollView className="w-[200px]" showsVerticalScrollIndicator={false}>
          {subAreas.map((area) => {
            const currentRegionValue = REGION_OPTIONS.find((o) => o.label === activeProvince)?.value;
            const isActive = tempRegion === currentRegionValue && tempSubArea === area;
            return (
              <Pressable
                key={area}
                onPress={() => handleSubAreaPress(area)}
                className="h-12 px-4 rounded-xl justify-center mb-1 ml-4"
                style={{ backgroundColor: isActive ? '#F5F5F5' : '#FFFFFF' }}
              >
                <Text
                  className="text-base"
                  style={{
                    color: isActive ? '#1B1B1B' : '#888888',
                    fontWeight: isActive ? '700' : '500',
                  }}
                >
                  {area}
                </Text>
              </Pressable>
            );
          })}
        </BottomSheetScrollView>
      </View>

      {/* 선택완료 CTA */}
      <View className="">
        <Button
          title="선택완료"
          onPress={handleConfirm}
          disabled={!tempRegion}
        />
      </View>
    </View>
  );
}
