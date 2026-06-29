import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # BellIcon
 * ---
 * - 간단설명: 알림 종 모양 아이콘 (PUSH 알림 권한 안내 용도)
 * ---
 * @param size 아이콘 크기 (기본값: 24)
 * @param color 아이콘 색상 (기본값: #8C39FB)
 * ---
 * @example
 * <BellIcon size={24} color="#8C39FB" />
 */
export default function BellIcon({ size = 24, color = '#8C39FB' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8A6 6 0 1 0 6 8c0 7-3 9-3 9h18s-3-2-3-9Z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
