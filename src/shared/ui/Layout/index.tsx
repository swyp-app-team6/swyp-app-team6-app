import React from 'react';
import { Platform, View, ViewStyle } from 'react-native';
import { cn } from '@/shared/lib/cn';
import BottomNav, { type BottomNavItem } from '@/shared/ui/BottomNav';

interface StyleClass {
  root?: string;
}

interface Props {
  children: React.ReactNode;
  styleClass?: StyleClass;
  style?: ViewStyle;
}

/**
 * 페이지 레이아웃 컴포넌트. `flex-1 flex-col` 기본 구조를 제공합니다.
 *
 * - `Layout` — 루트 컨테이너 (flex-1)
 * - `Layout.Header` — 상단 영역
 * - `Layout.Body` — 콘텐츠 영역 (flex-1, 나머지 공간 차지)
 * - `Layout.Footer` — 하단 영역
 * - `Layout.BottomNav` — 하단 탭 네비게이션
 *
 * @example
 * ```tsx
 * <Layout>
 *   <Header title="홈" />
 *   <Layout.Body>
 *     <Text>본문</Text>
 *   </Layout.Body>
 *   <Layout.BottomNav items={NAV_ITEMS} activeRoute={route.name} onPress={navigate} />
 * </Layout>
 * ```
 */
function Layout({ children, styleClass, style }: Props) {
  return (
    <View className={cn('flex-1 flex-col', styleClass?.root)} style={style}>
      {children}
    </View>
  );
}

Layout.Header = function LayoutHeader({ children, styleClass, style }: Props) {
  return (
    <View className={cn('', styleClass?.root)} style={style}>
      {children}
    </View>
  );
};

Layout.Body = function LayoutBody({ children, styleClass }: Props) {
  return (
    <View
      className={cn('flex-1 px-5', styleClass?.root)}
      style={Platform.OS === 'android' ? { paddingBottom: 16 } : undefined}
    >
      {children}
    </View>
  );
};

Layout.Footer = function LayoutFooter({ children, styleClass }: Props) {
  return (
    <View className={cn('', styleClass?.root)}>
      {children}
    </View>
  );
};

interface BottomNavProps {
  items: BottomNavItem[];
  activeRoute: string;
  onPress: (name: string) => void;
}

Layout.BottomNav = function LayoutBottomNav({ items, activeRoute, onPress }: BottomNavProps) {
  return <BottomNav items={items} activeRoute={activeRoute} onPress={onPress} />;
};

export default Layout;
