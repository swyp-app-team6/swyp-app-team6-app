import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import useSafePaddingBottom from '@/shared/utils/useSafePaddingBottom';
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

interface StyleClass {
  root?: string;
  tab?: string;
  label?: string;
}

/**
 * # BottomNav
 * ---
 * - 간단설명: 하단 고정 탭 네비게이션 컴포넌트
 * - 제약사항 및 특이사항:
 *   - iOS 홈 버튼 영역(safe area) 자동 처리
 *   - 상단 드롭 쉐도우 적용
 *   - active 탭은 보라색, inactive 탭은 검정 텍스트
 * ---
 * @param items 탭 아이템 배열
 * @param activeRoute 현재 활성화된 라우트 이름
 * @param onPress 탭 터치 시 호출
 * ---
 * @example
 * ```tsx
 * <BottomNav
 *   items={[{ name: 'Home', label: '홈', icon: (active) => <HomeIcon active={active} /> }]}
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
  styleClass?: StyleClass;
}

export default function BottomNav({ items, activeRoute, onPress, styleClass }: Props) {
  const safePadding = useSafePaddingBottom();
  return (
    <View
      className={cn('flex-row bg-white', styleClass?.root)}
      style={[
        { height: 64 + safePadding.paddingBottom },
        Platform.select({
          ios: {
            shadowColor: 'rgba(84, 84, 84, 1)',
            shadowOffset: { width: 2, height: 0 },
            shadowOpacity: 0.05,
            shadowRadius: 15,
          },
          android: {
            elevation: 4,
          },
        }),
      ]}
    >
      {items.map((item) => {
        const isActive = activeRoute === item.name;
        return (
          <TouchableOpacity
            key={item.name}
            className={cn('flex-1 items-center', styleClass?.tab)}
            style={{
              paddingTop: 12,
              paddingBottom: 12 + safePadding.paddingBottom,
              gap: 4,
            }}
            onPress={() => onPress(item.name)}
            activeOpacity={0.7}
          >
            {item.icon(isActive)}
            <Text
              style={{
                fontSize: 12,
                fontWeight: isActive ? '600' : '500',
                lineHeight: 14,
                color: isActive ? '#742BD5' : '#1A1A1A',
                textAlign: 'center',
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
