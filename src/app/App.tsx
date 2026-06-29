import '../../global.css';
import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react-native';
import BootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StackRouter from '@/shared/router/StackRouter';
import AppProviders from '@/app/providers/AppProviders';
import Toast from 'react-native-toast-message';
import { setupInterceptors } from '../shared/api';
import useAuthStore from '@/entities/user/model/authStore';
import usePermissionStore from '@/widgets/permissions/model/usePermissionStore';
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
 *   - 최초 실행 여부(hasSeenOnboarding)로 초기 라우트 결정
 *   - 모든 초기화 완료 후 스플래시 숨김
 * ---
 */
function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState<keyof NavigatorType>('home');

  useEffect(() => {
    (async () => {
      try {
        const { initTokenFromStorage, fetchUserInfo } = useAuthStore.getState();
        const { checkCameraPermission, checkGalleryPermission } = usePermissionStore.getState();

        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        const hasTokens = await initTokenFromStorage();

        await checkCameraPermission().catch(() => {});
        await checkGalleryPermission().catch(() => {});

        if (hasSeenOnboarding !== 'true') {
          setInitialRoute('onboarding');
        } else if (!hasTokens) {
          setInitialRoute('login');
        } else {
          setInitialRoute('home');
          fetchUserInfo().catch(() => {});
        }
      } catch (e) {
        console.error(e);
        setInitialRoute('login');
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
      <Toast />
    </AppProviders>
  );
}

export default Sentry.wrap(App);
