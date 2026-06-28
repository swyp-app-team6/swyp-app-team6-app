import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { cn } from '@/shared/lib/cn';
import { AppleIcon } from '@/shared/ui/icons';

interface StyleClass {
  root?: string;
  label?: string;
}

/**
 * # AppleLoginButton
 * ---
 * - 간단설명: 애플 소셜 로그인 버튼 컴포넌트
 * - 제약사항 및 특이사항:
 *   - CTA 버튼 스펙 상속 (높이 56px, 라운드 12px, 풀 너비)
 *   - 배경색 #080808, 텍스트색 #F5F5F5
 * ---
 * @param onPress 터치 콜백
 * @param disabled 비활성화 여부
 * @param loading 로딩 상태
 * ---
 * @example
 * ```tsx
 * <AppleLoginButton onPress={handleAppleLogin} />
 * ```
 */
export interface AppleLoginButtonProps {
  /** 터치 콜백 */
  onPress: () => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 커스텀 스타일 클래스 */
  styleClass?: StyleClass;
}

export default function AppleLoginButton({
  onPress,
  disabled,
  loading = false,
  styleClass,
}: AppleLoginButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel="Apple로 로그인하기"
      className={cn(
        'w-full h-14 rounded-xl items-center justify-center bg-[#080808] active:opacity-90',
        isDisabled ? 'opacity-50' : '',
        styleClass?.root,
      )}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <View className="flex-row items-center justify-center gap-2">
          <AppleIcon size={18} color="white" />
          <Text
            className={cn(
              'text-base font-semibold tracking-tight text-[#F5F5F5]',
              styleClass?.label,
            )}
          >
            Apple로 로그인하기
          </Text>
        </View>
      )}
    </Pressable>
  );
}
