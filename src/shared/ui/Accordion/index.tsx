import React, { createContext, useCallback, useContext, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { cn } from '@/shared/lib/cn';

interface AccordionContextValue {
  multiple: boolean;
  openItems: Set<string>;
  toggle: (key: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion.Item은 Accordion.Root 내부에서 사용해야 합니다.');
  return ctx;
}

interface RootProps {
  /** 동시에 여러 항목 열기 허용. 기본값: false */
  multiple?: boolean;
  children: React.ReactNode;
  styleClass?: { root?: string };
}

interface ItemProps {
  /** 항목 고유 식별 키 */
  itemKey: string;
  /** 헤더에 표시할 제목 */
  title: string;
  children: React.ReactNode;
  /** 기본 열림 상태 */
  defaultOpen?: boolean;
  styleClass?: { root?: string; header?: string; content?: string };
}

/**
 * # Accordion
 * ---
 * - 간단설명: 접기/펼치기 아코디언 UI 컴포넌트
 * - 제약사항 및 특이사항:
 *   - Accordion.Root > Accordion.Item 구조로 사용
 *   - multiple=false 시 하나만 열림 (기본)
 *   - 높이 애니메이션은 opacity 전환으로 처리
 * ---
 * @example
 * ```tsx
 * <Accordion.Root>
 *   <Accordion.Item itemKey="faq1" title="자주 묻는 질문 1">
 *     <Text>답변 내용 1</Text>
 *   </Accordion.Item>
 *   <Accordion.Item itemKey="faq2" title="자주 묻는 질문 2">
 *     <Text>답변 내용 2</Text>
 *   </Accordion.Item>
 * </Accordion.Root>
 * ```
 */
function Root({ multiple = false, children, styleClass }: RootProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggle = useCallback(
    (key: string) => {
      setOpenItems(prev => {
        const next = new Set(prev);
        if (next.has(key)) {
          next.delete(key);
        } else {
          if (!multiple) next.clear();
          next.add(key);
        }
        return next;
      });
    },
    [multiple],
  );

  return (
    <AccordionContext.Provider value={{ multiple, openItems, toggle }}>
      <View className={cn(styleClass?.root)}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
}

/**
 * # Accordion.Item
 * ---
 * - 간단설명: 아코디언 개별 항목
 * ---
 * @param itemKey 항목 고유 키
 * @param title 헤더 제목
 * @param children 펼침 시 표시할 컨텐츠
 * @param defaultOpen 기본 열림 상태
 */
function Item({ itemKey, title, children, defaultOpen, styleClass }: ItemProps) {
  const { openItems, toggle } = useAccordionContext();
  const isOpen = openItems.has(itemKey);

  React.useEffect(() => {
    if (defaultOpen) toggle(itemKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const opacity = useSharedValue(isOpen ? 1 : 0);

  React.useEffect(() => {
    opacity.value = withTiming(isOpen ? 1 : 0, {
      duration: 200,
      easing: Easing.out(Easing.ease),
    });
  }, [isOpen, opacity]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className={cn('border-b border-gray-200', styleClass?.root)}>
      <Pressable
        onPress={() => toggle(itemKey)}
        className={cn(
          'flex-row items-center justify-between px-4 py-3.5',
          styleClass?.header,
        )}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Text className="flex-1 text-base font-medium text-gray-900">{title}</Text>
        <Text className="text-gray-400">{isOpen ? '▲' : '▼'}</Text>
      </Pressable>
      {isOpen && (
        <Animated.View
          style={animStyle}
          className={cn('px-4 pb-4', styleClass?.content)}
        >
          {children}
        </Animated.View>
      )}
    </View>
  );
}

const Accordion = { Root, Item };

export default Accordion;
