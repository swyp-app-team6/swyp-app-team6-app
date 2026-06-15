import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { AppErrorFallback } from './ErrorBoundaryProvider';
import QueryProvider from './QueryProvider';
import * as Sentry from "@sentry/react-native";

/**
 * 전역에 적용되는 provider, global provider는 전부 여기에 작성
 * - StackRouter: 각 view 스택내비게이터
   - sentry errorboundary: 런타임에러 캐치용
   - SafeAreaProvider: 상태바, 노치, footer 등에 가려지지 않도록 여백 자동생성 provider
   - QueryProvider: tanstack query provider
   - BottomSheetModalProvider: 바텀시트 provider
   - modal, selectbox 등에 사용예정 

 */
export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ resetError }) => <AppErrorFallback resetErrorBoundary={resetError} />}
    >
      <GestureHandlerRootView style={styles.root}>
        <SafeAreaProvider>
          {/* TODO: fallback UI 정식으로 나오면 재정의 */}
          <QueryProvider>
            <BottomSheetModalProvider>
              {children}
            </BottomSheetModalProvider>
          </QueryProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Sentry.ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
