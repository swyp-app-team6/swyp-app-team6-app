import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { GalleryIcon, Layout, PlaygroundIcon, ProfileIcon, QRIcon } from '@/shared/ui'
import LocalEnvBadge from '@/shared/ui/LocalEnvBadge';

const ACTIVE_COLOR = '#3b82f6';
const INACTIVE_COLOR = '#9ca3af';

/**
 * 하단 탭 네비게이션 아이템 목록
 * - NavigatorType 키 기반으로 라우트 이름 관리
 */
const NAV_ITEMS = [
  { name: 'qr', label: 'QR', icon: (active: boolean) => <QRIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: 'profile', label: '회원정보', icon: (active: boolean) => <ProfileIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: 'gallery', label: '갤러리', icon: (active: boolean) => <GalleryIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: 'playground', label: 'UI', icon: (active: boolean) => <PlaygroundIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
];

/**
 * # withLayout
 * ---
 * - 간단설명: 탭 네비게이션이 포함된 공통 레이아웃(Layout + BottomNav)을 HOC 방식으로 주입하는 함수
 * - 제약사항 및 특이사항: 래핑된 컴포넌트는 Layout 없이 Header + Layout.Body만 렌더링해야 함
 * ---
 * @param WrappedComponent 레이아웃을 적용할 페이지 컴포넌트
 * @example
 * export default withLayout(TodoPage);
 */
export default function withLayout<P extends object>(WrappedComponent: React.ComponentType<P>) {
  function WithLayout(props: P) {
    const navigation = useNavigation<any>();
    const route = useRoute();

    return (
      <Layout>
        <WrappedComponent {...props} />
        <LocalEnvBadge />
        <Layout.BottomNav
          items={NAV_ITEMS}
          activeRoute={route.name}
          onPress={(name) => navigation.navigate(name)}
        />
      </Layout>
    );
  }
  WithLayout.displayName = `withLayout(${WrappedComponent.displayName ?? WrappedComponent.name})`;
  return WithLayout;
}
