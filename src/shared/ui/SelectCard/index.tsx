import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface Props {
  /** 선택 상태 */
  selected: boolean;
  /** 터치 콜백 */
  onPress: () => void;
  children: React.ReactNode;
  /** 비활성화 여부 */
  disabled?: boolean;
  styleClass?: { root?: string; check?: string };
}

/**
 * # SelectCard
 * ---
 * - 간단설명: 선택 가능한 카드 형태 UI
 * - 제약사항 및 특이사항:
 *   - 선택 시 파란 테두리 + 체크 표시
 *   - Card 컴포넌트와 동일한 rounded-2xl 스타일 기반
 * ---
 * @param selected 선택 상태
 * @param onPress 터치 콜백
 * @param children 카드 내부 컨텐츠
 * @param disabled 비활성화 여부
 * ---
 * @example
 * ```tsx
 * const [value, setValue] = useState('');
 *
 * <SelectCard selected={value === 'A'} onPress={() => setValue('A')}>
 *   <Text>옵션 A</Text>
 * </SelectCard>
 * ```
 */
export default function SelectCard({
  selected,
  onPress,
  children,
  disabled,
  styleClass,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ selected, disabled: !!disabled }}
      className={cn(
        'rounded-2xl p-4 border-2',
        selected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white',
        disabled ? 'opacity-50' : '',
        styleClass?.root,
      )}
    >
      {selected && (
        <View
          className={cn(
            'absolute top-3 right-3 h-6 w-6 items-center justify-center rounded-full bg-blue-600',
            styleClass?.check,
          )}
        >
          <Text className="text-xs font-bold text-white">✓</Text>
        </View>
      )}
      {children}
    </Pressable>
  );
}
