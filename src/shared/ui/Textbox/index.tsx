import React, { useState } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface Props extends Omit<TextInputProps, 'multiline'> {
  /** 입력 필드 상단 레이블 */
  label?: string;
  /** 에러 메시지 (표시 시 빨간 테두리) */
  error?: string;
  /** 최대 글자 수 (카운터 표시) */
  maxLength?: number;
  /** 최소 높이(px). 기본값: 100 */
  minHeight?: number;
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
  styleClass,
  value,
  ...rest
}: Props) {
  const [length, setLength] = useState(value?.length ?? 0);

  const handleChangeText = (text: string) => {
    setLength(text.length);
    rest.onChangeText?.(text);
  };

  return (
    <View className={cn(styleClass?.root)}>
      {label && (
        <Text className={cn('mb-1.5 text-sm font-medium text-gray-700', styleClass?.label)}>
          {label}
        </Text>
      )}
      <TextInput
        multiline
        textAlignVertical="top"
        maxLength={maxLength}
        value={value}
        placeholderTextColor="#9ca3af"
        className={cn(
          'rounded-lg border p-3 text-base text-gray-900',
          error ? 'border-red-500' : 'border-gray-300',
          styleClass?.input,
        )}
        style={{ minHeight }}
        onChangeText={handleChangeText}
        {...rest}
      />
      <View className="flex-row justify-between mt-1">
        {error ? (
          <Text className="text-xs text-red-600">{error}</Text>
        ) : (
          <View />
        )}
        {maxLength !== undefined && (
          <Text className="text-xs text-gray-400">
            {length}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
}
