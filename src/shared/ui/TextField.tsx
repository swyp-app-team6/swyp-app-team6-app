import React from "react";
import { Text, TextInput, View, type TextInputProps } from "react-native";
import { cn } from "@/shared/lib/cn";

/**
 * 라벨·에러 메시지를 포함한 텍스트 입력 컴포넌트.
 *
 * @example
 * ```tsx
 * <TextField label="이메일" placeholder="입력하세요" error={errors.email} />
 * ```
 */
export interface TextFieldProps extends Omit<React.ComponentProps<typeof TextInput>, 'style' | 'className'> {
  /** 입력 필드 위에 표시할 라벨 */
  label?: string;
  /** 에러 메시지. 값이 있으면 테두리가 빨간색으로 변경 */
  error?: string;
  extendStyle?: {
    /** 컨테이너 View에 추가할 Tailwind 클래스 */
    container?: string;
    /** TextInput에 추가할 Tailwind 클래스 */
    textInput?: string;
  };
};

export function TextField({
  label,
  error,
  extendStyle,
  ...rest
}: TextFieldProps) {
  return (
    <View className={cn('w-full', extendStyle?.container)}>
      {label ? <Text className="mb-1.5 text-sm font-medium text-text-gray3">{label}</Text> : null}
      <TextInput
        placeholderTextColor="#BFBFBF"
        className={cn(
          'h-14 rounded-xl border px-4 text-base text-text-black',
          error ? 'border-red-500' : 'border-text-gray6',
          extendStyle?.textInput,
        )}
        {...rest}
      />
      {error ? <Text className="mt-1 text-sm text-red-600">{error}</Text> : null}
    </View>
  );
}
