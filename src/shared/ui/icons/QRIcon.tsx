import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import type { IconProps } from './types';

/** QR 코드 형태의 탭 아이콘 */
export default function QRIcon({ size = 24, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" />
      <Rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" />
      <Rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="1.8" />
      <Rect x="5" y="5" width="3" height="3" fill={color} />
      <Rect x="16" y="5" width="3" height="3" fill={color} />
      <Rect x="5" y="16" width="3" height="3" fill={color} />
      <Path d="M14 14h2v2h-2zM16 16h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" fill={color} />
    </Svg>
  );
}
