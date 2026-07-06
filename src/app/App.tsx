import '../../global.css';
import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react-native';
import BootSplash from 'react-native-bootsplash';
import StackRouter from '@/shared/router/StackRouter';
import AppProviders from '@/app/providers/AppProviders';
import Dialog from '@/shared/ui/Dialog';
import { setupInterceptors } from '../shared/api';
import useAuthStore from '@/entities/user/model/authStore';
import usePermissionStore from '@/widgets/permissions/model/usePermissionStore';
import useConditionStateStore from '@/shared/model/conditionStateStore';
import type { NavigatorType } from '@/shared/types';

/**
 * navigation 화면 타입
 */
export type HomeStackParamList = {
  Home: undefined;
  Detail: { id: string };
};

setupInterceptors();

/**
 * # App
 * ---
 * - 간단설명: 앱 최상위 컴포넌트, 스플래시 화면 동안 초기화 작업 수행
 * - 제약사항 및 특이사항:
 *   - 스플래시 동안 토큰 복원(hydrate) + fetchMe로 유저정보 초기화
 *   - 스플래시 동안 카메라·갤러리 권한 상태 확인
 *   - 조건 플래그(hasSeenOnboarding 등)로 초기 라우트 결정
 *   - 모든 초기화 완료 후 스플래시 숨김
 * ---
 */
function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<keyof NavigatorType>('home');

  useEffect(() => {
    (async () => {
      try {
        const { initTokenFromStorage } = useAuthStore.getState();
        const { checkCameraPermission, checkGalleryPermission } = usePermissionStore.getState();
        const { initFromStorage } = useConditionStateStore.getState();

        const [_hasTokens] = await Promise.all([
          initTokenFromStorage(),
          initFromStorage(),
        ]);

        await checkCameraPermission().catch(() => { });
        await checkGalleryPermission().catch(() => { });

        const { hasSeenOnboarding } = useConditionStateStore.getState();

        if (!hasSeenOnboarding) {
          setInitialRoute('onboarding');
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsReady(true);
        BootSplash.hide({ fade: true });
      }
    })();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <AppProviders>
      <StackRouter initialRouteName={initialRoute} />
      <Dialog />
    </AppProviders>
  );
}

export default Sentry.wrap(App);
