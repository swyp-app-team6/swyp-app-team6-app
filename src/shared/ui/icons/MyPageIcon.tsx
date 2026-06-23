import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import type { IconProps } from './types';

/** 마이페이지 탭 아이콘 */
export default function MyPageIcon({ size = 24, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.8" />
      <Path
        d="M4 21c0-3.314 3.582-6 8-6s8 2.686 8 6"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </Svg>
  );
}
