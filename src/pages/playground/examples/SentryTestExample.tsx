import { useState } from 'react';
import { Alert, View } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { Button } from '@/shared/ui';
import Section from './Section';

/**
 * # SentryRenderErrorTrigger
 * ---
 * - 간단설명: `shouldThrow`가 true일 때 렌더 중 에러를 발생시켜 ErrorBoundary + Sentry 연동을 검증하는 컴포넌트
 * - 제약사항: 테스트 전용. 프로덕션 코드에서는 사용 금지
 * ---
 * @param shouldThrow true면 렌더 시 에러 throw
 */
function SentryRenderErrorTrigger({ shouldThrow }: { shouldThrow: boolean }) {
  if (shouldThrow) {
    throw new Error('[Sentry 테스트] 고의적 렌더 에러 발생');
  }
  return null;
}

/**
 * # SentryTestExample
 * ---
 * - 간단설명: Sentry 에러 리포팅 연동 테스트 (captureException / 렌더 에러) 예제
 * ---
 * @example
 * <SentryTestExample />
 */
export default function SentryTestExample() {
  const [throwRenderError, setThrowRenderError] = useState(false);

  return (
    <Section title="Sentry — 에러 리포팅 연동 테스트">
      <View className="gap-3">
        <Button
          title="captureException 전송"
          variant="secondary"
          onPress={() => {
            const error = new Error('[Sentry 테스트] 수동 captureException 호출');
            Sentry.captureException(error);
            Alert.alert('Sentry 테스트', 'Sentry에 에러를 전송했습니다.\nSentry 대시보드에서 확인하세요.');
          }}
        />
        <Button
          title="렌더 에러 발생 (ErrorBoundary)"
          variant="secondary"
          onPress={() => setThrowRenderError(true)}
        />
        <SentryRenderErrorTrigger shouldThrow={throwRenderError} />
      </View>
    </Section>
  );
}
