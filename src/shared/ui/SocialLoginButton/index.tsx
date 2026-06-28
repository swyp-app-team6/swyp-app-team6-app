import React from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { cn } from '@/shared/lib/cn';

/**
 * 소셜 로그인 제공자 타입
 * - kakao = 카카오
 * - google = 구글
 * - apple = 애플
 */
export type SocialProvider = 'kakao' | 'google' | 'apple';

interface StyleClass {
  root?: string;
  label?: string;
}

/**
 * # SocialLoginButton
 * ---
 * - 간단설명: 소셜 로그인 버튼 컴포넌트
 * - 제약사항 및 특이사항:
 *   - provider별로 배경색, 텍스트, 아이콘이 자동 결정됨
 *   - kakao(노란 배경), google(흰 배경+테두리), apple(검정 배경)
 *   - loading 상태 시 스피너 표시
 * ---
 * @param provider 소셜 로그인 제공자
 * @param onPress 터치 콜백
 * @param disabled 비활성화 여부
 * @param loading 로딩 상태
 * ---
 * @example
 * ```tsx
 * <SocialLoginButton provider="kakao" onPress={handleKakao} />
 * <SocialLoginButton provider="google" onPress={handleGoogle} />
 * <SocialLoginButton provider="apple" onPress={handleApple} />
 * ```
 */

export interface SocialLoginButtonProps {
  /** 소셜 로그인 제공자 */
  provider: SocialProvider;
  /** 터치 콜백 */
  onPress: () => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  styleClass?: StyleClass;
}

const providerConfig: Record<
  SocialProvider,
  { root: string; label: string; text: string; icon: string; spinnerColor: string }
> = {
  kakao: {
    root: 'bg-secondary-yellow',
    label: 'text-text-black',
    text: '카카오로 로그인하기',
    icon: '💬',
    spinnerColor: '#1A1A1A',
  },
  google: {
    root: 'bg-white border border-text-gray6',
    label: 'text-text-black',
    text: 'Google로 로그인하기',
    icon: 'G',
    spinnerColor: '#1A1A1A',
  },
  apple: {
    root: 'bg-black',
    label: 'text-white',
    text: 'Apple로 로그인하기',
    icon: '',
    spinnerColor: '#FFFFFF',
  },
};

export default function SocialLoginButton({
  provider,
  onPress,
  disabled,
  loading = false,
  styleClass,
}: SocialLoginButtonProps) {
  const config = providerConfig[provider];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={config.text}
      className={cn(
        'w-full h-14 rounded-xl flex-row items-center justify-center gap-2',
        config.root,
        isDisabled ? 'opacity-50' : '',
        styleClass?.root,
      )}
    >
      {loading ? (
        <ActivityIndicator color={config.spinnerColor} />
      ) : (
        <>
          <Text className="text-base">{config.icon}</Text>
          <Text
            className={cn(
              'text-base font-semibold',
              config.label,
              styleClass?.label,
            )}
          >
            {config.text}
          </Text>
        </>
      )}
    </Pressable>
  );
}
