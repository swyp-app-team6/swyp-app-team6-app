import React, { useMemo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ErrorBoundary } from 'react-error-boundary';

/**
 * 에러
 * @param param0 
 * @returns 
 */
export function AppErrorFallback({ resetErrorBoundary, error }: { resetErrorBoundary?: () => void; error?: unknown }) {

  /** 
   * 에러 문구 
   * TODO: 에러페이지 디자인/기획 나오면 재작성
   * */
  const errorMsg = useMemo(() => {
    const _error = error as Error;
    return _error.message || '알 수 없는 오류가 발생했습니다.';
  }, [error])

  return (
    <View className="flex-1 items-center justify-center bg-white px-8 gap-4">
      <Text className="text-4xl">⚠️</Text>
      <Text className="text-lg font-bold text-gray-900 text-center">문제가 발생했습니다</Text>
      <Text className="text-sm text-gray-500 text-center">{errorMsg}</Text>
      <TouchableOpacity
        onPress={resetErrorBoundary}
        className="mt-2 bg-blue-500 px-6 py-3 rounded-xl"
        activeOpacity={0.8}
      >
        <Text className="text-white font-semibold text-base">새로 고침</Text>
      </TouchableOpacity>
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
