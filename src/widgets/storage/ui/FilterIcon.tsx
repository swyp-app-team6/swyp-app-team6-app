import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from '@/shared/ui/icons/types';

/**
 * # FilterIcon
 * ---
 * - 간단설명: 보관함 필터 아이콘 (3줄 수평 필터 형태)
 * ---
 * @param size 아이콘 크기 (기본값: 20)
 * @param color 아이콘 색상 (기본값: #8C39FB)
 */
export default function FilterIcon({ size = 20, color = '#8C39FB' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M3.33 5.83h13.34M5.83 10h8.34M8.33 14.17h3.34"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
