import React, { forwardRef, useCallback, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useImperativeHandle, useRef } from 'react';
import Svg, { Path } from 'react-native-svg';
import { Button, SafeBottomSheetModal } from '@/shared/ui';
import type { BottomSheetHandle } from '@/shared/ui';

/**
 * 지역 필터 옵션
 * - value = 칩 토글용 고유 키
 * - apiValues = API에 전달할 enum 값 배열
 */
interface RegionOption {
  label: string;
  value: string;
  apiValues: string[];
}

/** 지역 필터 옵션 목록 */
const REGION_OPTIONS: RegionOption[] = [
  { label: '서울', value: 'SEOUL', apiValues: ['SEOUL'] },
  { label: '경기', value: 'GYEONGGI', apiValues: ['GYEONGGI'] },
  { label: '인천', value: 'INCHEON', apiValues: ['INCHEON'] },
  { label: '대구/경북', value: 'DAEGU_GYEONGBUK', apiValues: ['DAEGU', 'GYEONGBUK'] },
  { label: '부산/울산/경남', value: 'BUSAN_ULSAN_GYEONGNAM', apiValues: ['BUSAN', 'ULSAN', 'GYEONGNAM'] },
  { label: '충청/세종/대전', value: 'CHUNG_SEJONG_DAEJEON', apiValues: ['CHUNGNAM', 'CHUNGBUK', 'SEJONG', 'DAEJEON'] },
  { label: '전라/광주', value: 'JEONLA_GWANGJU', apiValues: ['JEONNAM', 'JEONBUK', 'GWANGJU'] },
  { label: '강원', value: 'GANGWON', apiValues: ['GANGWON'] },
  { label: '제주', value: 'JEJU', apiValues: ['JEJU'] },
];

/** 유형 필터 옵션 목록 */
const COSMIC_TYPE_OPTIONS = [
  { label: '슈팅스타 유형', value: 'star' },
  { label: '갤럭시 유형', value: 'galaxy' },
  { label: '솔라 유형', value: 'solar' },
  { label: '루나 유형', value: 'luna' },
];

/**
 * 필터 적용 상태
 * - regions = 선택된 지역 값 배열
 * - cosmicTypes = 선택된 유형 값 배열
 */
export interface StorageFilterState {
  /** 선택된 지역 값 배열 */
  regions: string[];
  /** 선택된 유형 값 배열 */
  cosmicTypes: string[];
}

interface Props {
  /** 필터 적용 시 호출되는 콜백 */
  onApply: (filter: StorageFilterState) => void;
  /** 바텀시트 닫힘 시 호출되는 콜백 */
  onDismiss?: () => void;
}

interface FilterChipOption {
  label: string;
  value: string;
}

interface FilterChipGroupProps {
  /** 선택 가능한 옵션 목록 */
  options: FilterChipOption[];
  /** 현재 선택된 값 배열 */
  selected: string[];
  /** 선택 변경 콜백 */
  onSelect: (values: string[]) => void;
}

/**
 * # FilterChipGroup
 * ---
 * - 간단설명: 아웃라인 스타일 멀티 선택 칩 그룹
 * - 제약사항 및 특이사항:
 *   - 선택: 흰 배경 + 보라 테두리 + 보라 텍스트
 *   - 미선택: 흰 배경 + 회색 테두리 + 회색 텍스트
 * ---
 * @param options 선택 가능한 옵션 목록
 * @param selected 현재 선택된 값 배열
 * @param onSelect 선택 변경 콜백
 */
function FilterChipGroup({ options, selected, onSelect }: FilterChipGroupProps) {
  const handlePress = (value: string) => {
    if (selected.includes(value)) {
      onSelect(selected.filter(v => v !== value));
    } else {
      onSelect([...selected, value]);
    }
  };

  return (
    <View className="flex-row flex-wrap gap-2">
      {options.map(option => {
        const isSelected = selected.includes(option.value);
        return (
          <Pressable
            key={option.value}
            onPress={() => handlePress(option.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            className="rounded-full px-5 py-2 overflow-hidden"
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: isSelected ? '#8C39FB' : '#979797',
            }}
          >
            <Text
              className="text-sm"
              style={{
                color: isSelected ? '#8C39FB' : '#4E4E4E',
                fontWeight: isSelected ? '600' : '500',
                lineHeight: 19.6,
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/**
 * # StorageFilterBottomSheet
 * ---
 * - 간단설명: 보관함 프로필 필터링을 위한 바텀시트 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 지역, 유형 두 가지 필터 카테고리 제공
 *   - 초기화 버튼으로 전체 선택 해제
 *   - 적용하기 버튼으로 필터 적용 후 바텀시트 닫기
 *   - ref를 통해 open/close 제어
 *   - 연동 없이 UI만 구현 (콜백으로 필터 상태 전달)
 * ---
 * @param onApply 필터 적용 시 콜백
 * @param onDismiss 바텀시트 닫힘 시 콜백
 * ---
 * @example
 * ```tsx
 * const ref = useRef<BottomSheetHandle>(null);
 * <StorageFilterBottomSheet ref={ref} onApply={handleFilter} />
 * ```
 */
const StorageFilterBottomSheet = forwardRef<BottomSheetHandle, Props>(
  ({ onApply, onDismiss }, ref) => {
    const modalRef = useRef<BottomSheetModal>(null);

    const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
    const [selectedCosmicTypes, setSelectedCosmicTypes] = useState<string[]>([]);

    useImperativeHandle(ref, () => ({
      open: () => modalRef.current?.present(),
      close: () => modalRef.current?.dismiss(),
    }));

    const handleReset = useCallback(() => {
      setSelectedRegions([]);
      setSelectedCosmicTypes([]);
    }, []);

    const handleApply = useCallback(() => {
      const apiRegions = selectedRegions.flatMap(
        (v) => REGION_OPTIONS.find((o) => o.value === v)?.apiValues ?? [],
      );
      onApply({
        regions: apiRegions,
        cosmicTypes: selectedCosmicTypes,
      });
      modalRef.current?.dismiss();
    }, [onApply, selectedRegions, selectedCosmicTypes]);

    return (
      <SafeBottomSheetModal ref={modalRef} onDismiss={onDismiss}>
        {/* 닫기 버튼 */}
        <View className="flex-row justify-end px-5 pt-1 pb-1">
          <Pressable
            onPress={() => modalRef.current?.dismiss()}
            hitSlop={8}
            accessibilityLabel="닫기"
          >
            <Text className="text-2xl text-gray-400">✕</Text>
          </Pressable>
        </View>

        {/* 타이틀 */}
        <View className="px-5">
          <Text className="text-xl font-bold text-[#1A1A1A] leading-7">
            필터
          </Text>
        </View>

        {/* 지역 필터 */}
        <View className="px-5 pt-6">
          <Text className="text-base font-semibold text-black mb-6 leading-[22.4px]">
            지역
          </Text>
          <FilterChipGroup
            options={REGION_OPTIONS}
            selected={selectedRegions}
            onSelect={setSelectedRegions}
          />
        </View>

        {/* 유형 필터 */}
        <View className="px-5 pt-6 pb-6">
          <Text className="text-base font-semibold text-[#1A1A1A] mb-5 leading-[22.4px]">
            유형
          </Text>
          <FilterChipGroup
            options={COSMIC_TYPE_OPTIONS}
            selected={selectedCosmicTypes}
            onSelect={setSelectedCosmicTypes}
          />
        </View>

        {/* 하단 버튼 영역 */}
        <View className="flex-row items-center gap-3 px-5">
          <Pressable
            onPress={handleReset}
            className="flex-row items-center justify-center gap-1 rounded-xl px-6"
            style={{ height: 56, backgroundColor: '#F5F5F5' }}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
              <Path
                d="M19.4221 8.01389C18.0322 5.61438 15.4343 4 12.4588 4C9.08513 4 6.19686 6.07535 5.00433 9.01736M16.9806 9.01736H21V5.00347M5.57787 16.0417C6.96782 18.4412 9.56573 20.0556 12.5412 20.0556C15.9149 20.0556 18.8031 17.9802 19.9957 15.0382M8.0194 15.0382H4V19.0521"
                stroke="#3C3C3C"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
            <Text className="text-base font-bold" style={{ color: '#1A1A1A', lineHeight: 22.4 }}>
              초기화
            </Text>
          </Pressable>
          <Button
            title="적용하기"
            variant="primary"
            onPress={handleApply}
            className="flex-1"
          />
        </View>
      </SafeBottomSheetModal>
    );
  },
);

StorageFilterBottomSheet.displayName = 'StorageFilterBottomSheet';

export default StorageFilterBottomSheet;
