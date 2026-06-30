import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # ChevronDownIcon
 * ---
 * - 간단설명: 아래 방향 화살표 아이콘 (드롭다운/셀렉트 용도)
 * ---
 * @param size 아이콘 크기 (기본값: 24)
 * @param color 아이콘 색상 (기본값: #888888)
 * ---
 * @example
 * <ChevronDownIcon size={24} color="#888" />
 */
export default function ChevronDownIcon({ size = 24, color = '#888888' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9l6 6 6-6"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
