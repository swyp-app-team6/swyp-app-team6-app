import React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import type { IconProps } from './types';

/** 돋보기 형태의 Search 아이콘 */
export default function SearchIcon({ size = 24, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="10.5" cy="10.5" r="6.5" stroke={color} strokeWidth="1.8" />
      <Path d="M15.5 15.5L21 21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </Svg>
  );
}
