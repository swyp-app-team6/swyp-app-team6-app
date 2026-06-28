import React from 'react';
import { View, ViewStyle } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface StyleClass {
  root?: string;
}

interface Props {
  children: React.ReactNode;
  styleClass?: StyleClass;
  style?: ViewStyle;
}

/**
 * 라운드 카드 컴포넌트. 흰 배경 + rounded-2xl 기본 스타일.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Text className="font-semibold">제목</Text>
 *   <Text className="text-sm text-gray-500">내용</Text>
 * </Card>
 *
 * <Card styleClass={{ root: 'bg-primary-lightest p-6' }}>
 *   <Text>커스텀 카드</Text>
 * </Card>
 * ```
 */
export default function Card({ children, styleClass, style }: Props) {
  return (
    <View
      className={cn('bg-white rounded-2xl p-4', styleClass?.root)}
      style={style}
    >
      {children}
    </View>
  );
}
