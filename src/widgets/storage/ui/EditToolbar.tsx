import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Checkbox } from '@/shared/ui/Checkbox';

interface EditToolbarProps {
  /** 전체 선택 여부 */
  isAllSelected: boolean;
  /** 전체 선택 토글 콜백 */
  onToggleSelectAll: () => void;
  /** 편집 취소 콜백 */
  onCancelEdit: () => void;
  /** 선택 삭제 콜백 */
  onDeleteSelected: () => void;
  /** 선택된 항목이 있는지 여부 */
  hasSelection: boolean;
}

/**
 * # EditToolbar
 * ---
 * - 간단설명: 보관함 편집 모드의 전체선택/편집취소/선택삭제 툴바
 * - 제약사항 및 특이사항:
 *   - 전체 선택 체크박스 + 편집취소/선택삭제 텍스트 버튼
 *   - 선택된 항목이 없으면 선택삭제 비활성화 스타일
 * ---
 * @param isAllSelected 전체 선택 여부
 * @param onToggleSelectAll 전체 선택 토글 콜백
 * @param onCancelEdit 편집 취소 콜백
 * @param onDeleteSelected 선택 삭제 콜백
 * @param hasSelection 선택된 항목 존재 여부
 * ---
 * @example
 * <EditToolbar
 *   isAllSelected={false}
 *   onToggleSelectAll={toggleAll}
 *   onCancelEdit={cancel}
 *   onDeleteSelected={deleteSelected}
 *   hasSelection={true}
 * />
 */
export default function EditToolbar({
  isAllSelected,
  onToggleSelectAll,
  onCancelEdit,
  onDeleteSelected,
  hasSelection,
}: EditToolbarProps) {
  return (
    <View className="flex-row items-center justify-between">
      {/* 전체 선택 */}
      <Pressable
        className="flex-row items-center gap-2"
        onPress={() => onToggleSelectAll()}
      >
        <Checkbox
          checked={isAllSelected}
          onValueChange={onToggleSelectAll}
        />
        <Text className="text-sm text-[#1A1A1A]">전체 선택</Text>
      </Pressable>

      {/* 편집취소 + 선택삭제 */}
      <View className="flex-row items-center gap-3">
        <Pressable hitSlop={8} onPress={onCancelEdit}>
          <Text className="text-sm text-[#888888]">편집취소</Text>
        </Pressable>
        <Pressable hitSlop={8} onPress={onDeleteSelected} disabled={!hasSelection}>
          <Text
            className={`text-sm ${hasSelection ? 'text-[#888888]' : 'text-[#BFBFBF]'}`}
          >
            선택삭제
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
