import React, { Suspense } from 'react'
import { ActivityIndicator, View } from 'react-native'

/**
 * # LoadSuspense
 * ---
 * - 간단설명: React Suspense 래퍼 — 하위 컴포넌트 로딩 중 ActivityIndicator 표시
 * - 제약사항 및 특이사항:
 *   - children의 flex 레이아웃을 유지하기 위해 flex-1 적용
 * ---
 * @param children 로딩 대상 컴포넌트
 * ---
 * @example
 * <LoadSuspense>
 *   <AsyncDataComponent />
 * </LoadSuspense>
 */
export default function LoadSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      }
    >
      {children}
    </Suspense>
  )
}
