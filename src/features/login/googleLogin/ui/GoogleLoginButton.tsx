import React from 'react';
import { Button } from '@/shared/ui';
import type { ButtonProps } from '@/shared/ui/Button';

type GoogleLoginButtonProps = Omit<ButtonProps, 'title'> & {
  /** 로딩 상태 */
  loading?: boolean;
};

/**
 * # GoogleLoginButton
 * ---
 * - 간단설명: Google 소셜 로그인 버튼 UI
 * - 제약사항 및 특이사항: onPress 핸들러는 외부에서 주입
 * ---
 * @param onPress 버튼 클릭 핸들러
 * @param loading 로딩 상태
 * ---
 * @example
 * <GoogleLoginButton onPress={handleGoogleLogin} loading={isPending} />
 */
export default function GoogleLoginButton({ loading, ...rest }: GoogleLoginButtonProps) {
  return (
    <Button
      title="Google로 로그인"
      variant="secondary"
      loading={loading}
      {...rest}
    />
  );
}
