import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # StorageIcon
 * ---
 * - 간단설명: 보관함 탭 아이콘 (카드 2장 겹친 형태)
 * - 제약사항 및 특이사항: Rect 기반, viewBox 24x24
 * ---
 * @param size 아이콘 크기 (기본 24)
 * @param color 아이콘 색상 (기본 #1A1A1A)
 * ---
 * @example
 * <StorageIcon size={22} color="#8C39FB" />
 */
export default function StorageIcon({ size = 24, color = '#1A1A1A' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect width={24} height={24} fill="white" />
      <Rect
        x={1.06069}
        y={3.81859}
        width={9.11212}
        height={14.0429}
        rx={0.883333}
        transform="rotate(-11.1239 1.06069 3.81859)"
        fill="white"
        stroke={color}
        strokeWidth={1.6}
      />
      <Rect
        x={13.738}
        y={3.17142}
        width={10.313}
        height={16.1216}
        rx={0.883333}
        transform="rotate(23.3059 13.738 3.17142)"
        fill="white"
        stroke={color}
        strokeWidth={1.6}
      />
    </Svg>
  );
}
