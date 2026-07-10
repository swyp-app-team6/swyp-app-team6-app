import React from 'react';
import { Pressable, Text } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface StyleClass {
  root?: string;
  label?: string;
}

/**
 * # FavTag
 * ---
 * - 간단설명: 관심사/취미 선택용 토글 태그 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 이모지 + 텍스트 조합으로 표시
 *   - selected 상태에 따라 다크/라이트 배경 전환
 *   - ChipSelect와 달리 단일 토글 동작
 * ---
 * @param emoji 태그 앞에 표시할 이모지
 * @param label 태그 텍스트
 * @param selected 선택 여부 (on/off)
 * @param onPress 터치 콜백
 * ---
 * @example
 * ```tsx
 * <FavTag emoji="🇺🇸" label="외국어" selected={false} onPress={() => {}} />
 * <FavTag emoji="⛺" label="캠핑 / 드라이브" selected={true} onPress={() => {}} />
 * ```
 */
export interface FavTagProps {
  /** 태그 앞에 표시할 이모지 */
  emoji: string;
  /** 태그 텍스트 */
  label: string;
  /** 선택 여부 */
  selected: boolean;
  /** 터치 콜백 */
  onPress: () => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  styleClass?: StyleClass;
}

export default function FavTag({
  emoji,
  label,
  selected,
  onPress,
  disabled = false,
  styleClass,
}: FavTagProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={cn(
        'h-[52px] justify-center rounded-xl px-4',
        selected ? 'bg-text-gray2' : 'bg-text-gray7',
        disabled ? 'opacity-50' : '',
        styleClass?.root,
      )}
    >
      <Text
        className={cn(
          'text-sm font-semibold tracking-tight',
          selected ? 'text-white' : 'text-text-black',
          styleClass?.label,
        )}
      >
        {emoji} {label}
      </Text>
    </Pressable>
  );
}
