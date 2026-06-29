import React from 'react';
import { Text, View } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface StyleClass {
  root?: string;
  icon?: string;
  message?: string;
}

interface Props {
  message: string;
  icon?: React.ReactNode;
  styleClass?: StyleClass;
}

/**
 * # SearchFallbackView
 * ---
 * - 간단설명: 검색 결과 없음 등 빈 상태를 표시하는 폴백 뷰
 * - 제약사항 및 특이사항:
 *   - 아이콘은 선택적으로 메시지 위에 표시
 * ---
 * @param message 표시할 안내 메시지
 * @param icon 메시지 위에 표시할 아이콘 (선택)
 * ---
 * @example
 * ```tsx
 * <SearchFallbackView message="검색 결과가 없습니다" />
 * ```
 */
export function SearchFallbackView({ message, icon, styleClass }: Props) {
  return (
    <View className={cn('items-center justify-center', styleClass?.root)}>
      {icon && (
        <View className={cn('mb-2', styleClass?.icon)}>
          {icon}
        </View>
      )}
      <Text className={cn('text-gray-500', styleClass?.message)}>{message}</Text>
    </View>
  );
}
