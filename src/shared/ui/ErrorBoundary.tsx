import React from 'react'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary as _ErrorBoundary } from 'react-error-boundary'
import { Text, View } from 'react-native'
import { Button } from './Button'

/**
 * React Query 에러를 감지하고 재시도 UI를 표시하는 에러 바운더리.
 * `QueryErrorResetBoundary`와 연동되어 재시도 시 쿼리 캐시도 함께 초기화합니다.
 *
 * @example
 * ```tsx
 * <ErrorBoundary>
 *   <LoadSuspense>
 *     <AsyncDataComponent />
 *   </LoadSuspense>
 * </ErrorBoundary>
 * ```
 */
const ErrorBoundary = ({ children }: { children: React.ReactNode }) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <_ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary, error }) => (
          <View className="items-center justify-center p-4 gap-2">
            <Text className="text-red-500 text-sm">{error?.message ?? '오류가 발생했습니다.'}</Text>
            <Button onPress={() => resetErrorBoundary()} title="재시도" />
          </View>
        )}
      >
        {children}
      </_ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
)

export default ErrorBoundary;