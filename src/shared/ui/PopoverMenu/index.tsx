import React, { useCallback, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  Text,
  View,
  type LayoutRectangle,
} from 'react-native';
import { cn } from '@/shared/lib/cn';

/** 팝오버 메뉴 항목 */
export interface PopoverMenuItem {
  /** 메뉴 레이블 */
  label: string;
  /** 터치 콜백 — 호출 후 메뉴 자동 닫힘 */
  onPress: () => void;
  /** 왼쪽 아이콘 */
  icon?: React.ReactNode;
  /** 위험 액션 여부 (빨간색 텍스트) */
  destructive?: boolean;
}

export interface PopoverMenuProps {
  /** 메뉴 항목 배열 */
  items: PopoverMenuItem[];
  /** 트리거 버튼 렌더링 */
  children: React.ReactNode;
  /** 메뉴 최소 너비. 기본값: 140 */
  minWidth?: number;
  /** 메뉴 정렬 방향. 기본값: 'right' */
  align?: 'left' | 'right';
  styleClass?: { menu?: string; item?: string };
}

/**
 * # PopoverMenu
 * ---
 * - 간단설명: 버튼 클릭 시 해당 위치에 드롭다운 메뉴를 표시하는 팝오버 컴포넌트
 * - 제약사항 및 특이사항:
 *   - children을 트리거 버튼으로 사용
 *   - 트리거 버튼 하단에 메뉴가 나타남
 *   - 배경 탭 시 자동 닫힘
 *   - 메뉴 항목 선택 시 자동 닫힘
 * ---
 * @param items 메뉴 항목 배열
 * @param children 트리거 버튼 렌더링
 * @param minWidth 메뉴 최소 너비
 * @param align 메뉴 정렬 방향 ('left' | 'right')
 * ---
 * @example
 * ```tsx
 * <PopoverMenu
 *   items={[
 *     { label: '수정', onPress: handleEdit },
 *     { label: '삭제', onPress: handleDelete, destructive: true },
 *   ]}
 * >
 *   <Text>⋮</Text>
 * </PopoverMenu>
 * ```
 */
export default function PopoverMenu({
  items,
  children,
  minWidth = 140,
  align = 'right',
  styleClass,
}: PopoverMenuProps) {
  const [visible, setVisible] = useState(false);
  const [anchor, setAnchor] = useState<LayoutRectangle & { px: number; py: number }>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    px: 0,
    py: 0,
  });
  const triggerRef = useRef<View>(null);

  const open = useCallback(() => {
    triggerRef.current?.measureInWindow((px, py, width, height) => {
      setAnchor({ x: 0, y: 0, width, height, px, py });
      setVisible(true);
    });
  }, []);

  const close = useCallback(() => setVisible(false), []);

  const handleItemPress = useCallback(
    (onPress: () => void) => {
      close();
      onPress();
    },
    [close],
  );

  const menuLeft = align === 'right' ? anchor.px + anchor.width - minWidth : anchor.px;

  return (
    <>
      <Pressable ref={triggerRef} onPress={open}>
        {children}
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={close}
      >
        <Pressable className="flex-1" onPress={close}>
          <View
            className={cn(
              'rounded-xl bg-white py-1',
              styleClass?.menu,
            )}
            style={{
              position: 'absolute',
              top: anchor.py + anchor.height + 4,
              left: menuLeft,
              minWidth,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            {items.map((item, idx) => (
              <Pressable
                key={item.label}
                onPress={() => handleItemPress(item.onPress)}
                className={cn(
                  'flex-row items-center px-4 py-3 active:bg-gray-50',
                  idx < items.length - 1 ? 'border-b border-gray-100' : undefined,
                  styleClass?.item,
                )}
              >
                {item.icon && <View className="mr-3">{item.icon}</View>}
                <Text
                  className={cn(
                    'text-sm font-medium',
                    item.destructive ? 'text-red-500' : 'text-gray-900',
                  )}
                >
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
