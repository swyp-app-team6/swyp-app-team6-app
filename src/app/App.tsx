import '../../global.css';
import React, { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react-native';
import BootSplash from 'react-native-bootsplash';
import StackRouter from '@/shared/router/StackRouter';
import AppProviders from '@/app/providers/AppProviders';
import Toast from 'react-native-toast-message';
import { setupInterceptors } from '../shared/api';
import useAuthStore from '@/entities/user/model/authStore';
import usePermissionStore from '@/widgets/permissions/model/usePermissionStore';

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
 *   - 모든 초기화 완료 후 스플래시 숨김
 * ---
 */
function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { initTokenFromStorage } = useAuthStore.getState();
        const { checkCameraPermission, checkGalleryPermission } = usePermissionStore.getState();

        await initTokenFromStorage();
        await checkCameraPermission();
        await checkGalleryPermission();
      } catch {
        // TODO: 만약 초기화 에러시 행위 정책 정리해 처리 필요(현재는 무조건 넘어감)
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
      <StackRouter />
      <Toast />
    </AppProviders>
  );
}

export default Sentry.wrap(App);
