import React, { useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { cn } from '@/shared/lib/cn';
import SafeBottomSheetModal from '@/shared/ui/SafeBottomSheetModal';

interface StyleClass {
  trigger?: string;
  content?: string;
  item?: string;
}

interface Option {
  label: string;
  value: string;
}

interface Props {
  value?: string;
  options: Option[];
  onSelect: (value: string) => void;
  placeholder?: string;
  styleClass?: StyleClass;
}

/**
 * # Selectbox
 * ---
 * - 간단설명: 바텀시트 기반 드롭다운 옵션 선택 컴포넌트
 * - 제약사항 및 특이사항:
 *   - SafeBottomSheetModal 기반
 *   - 선택된 항목은 보라색 강조 표시
 *   - SafeArea 하단 여백 자동 처리
 * ---
 * @param value 현재 선택된 값
 * @param options 선택 가능한 옵션 목록
 * @param onSelect 옵션 선택 시 콜백
 * @param placeholder 미선택 시 표시 텍스트
 * ---
 * @example
 * ```tsx
 * <Selectbox
 *   value={selected}
 *   options={[{ label: '옵션1', value: '1' }]}
 *   onSelect={setSelected}
 *   placeholder="선택해주세요"
 * />
 * ```
 */
function Selectbox({ value, options, onSelect, placeholder, styleClass }: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const selected = options.find(o => o.value === value);

  const handleOpen = () => bottomSheetRef.current?.present();
  const handleClose = () => bottomSheetRef.current?.dismiss();

  return (
    <>
      <Pressable
        onPress={handleOpen}
        accessibilityRole="combobox"
        className={cn(
          'flex-row items-center justify-between rounded border border-gray-300 px-3 py-2',
          styleClass?.trigger,
        )}
      >
        <Text className={selected ? 'text-gray-900' : 'text-gray-400'}>
          {selected?.label ?? placeholder ?? '선택'}
        </Text>
        <Text className="text-gray-400">▾</Text>
      </Pressable>

      <SafeBottomSheetModal ref={bottomSheetRef}>
        <View className={cn(styleClass?.content)}>
          {options.map(item => (
            <Pressable
              key={item.value}
              onPress={() => {
                onSelect(item.value);
                handleClose();
              }}
              className={cn(
                'border-b border-gray-100 px-5 py-4',
                item.value === value ? 'bg-primary-lightest' : '',
                styleClass?.item,
              )}
            >
              <Text
                className={cn(
                  'text-base',
                  item.value === value ? 'font-semibold text-primary' : 'text-gray-900',
                )}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </SafeBottomSheetModal>
    </>
  );
}

export default Selectbox;
