import React, { useState } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { cn } from '@/shared/lib/cn';
import { useKoreanSafeValue } from '@/shared/lib/useKoreanSafeValue';

interface Props extends Omit<TextInputProps, 'multiline'> {
  /** 입력 필드 상단 레이블 */
  label?: string;
  /** 에러 메시지 (표시 시 빨간 테두리) */
  error?: string;
  /** 최대 글자 수 (카운터 표시) */
  maxLength?: number;
  /** 최소 높이(px). 기본값: 100 */
  minHeight?: number;
  /** 바텀시트 내부에서 사용 시 true로 설정 (키보드 회피 지원) */
  isBottomSheet?: boolean;
  styleClass?: { root?: string; input?: string; label?: string };
}

/**
 * # Textbox
 * ---
 * - 간단설명: 멀티라인 텍스트 입력 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 항상 multiline 모드로 동작
 *   - maxLength 지정 시 글자수 카운터 표시
 *   - error 전달 시 빨간 테두리 + 에러 메시지 표시
 * ---
 * @param label 입력 필드 상단 레이블
 * @param error 에러 메시지
 * @param maxLength 최대 글자 수
 * @param minHeight 최소 높이(px)
 * ---
 * @example
 * ```tsx
 * const [text, setText] = useState('');
 *
 * <Textbox
 *   label="자기소개"
 *   value={text}
 *   onChangeText={setText}
 *   maxLength={200}
 *   placeholder="자기소개를 입력해주세요"
 * />
 * ```
 */
export default function Textbox({
  label,
  error,
  maxLength,
  minHeight = 100,
  isBottomSheet,
  styleClass,
  value,
  ...rest
}: Props) {
  const [length, setLength] = useState(value?.length ?? 0);
  const InputComponent = isBottomSheet ? BottomSheetTextInput : TextInput;

  const handleChangeText = (text: string) => {
    setLength(text.length);
    rest.onChangeText?.(text);
  };

  const { valueProps, onChangeText } = useKoreanSafeValue(value, handleChangeText);

  return (
    <View className={cn(styleClass?.root)}>
      {label && (
        <Text className={cn('mb-3 text-base font-medium text-text-gray7', styleClass?.label)}>
          {label}
        </Text>
      )}
      <InputComponent
        multiline
        textAlignVertical="top"
        maxLength={maxLength}
        placeholderTextColor="#BFBFBF"
        className={cn(
          'rounded-xl border bg-white p-4 text-base text-text-black',
          error ? 'border-red-500' : 'border-text-gray6',
          styleClass?.input,
        )}
        style={{ minHeight }}
        {...rest}
        {...valueProps}
        onChangeText={onChangeText}
      />
      <View className="flex-row justify-between mt-1.5">
        {error ? (
          <Text className="text-xs text-red-600">{error}</Text>
        ) : (
          <View />
        )}
        {maxLength !== undefined && (
          <Text className="text-xs text-text-gray4">
            {length} / {maxLength}
          </Text>
        )}
      </View>
    </View>
  );
}
