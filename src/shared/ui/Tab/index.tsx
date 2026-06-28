import React, { createContext, useContext, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface TabContextValue {
  activeValue: string;
  onChange: (value: string) => void;
}

const TabContext = createContext<TabContextValue | null>(null);

function useTabContext() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error('Tab 컴포넌트는 Tab.Root 내부에서 사용해야 합니다.');
  return ctx;
}

interface RootProps {
  /** 기본 활성 탭 값 (비제어) */
  defaultValue?: string;
  /** 활성 탭 값 (제어) */
  value?: string;
  /** 탭 변경 콜백 */
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  styleClass?: { root?: string };
}

interface ListProps {
  children: React.ReactNode;
  styleClass?: { root?: string };
}

interface TriggerProps {
  /** 이 트리거가 활성화할 탭 값 */
  value: string;
  /** 탭 레이블 */
  label: string;
  styleClass?: { root?: string; label?: string; active?: string };
}

interface ContentProps {
  /** 이 컨텐츠가 표시될 탭 값 */
  value: string;
  children: React.ReactNode;
  styleClass?: { root?: string };
}

/**
 * # Tab
 * ---
 * - 간단설명: 네이티브 탭 전환 컴포넌트 (Compound Component 패턴)
 * - 제약사항 및 특이사항:
 *   - Tab.Root > Tab.List + Tab.Content 구조로 사용
 *   - 제어/비제어 모드 모두 지원
 * ---
 * @example
 * ```tsx
 * <Tab.Root defaultValue="tab1">
 *   <Tab.List>
 *     <Tab.Trigger value="tab1" label="첫 번째" />
 *     <Tab.Trigger value="tab2" label="두 번째" />
 *   </Tab.List>
 *   <Tab.Content value="tab1">
 *     <Text>첫 번째 탭 내용</Text>
 *   </Tab.Content>
 *   <Tab.Content value="tab2">
 *     <Text>두 번째 탭 내용</Text>
 *   </Tab.Content>
 * </Tab.Root>
 * ```
 */
function Root({ defaultValue, value, onValueChange, children, styleClass }: RootProps) {
  const [internal, setInternal] = useState(defaultValue ?? '');
  const activeValue = value ?? internal;
  const onChange = (v: string) => {
    onValueChange?.(v);
    if (value === undefined) setInternal(v);
  };

  return (
    <TabContext.Provider value={{ activeValue, onChange }}>
      <View className={cn('flex-1', styleClass?.root)}>
        {children}
      </View>
    </TabContext.Provider>
  );
}

/**
 * # Tab.List
 * ---
 * - 간단설명: 탭 트리거 목록 컨테이너
 */
function List({ children, styleClass }: ListProps) {
  return (
    <View
      className={cn(
        'flex-row border-b border-gray-200',
        styleClass?.root,
      )}
    >
      {children}
    </View>
  );
}

/**
 * # Tab.Trigger
 * ---
 * - 간단설명: 개별 탭 버튼
 * ---
 * @param value 탭 값
 * @param label 탭 레이블
 */
function Trigger({ value, label, styleClass }: TriggerProps) {
  const { activeValue, onChange } = useTabContext();
  const isActive = activeValue === value;

  return (
    <Pressable
      onPress={() => onChange(value)}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive }}
      className={cn(
        'flex-1 items-center py-3',
        isActive ? 'border-b-2 border-primary' : '',
        styleClass?.root,
        isActive ? styleClass?.active : '',
      )}
    >
      <Text
        className={cn(
          'text-sm font-medium',
          isActive ? 'text-primary' : 'text-gray-500',
          styleClass?.label,
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}

/**
 * # Tab.Content
 * ---
 * - 간단설명: 탭 컨텐츠 영역 (활성 탭일 때만 렌더링)
 * ---
 * @param value 탭 값
 * @param children 탭 컨텐츠
 */
function Content({ value, children, styleClass }: ContentProps) {
  const { activeValue } = useTabContext();
  if (activeValue !== value) return null;

  return (
    <View className={cn('flex-1', styleClass?.root)}>
      {children}
    </View>
  );
}

const Tab = { Root, List, Trigger, Content };

export default Tab;
