import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '@/shared/lib/cn';

/** 하단 네비게이션 탭 아이템 */
export interface BottomNavItem {
  /** React Navigation 라우트 이름 */
  name: string;
  /** 탭 하단 표시 텍스트 */
  label: string;
  /** 탭 아이콘. SVG 컴포넌트 또는 ReactNode를 받습니다. active 상태에 따라 color를 다르게 넘기세요. */
  icon: (active: boolean) => React.ReactNode;
}

/**
 * 하단 고정 탭 네비게이션 컴포넌트.
 * iOS 홈 버튼 영역(safe area)을 자동으로 처리합니다.
 *
 * @example
 * ```tsx
 * <BottomNav
 *   items={[{ name: 'Home', label: '홈', icon: '🏠' }]}
 *   activeRoute={route.name}
 *   onPress={(name) => navigation.navigate(name)}
 * />
 * ```
 */
interface Props {
  items: BottomNavItem[];
  /** 현재 활성화된 라우트 이름. 일치하는 탭을 강조 표시 */
  activeRoute: string;
  /** 탭 탭 시 호출. 라우트 이름을 인자로 전달 */
  onPress: (name: string) => void;
}

export default function BottomNav({ items, activeRoute, onPress }: Props) {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      className="flex-row bg-white border-t border-gray-100"
      style={{ paddingBottom: bottom || 8 }}
    >
      {items.map((item) => {
        const isActive = activeRoute === item.name;
        return (
          <TouchableOpacity
            key={item.name}
            className="flex-1 items-center pt-2 pb-1"
            onPress={() => onPress(item.name)}
            activeOpacity={0.7}
          >
            {item.icon(isActive)}
            <Text className={cn('text-xs mt-0.5', isActive ? 'text-blue-500 font-semibold' : 'text-gray-400')}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
