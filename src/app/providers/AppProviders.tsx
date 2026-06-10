import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { AppErrorFallback } from './ErrorBoundaryProvider';
import QueryProvider from './QueryProvider';
import * as Sentry from "@sentry/react-native";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        {/* TODO: fallback UI 정식으로 나오면 재정의 */}
        <Sentry.ErrorBoundary fallback={({ resetError }) => (
          <AppErrorFallback resetErrorBoundary={resetError} />
        )}>
          <QueryProvider>
            <BottomSheetModalProvider>
              {children}
            </BottomSheetModalProvider>
          </QueryProvider>
        </Sentry.ErrorBoundary>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
