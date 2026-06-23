import React from 'react';
import Svg, { Rect, Line } from 'react-native-svg';
import type { IconProps } from './types';

/** 프로필카드 탭 아이콘 */
export default function CardIcon({ size = 24, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="4" width="20" height="16" rx="3" stroke={color} strokeWidth="1.8" />
      <Line x1="7" y1="10" x2="17" y2="10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
      <Line x1="7" y1="14" x2="13" y2="14" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}
