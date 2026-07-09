import React, { useState } from 'react';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { cn } from '@/shared/lib/cn';
import { useKoreanSafeValue } from '@/shared/lib/useKoreanSafeValue';

interface StyleClass {
  root?: string;
  input?: string;
  prefix?: string;
  suffix?: string;
  label?: string;
  counter?: string;
}

/**
 * # Input
 * ---
 * - 간단설명: prefix·suffix 슬롯과 라벨·카운터를 갖춘 인라인 입력 컴포넌트
 * - 제약사항 및 특이사항:
 *   - label 지정 시 입력 필드 상단에 라벨 표시
 *   - maxLength 지정 시 우측에 글자수 카운터 자동 표시
 *   - error 지정 시 빨간 테두리 + 하단 에러 메시지 표시
 *   - isBottomSheet=true 시 키보드 회피 지원
 * ---
 * @param label 입력 필드 상단 라벨
 * @param error 에러 메시지 (빨간 테두리 표시)
 * @param prefix 입력 필드 왼쪽에 표시할 요소 (아이콘 등)
 * @param suffix 입력 필드 오른쪽에 표시할 요소 (버튼 등)
 * @param onEnter 키보드 Return 키 탭 시 호출
 * ---
 * @example
 * ```tsx
 * <Input
 *   label="이름"
 *   placeholder="프로필 이름을 입력해주세요"
 *   maxLength={10}
 * />
 * ```
 */
interface InputProps extends Omit<TextInputProps, 'onSubmitEditing'> {
  /** 입력 필드 상단 라벨 */
  label?: string;
  /** 에러 메시지 (표시 시 빨간 테두리) */
  error?: string;
  /** 입력 필드 왼쪽에 표시할 요소 (아이콘 등) */
  prefix?: React.ReactNode;
  /** 입력 필드 오른쪽에 표시할 요소 (버튼 등) */
  suffix?: React.ReactNode;
  /** 키보드 Return 키 탭 시 호출 */
  onEnter?: () => void;
  /** 바텀시트 내부에서 사용 시 true로 설정 (키보드 회피 지원) */
  isBottomSheet?: boolean;
  styleClass?: StyleClass;
}

function Input({
  label,
  error,
  prefix,
  suffix,
  onEnter,
  isBottomSheet,
  styleClass,
  maxLength,
  ...props
}: InputProps) {
  const InputComponent = isBottomSheet ? BottomSheetTextInput : TextInput;
  const [length, setLength] = useState(props.value?.replace(/\s/g, '').length ?? 0);

  const handleChangeText = (text: string) => {
    setLength(text.replace(/\s/g, '').length);
    props.onChangeText?.(text);
  };

  const { valueProps, onChangeText } = useKoreanSafeValue(props.value, handleChangeText);

  const showCounter = maxLength !== undefined;

  return (
    <View>
      {label && (
        <Text className={cn('mb-3 text-base font-medium text-text-black', styleClass?.label)}>
          {label}
        </Text>
      )}
      <View
        className={cn(
          'relative h-14 flex-row items-center rounded-xl bg-text-gray7 px-4',
          error ? 'border-red-500' : 'border-text-gray6',
          styleClass?.root,
        )}
      >
        {prefix && (
          <View
            className={cn('mr-2 items-center justify-center', styleClass?.prefix)}
            pointerEvents="none"
          >
            {prefix}
          </View>
        )}
        <InputComponent
          placeholderTextColor="#BFBFBF"
          className={cn('flex-1 text-base text-text-black', styleClass?.input)}
          onSubmitEditing={onEnter ? () => onEnter() : undefined}
          returnKeyType={onEnter ? 'done' : undefined}
          maxLength={maxLength}
          {...props}
          {...valueProps}
          onChangeText={onChangeText}
        />
        {showCounter && !suffix && (
          <Text className={cn('ml-2 text-sm text-text-gray5', styleClass?.counter)}>
            {length} / {maxLength}
          </Text>
        )}
        {suffix && (
          <View
            pointerEvents="auto"
            className={cn('ml-2 items-center justify-center', styleClass?.suffix)}
          >
            {suffix}
          </View>
        )}
      </View>
      {error && (
        <Text className="mt-1.5 text-xs text-red-600">{error}</Text>
      )}
    </View>
  );
}

export default Input;
