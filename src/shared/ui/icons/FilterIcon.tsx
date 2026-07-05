import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # FilterIcon
 * ---
 * - 간단설명: 보관함 필터 아이콘 (3줄 수평 필터 형태)
 * ---
 * @param size 아이콘 크기 (기본값: 20)
 * @param color 아이콘 색상 (기본값: #888888)
 * ---
 * @example
 * <FilterIcon size={20} color="#8C39FB" />
 */
export default function FilterIcon({ size = 20, color = '#888888' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M5.38331 10.0007H14.6141M3.33203 5.83398H16.6654M8.46024 14.1673H11.5372"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
