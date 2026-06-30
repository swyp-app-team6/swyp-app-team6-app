import React from 'react';
import { View } from 'react-native';
import useSafePaddingBottom from '@/shared/utils/useSafePaddingBottom';
import { cn } from '@/shared/lib/cn';

interface Props {
  children: React.ReactNode;
  styleClass?: { root?: string };
}

/**
 * # BottomCTA
 * ---
 * - 간단설명: 화면 하단에 고정되는 CTA 버튼 래퍼
 * - 제약사항 및 특이사항:
 *   - SafeArea 하단 여백을 자동 처리
 *   - children으로 Button 컴포넌트를 전달하여 사용
 * ---
 * @param children CTA 버튼 요소
 * ---
 * @example
 * ```tsx
 * <BottomCTA>
 *   <Button title="다음" variant="primary" onPress={handleNext} />
 * </BottomCTA>
 * ```
 */
export default function BottomCTA({ children, styleClass }: Props) {
  const safePadding = useSafePaddingBottom();

  return (
    <View
      className={cn('bg-white px-5 pt-3 border-t border-gray-100', styleClass?.root)}
      style={{ paddingBottom: Math.max(safePadding.paddingBottom, 16) }}
    >
      {children}
    </View>
  );
}
