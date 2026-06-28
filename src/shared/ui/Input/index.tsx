import React from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface StyleClass {
  root?: string;
  input?: string;
  prefix?: string;
  suffix?: string;
}

/**
 * prefix·suffix 슬롯을 갖춘 인라인 입력 컴포넌트.
 *
 * @example
 * ```tsx
 * <Input
 *   placeholder="검색어"
 *   prefix={<Text>🔍</Text>}
 *   suffix={<Text className="text-primary">검색</Text>}
 *   onEnter={handleSearch}
 *   styleClass={{ root: 'border border-gray-300 rounded-lg px-2' }}
 * />
 * ```
 */
interface InputProps extends Omit<TextInputProps, 'onSubmitEditing'> {
  /** 입력 필드 왼쪽에 표시할 요소 (아이콘 등) */
  prefix?: React.ReactNode;
  /** 입력 필드 오른쪽에 표시할 요소 (버튼 등) */
  suffix?: React.ReactNode;
  /** 키보드 Return 키 탭 시 호출 */
  onEnter?: () => void;
  styleClass?: StyleClass;
}

function Input({ prefix, suffix, onEnter, styleClass, ...props }: InputProps) {
  return (
    <View className={cn('relative h-14 flex-row items-center rounded-xl border border-text-gray6 bg-white px-4', styleClass?.root)}>
      {prefix && (
        <View
          className={cn('mr-2 items-center justify-center', styleClass?.prefix)}
          pointerEvents="none"
        >
          {prefix}
        </View>
      )}
      <TextInput
        placeholderTextColor="#BFBFBF"
        className={cn('flex-1 text-base text-text-black', styleClass?.input)}
        onSubmitEditing={onEnter ? () => onEnter() : undefined}
        returnKeyType={onEnter ? 'done' : undefined}
        {...props}
      />
      {suffix && (
        <View
          pointerEvents="auto"
          className={cn('ml-2 items-center justify-center', styleClass?.suffix)}
        >
          {suffix}
        </View>
      )}
    </View>
  );
}

export default Input;
