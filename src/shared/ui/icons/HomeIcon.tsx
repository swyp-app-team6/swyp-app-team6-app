import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/** 홈 탭 아이콘 */
export default function HomeIcon({ size = 24, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 10.5L12 3l9 7.5V21a1.5 1.5 0 01-1.5 1.5h-4.125a.375.375 0 01-.375-.375V16.5a3 3 0 00-6 0v5.625a.375.375 0 01-.375.375H4.5A1.5 1.5 0 013 21V10.5z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
