import React, { useCallback } from 'react'
import { Linking, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { request, PERMISSIONS } from 'react-native-permissions'
import { Layout, HomeIcon, QRIcon, StorageIcon } from '@/shared/ui'
import { openDialog, closeDialog } from '@/shared/ui/Dialog'
import LocalEnvBadge from '@/shared/ui/LocalEnvBadge';

/** 플랫폼별 카메라 권한 상수 */
const CAMERA_PERMISSION =
  Platform.OS === 'ios'
    ? PERMISSIONS.IOS.CAMERA
    : PERMISSIONS.ANDROID.CAMERA;

const ACTIVE_COLOR = '#8C39FB';
const INACTIVE_COLOR = '#1A1A1A';

/**
 * 하단 탭 네비게이션 아이템 목록
 * - NavigatorType 키 기반으로 라우트 이름 관리
 */
const NAV_ITEMS = [
  { name: 'home', label: '홈', icon: (active: boolean) => <HomeIcon size={20} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: 'qr', label: 'QR 스캔', icon: (active: boolean) => <QRIcon size={20} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: 'storage', label: '보관함', icon: (active: boolean) => <StorageIcon size={20} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
];

/**
 * # withLayout
 * ---
 * - 간단설명: 탭 네비게이션이 포함된 공통 레이아웃(Layout + BottomNav)을 HOC 방식으로 주입하는 함수
 * - 제약사항 및 특이사항: 래핑된 컴포넌트는 Layout 없이 Header + Layout.Body만 렌더링해야 함
 * ---
 * @param WrappedComponent 레이아웃을 적용할 페이지 컴포넌트
 * @example
 * export default withLayout(HomePage);
 */
export default function withLayout<P extends object>(WrappedComponent: React.ComponentType<P>) {
  function WithLayout(props: P) {
    const navigation = useNavigation<any>();
    const route = useRoute();
    /**
     * # handleNavPress
     * ---
     * - 간단설명: 하단 탭 네비게이션 아이템 클릭 핸들러 — QR 탭은 카메라 권한 확인 후 이동
     * - 제약사항 및 특이사항:
     *   - QR 탭 클릭 시 카메라 권한이 없으면 화면 이동 없이 권한 팝업 표시
     *   - 권한 거절 시 홈으로 이동
     *   - blocked 상태면 설정 앱 이동 유도
     * ---
     * @param name 네비게이션 라우트 이름
     */
    const handleNavPress = useCallback(async (name: string) => {
      if (name !== 'qr') {
        navigation.navigate(name);
        return;
      }

      // QR 탭: 카메라 권한 요청
      const status = await request(CAMERA_PERMISSION);

      if (status === 'granted' || status === 'limited') {
        navigation.navigate('qr');
        return;
      }

      // blocked 상태: 설정 앱 이동 유도
      if (status === 'blocked') {
        openDialog({
          type: 'confirm',
          title: '카메라 권한 필요',
          message: 'QR코드 인식을 위해 카메라 권한이 필요합니다.\n설정에서 카메라 권한을 허용해주세요.',
          okLabel: '설정으로 이동',
          cancelLabel: '취소',
          okFn: () => {
            closeDialog();
            Linking.openSettings();
          },
          cancelFn: () => {
            closeDialog();
            navigation.navigate('home');
          },
          autoClose: false,
        });
        return;
      }

      // denied / unavailable: 권한 거절됨 → 홈으로 이동
      navigation.navigate('home');
    }, [navigation]);

    return (
      <Layout>
        <WrappedComponent {...props} />
        <LocalEnvBadge />
        <Layout.BottomNav
          items={NAV_ITEMS}
          activeRoute={route.name}
          onPress={handleNavPress}
        />
      </Layout>
    );
  }
  WithLayout.displayName = `withLayout(${WrappedComponent.displayName ?? WrappedComponent.name})`;
  return WithLayout;
}
