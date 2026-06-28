import React, { useCallback, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { cn } from '@/shared/lib/cn';

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

function Selectbox({ value, options, onSelect, placeholder, styleClass }: Props) {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { bottom } = useSafeAreaInsets();
  const selected = options.find(o => o.value === value);

  const handleOpen = () => bottomSheetRef.current?.present();
  const handleClose = () => bottomSheetRef.current?.dismiss();

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

      <BottomSheetModal
        ref={bottomSheetRef}
        enableDynamicSizing
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView className={cn(styleClass?.content)}>
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
          {/* safe area spacer: bottom inset + 16px gutter */}
          <View style={{ height: bottom + 16 }} />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

export default Selectbox;
