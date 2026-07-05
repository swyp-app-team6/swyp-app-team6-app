import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # GalleryIcon
 * ---
 * - 간단설명: 사진보관함 아이콘 (사진 프레임 형태)
 * ---
 * @param size 아이콘 크기 (기본값: 24)
 * @param color 아이콘 색상 (기본값: #8C39FB)
 * ---
 * @example
 * <GalleryIcon size={24} color="#8C39FB" />
 */
export default function GalleryIcon({ size = 24, color = '#8C39FB' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8.15844 15.6002L11.9984 12.0002L14.5584 13.8002L18.1851 10.2002L21.3851 13.2002M2.39844 9.0002V19.8002H15.1984M10.0784 7.8002V7.70996M21.5984 15.2002V5.2002C21.5984 4.64791 21.1507 4.2002 20.5984 4.2002H7.23844C6.68615 4.2002 6.23844 4.64791 6.23844 5.2002V15.2002C6.23844 15.7525 6.68615 16.2002 7.23844 16.2002H20.5984C21.1507 16.2002 21.5984 15.7525 21.5984 15.2002Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
