import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface ChipOption {
  /** 칩에 표시할 텍스트 */
  label: string;
  /** 칩의 고유 값 */
  value: string;
}

interface ChipSelectProps {
  /** 선택 가능한 옵션 목록 */
  options: ChipOption[];
  /** 현재 선택된 값 배열 */
  selected: string[];
  /** 선택 변경 콜백 */
  onSelect: (values: string[]) => void;
  /** 최대 선택 개수. 미지정 시 제한 없음 */
  max?: number;
  styleClass?: { root?: string; chip?: string; chipSelected?: string; label?: string };
}

interface ChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  styleClass?: { chip?: string; chipSelected?: string; label?: string };
}

/**
 * # ChipSelect
 * ---
 * - 간단설명: 여러 항목 중 N개 선택 가능한 칩 UI
 * - 제약사항 및 특이사항:
 *   - max 지정 시 최대 선택 개수 제한
 *   - 이미 선택된 칩을 다시 누르면 선택 해제
 * ---
 * @param options 선택 가능한 옵션 목록
 * @param selected 현재 선택된 값 배열
 * @param onSelect 선택 변경 콜백
 * @param max 최대 선택 개수
 * ---
 * @example
 * ```tsx
 * const [selected, setSelected] = useState<string[]>([]);
 *
 * <ChipSelect
 *   options={[
 *     { label: '운동', value: 'exercise' },
 *     { label: '독서', value: 'reading' },
 *     { label: '음악', value: 'music' },
 *   ]}
 *   selected={selected}
 *   onSelect={setSelected}
 *   max={2}
 * />
 * ```
 */
function ChipSelect({ options, selected, onSelect, max, styleClass }: ChipSelectProps) {
  const handlePress = (value: string) => {
    if (selected.includes(value)) {
      onSelect(selected.filter(v => v !== value));
    } else {
      if (max && selected.length >= max) return;
      onSelect([...selected, value]);
    }
  };

  return (
    <View className={cn('flex-row flex-wrap gap-2', styleClass?.root)}>
      {options.map(option => (
        <Chip
          key={option.value}
          label={option.label}
          selected={selected.includes(option.value)}
          onPress={() => handlePress(option.value)}
          styleClass={styleClass}
        />
      ))}
    </View>
  );
}

/**
 * # Chip
 * ---
 * - 간단설명: 개별 칩 버튼 컴포넌트
 * ---
 * @param label 칩 텍스트
 * @param selected 선택 여부
 * @param onPress 터치 콜백
 */
function Chip({ label, selected, onPress, styleClass }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={cn(
        'rounded-full px-4 py-2 border',
        selected
          ? 'bg-blue-600 border-blue-600'
          : 'bg-white border-gray-300',
        selected ? styleClass?.chipSelected : styleClass?.chip,
      )}
    >
      <Text
        className={cn(
          'text-sm font-medium',
          selected ? 'text-white' : 'text-gray-700',
          styleClass?.label,
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}

ChipSelect.Chip = Chip;

export default ChipSelect;
