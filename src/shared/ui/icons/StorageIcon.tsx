import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # StorageIcon
 * ---
 * - 간단설명: 보관함 탭 아이콘 (카드 2장 겹친 형태)
 * - 제약사항 및 특이사항: stroke 기반, 24x24 viewBox
 * ---
 * @param size 아이콘 크기 (기본 24)
 * @param color 아이콘 색상 (기본 #000)
 * ---
 * @example
 * <StorageIcon size={22} color="#8C39FB" />
 */
export default function StorageIcon({ size = 24, color = '#000' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 7V5.2C8 4.54 8 4.21 8.13 3.96C8.24 3.74 8.42 3.56 8.64 3.45C8.89 3.32 9.22 3.32 9.88 3.32H18.12C18.78 3.32 19.11 3.32 19.36 3.45C19.58 3.56 19.76 3.74 19.87 3.96C20 4.21 20 4.54 20 5.2V14.8C20 15.46 20 15.79 19.87 16.04C19.76 16.26 19.58 16.44 19.36 16.55C19.11 16.68 18.78 16.68 18.12 16.68H16.5"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 9.2C4 8.54 4 8.21 4.13 7.96C4.24 7.74 4.42 7.56 4.64 7.45C4.89 7.32 5.22 7.32 5.88 7.32H14.12C14.78 7.32 15.11 7.32 15.36 7.45C15.58 7.56 15.76 7.74 15.87 7.96C16 8.21 16 8.54 16 9.2V18.8C16 19.46 16 19.79 15.87 20.04C15.76 20.26 15.58 20.44 15.36 20.55C15.11 20.68 14.78 20.68 14.12 20.68H5.88C5.22 20.68 4.89 20.68 4.64 20.55C4.42 20.44 4.24 20.26 4.13 20.04C4 19.79 4 19.46 4 18.8V9.2Z"
        stroke={color}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
