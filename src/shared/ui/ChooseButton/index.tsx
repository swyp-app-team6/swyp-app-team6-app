import React from 'react';
import { Pressable, Text } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface StyleClass {
  root?: string;
  label?: string;
}

/**
 * # ChooseButton
 * ---
 * - 간단설명: 선택형 버튼 컴포넌트 (라디오 버튼 스타일)
 * - 제약사항 및 특이사항:
 *   - 선택 시 보라 테두리+배경, 미선택 시 회색 테두리
 *   - SelectCard와 달리 체크 아이콘 없이 텍스트만 표시
 * ---
 * @param label 버튼 텍스트
 * @param selected 선택 상태
 * @param onPress 터치 콜백
 * @param disabled 비활성화 여부
 * ---
 * @example
 * ```tsx
 * <ChooseButton
 *   label="적극적으로 다가가는 편"
 *   selected={value === 'A'}
 *   onPress={() => setValue('A')}
 * />
 * ```
 */

export interface ChooseButtonProps {
  /** 버튼 텍스트 */
  label: string;
  /** 선택 상태 */
  selected: boolean;
  /** 터치 콜백 */
  onPress: () => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  styleClass?: StyleClass;
}

export default function ChooseButton({
  label,
  selected,
  onPress,
  disabled,
  styleClass,
}: ChooseButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: !!disabled }}
      className={cn(
        'w-full h-[52px] rounded-xl items-center justify-center border-2',
        selected
          ? 'border-primary bg-primary-lightest'
          : 'border-text-gray6 bg-white',
        disabled ? 'opacity-50' : '',
        styleClass?.root,
      )}
    >
      <Text
        className={cn(
          'text-sm font-medium',
          selected ? 'text-primary' : 'text-text-gray3',
          styleClass?.label,
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}
