import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # FlipIcon
 * ---
 * - 간단설명: 카드 뒤집기 아이콘 (회전 화살표 형태)
 * ---
 * @param size 아이콘 크기 (기본값: 20)
 * @param color 아이콘 색상 (기본값: #888888)
 * ---
 * @example
 * <FlipIcon size={20} color="#888888" />
 */
export default function FlipIcon({ size = 20, color = '#888888' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M16.1851 6.67792C15.0268 4.67833 12.8619 3.33301 10.3823 3.33301C7.57094 3.33301 5.16405 5.06247 4.17028 7.51414M14.1505 7.51414H17.5V4.16923M4.64823 13.3677C5.80651 15.3673 7.97144 16.7126 10.451 16.7126C13.2624 16.7126 15.6693 14.9832 16.6631 12.5315M6.68283 12.5315H3.33333V15.8764"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
