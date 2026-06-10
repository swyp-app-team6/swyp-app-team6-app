import '../../global.css';
import React from 'react';
import * as Sentry from '@sentry/react-native';
import { View, Text } from 'react-native';
import StackRouter from '@/shared/router/StackRouter';
import AppProviders from '@/app/providers/AppProviders';
import Toast from 'react-native-toast-message';
import { Button } from '@/shared/ui/Button';

/**
 * navigation 화면 타입
 */
export type HomeStackParamList = {
  Home: undefined;
  Detail: { id: string };
};

/**
 * # ErrorFallback
 * ---
 * - 간단설명: 앱 렌더링 크래시 발생 시 노출되는 에러 화면
 * - 제약사항: Sentry.ErrorBoundary의 fallback으로만 사용
 * ---
 * @param resetError 에러 바운더리 상태를 초기화해 앱을 재시작하는 함수
 */
function ErrorFallback({ resetError }: { resetError: () => void }) {
  return (
    <View className="flex-1 items-center justify-center px-6 bg-white">
      <Text className="text-lg font-semibold text-gray-900 mb-2">문제가 발생했습니다</Text>
      <Text className="text-sm text-gray-500 text-center mb-8">
        앱을 다시 시작해도 문제가 지속되면 고객센터에 문의해주세요.
      </Text>
      <Button title="앱 다시 시작" onPress={resetError} />
    </View>
  );
}

function App() {
  return (
    <Sentry.ErrorBoundary fallback={({ resetError }) => <ErrorFallback resetError={resetError} />}>
      <AppProviders>
        <StackRouter />
        <Toast />
      </AppProviders>
    </Sentry.ErrorBoundary>
  );
}

export default App;
