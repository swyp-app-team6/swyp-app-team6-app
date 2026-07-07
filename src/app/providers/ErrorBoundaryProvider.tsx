import React from 'react';
import { Text, View } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorIcon } from '@/shared/ui/icons/ErrorIcon';
import { Button } from '@/shared/ui/Button';

/**
 * # AppErrorFallback
 * ---
 * - 간단설명: 앱 전역 에러 발생 시 표시되는 폴백 UI 컴포넌트
 * - 제약사항 및 특이사항:
 *   - ErrorBoundary의 FallbackComponent로 사용
 *   - ErrorDialog와 동일한 에러 아이콘 + 재시도 버튼 UI 적용
 * ---
 * @param resetErrorBoundary 에러 초기화 함수
 * ---
 * @example
 * ```tsx
 * <ErrorBoundary FallbackComponent={AppErrorFallback}>
 *   <App />
 * </ErrorBoundary>
 * ```
 */
export function AppErrorFallback({ resetErrorBoundary }: { resetErrorBoundary?: () => void; error?: unknown }) {
  return (
    <View className="flex-1 items-center justify-center bg-white px-8 gap-4">
      <ErrorIcon />
      <View className="items-center gap-1">
        <Text className="text-base font-bold text-text-black text-center leading-[22.4px]">
          일시적인 오류가 발생했어요
        </Text>
        <Text className="text-sm text-text-gray3 text-center leading-5">
          다시 시도 해주세요
        </Text>
      </View>
      <View className="w-[260px] mt-2">
        <Button title="다시 시도하기" variant="primary" onPress={resetErrorBoundary} />
      </View>
    </View>
  );
}

export default function ErrorBoundaryProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={AppErrorFallback}>
      {children}
    </ErrorBoundary>
  );
}
