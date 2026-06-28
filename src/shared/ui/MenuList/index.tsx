import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface SectionProps {
  /** 섹션 제목 */
  title?: string;
  children: React.ReactNode;
  styleClass?: { root?: string; title?: string };
}

interface ItemProps {
  /** 메뉴 항목 레이블 */
  label: string;
  /** 터치 콜백 */
  onPress?: () => void;
  /** 왼쪽 아이콘 */
  icon?: React.ReactNode;
  /** 오른쪽 슬롯 (화살표, 값 표시 등) */
  right?: React.ReactNode;
  /** 구분선 표시 여부. 기본값: true */
  showDivider?: boolean;
  styleClass?: { root?: string; label?: string };
}

/**
 * # MenuList
 * ---
 * - 간단설명: 설정/마이페이지용 섹션형 메뉴 목록
 * - 제약사항 및 특이사항:
 *   - MenuList.Section > MenuList.Item 구조로 사용
 *   - 섹션 간 회색 간격, 섹션 내부는 흰색 배경
 * ---
 * @example
 * ```tsx
 * <MenuList.Section title="계정">
 *   <MenuList.Item label="프로필 수정" onPress={goProfile} right={<Text>›</Text>} />
 *   <MenuList.Item label="비밀번호 변경" onPress={goPassword} right={<Text>›</Text>} />
 * </MenuList.Section>
 *
 * <MenuList.Section title="앱 설정">
 *   <MenuList.Item label="알림 설정" onPress={goNotification} right={<Text>›</Text>} />
 * </MenuList.Section>
 * ```
 */
function Section({ title, children, styleClass }: SectionProps) {
  return (
    <View className={cn('mb-2', styleClass?.root)}>
      {title && (
        <Text
          className={cn(
            'px-4 py-2 text-xs font-semibold uppercase text-gray-500',
            styleClass?.title,
          )}
        >
          {title}
        </Text>
      )}
      <View className="bg-white rounded-xl overflow-hidden">
        {children}
      </View>
    </View>
  );
}

/**
 * # MenuList.Item
 * ---
 * - 간단설명: 메뉴 목록의 개별 항목
 * ---
 * @param label 메뉴 레이블
 * @param onPress 터치 콜백
 * @param icon 왼쪽 아이콘
 * @param right 오른쪽 슬롯
 */
function Item({ label, onPress, icon, right, showDivider = true, styleClass }: ItemProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className={cn(
        'flex-row items-center px-4 py-3.5',
        showDivider ? 'border-b border-gray-100' : '',
        onPress && 'active:bg-gray-50',
        styleClass?.root,
      )}
    >
      {icon && <View className="mr-3">{icon}</View>}
      <Text className={cn('flex-1 text-base text-gray-900', styleClass?.label)}>
        {label}
      </Text>
      {right && <View className="ml-2">{right}</View>}
    </Pressable>
  );
}

const MenuList = { Section, Item };

export default MenuList;
