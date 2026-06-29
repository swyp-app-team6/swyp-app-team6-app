import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # CameraIcon
 * ---
 * - 간단설명: 카메라 형태의 아이콘 (촬영/업로드 용도)
 * ---
 * @param size 아이콘 크기 (기본값: 24)
 * @param color 아이콘 색상 (기본값: #8C39FB)
 * ---
 * @example
 * <CameraIcon size={24} color="#8C39FB" />
 */
export default function CameraIcon({ size = 24, color = '#8C39FB' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M14.5 4h-5L7 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2.5-3z"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx={12}
        cy={13}
        r={3}
        stroke={color}
        strokeWidth={1.8}
      />
    </Svg>
  );
}
