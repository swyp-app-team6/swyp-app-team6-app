import { useRef, useCallback, useState } from 'react';
import { Platform } from 'react-native';

/**
 * # useKoreanSafeValue
 * ---
 * - 간단설명: iOS에서 한글 자음모음 분리 방지를 위한 TextInput value 관리 훅
 * - 제약사항 및 특이사항:
 *   - iOS에서 한글 조합(composition) 중 value prop 전달을 생략하여 네이티브 IME 상태 보호
 *   - 부모가 텍스트를 변환(trim 등)한 경우에만 value를 전달하여 동기화
 *   - focus 시 nativeTextRef를 리셋하여 네이티브 뷰 분리/재생성 후에도 value 복원 보장
 *   - Android에서는 기존 동작과 동일
 * ---
 * @param value 외부에서 전달된 텍스트 값
 * @param onChangeText 텍스트 변경 콜백
 * ---
 * @example
 * ```tsx
 * const { valueProps, onChangeText, onFocus } = useKoreanSafeValue(value, rest.onChangeText);
 * <TextInput {...valueProps} onChangeText={onChangeText} onFocus={onFocus} />
 * ```
 */
export function useKoreanSafeValue(
  value: string | undefined,
  onChangeText?: (text: string) => void,
) {
  const nativeTextRef = useRef<string | undefined>(undefined);
  const [, forceUpdate] = useState(0);

  const safeOnChangeText = useCallback(
    (text: string) => {
      nativeTextRef.current = text;
      onChangeText?.(text);
    },
    [onChangeText],
  );

  /**
   * focus 시 nativeTextRef를 리셋하여 value prop이 강제 전달되도록 한다.
   * iOS에서 화면 전환 후 네이티브 TextInput이 분리/재생성되어 내용이 사라지는 문제를 방지한다.
   */
  const handleFocus = useCallback(() => {
    nativeTextRef.current = undefined;
    forceUpdate(c => c + 1);
  }, []);

  /**
   * iOS에서 value가 네이티브 텍스트와 동일하면 value prop을 생략하여 조합 상태를 보호한다.
   * value가 다른 경우(부모가 trim 등 변환 적용)에만 value를 전달하여 네이티브 입력을 동기화한다.
   */
  const isIOSSameValue =
    Platform.OS === 'ios' && value === nativeTextRef.current;

  return {
    /** TextInput에 spread할 value props (iOS 조합 중에는 빈 객체) */
    valueProps: isIOSSameValue ? {} : { value },
    /** 한글 조합 추적이 포함된 onChangeText 핸들러 */
    onChangeText: safeOnChangeText,
    /** focus 시 네이티브 ref 리셋 핸들러 */
    onFocus: handleFocus,
  };
}
