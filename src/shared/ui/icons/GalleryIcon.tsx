import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
import type { IconProps } from './types';

/** 사진 프레임 형태의 Gallery 탭 아이콘 */
export default function GalleryIcon({ size = 24, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.8" />
      <Circle cx="8.5" cy="8.5" r="1.5" fill={color} />
      <Path d="M3 16l5-5 4 4 3-3 6 6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
