import React, { Suspense } from 'react'
import { ActivityIndicator, View } from 'react-native'

/**
 * React Suspense 래퍼. 하위 컴포넌트 로딩 중 `ActivityIndicator`를 표시합니다.
 *
 * @example
 * ```tsx
 * <LoadSuspense>
 *   <AsyncDataComponent />
 * </LoadSuspense>
 * ```
 */
export default function LoadSuspense({ children }) {
  return (
    <Suspense fallback={<ActivityIndicator />}>
      <View className='fixed inset-0 flex flex-row items-center justify-center'>
        {children}
      </View>
    </Suspense>
  )
}
