import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # SearchIcon
 * ---
 * - 간단설명: 돋보기 형태의 검색 아이콘
 * - 제약사항 및 특이사항: stroke 기반, 24x24 viewBox
 * ---
 * @param size 아이콘 크기 (기본값: 24)
 * @param color 아이콘 색상 (기본값: #8C39FB)
 * ---
 * @example
 * <SearchIcon size={20} color="#8C39FB" />
 */
export default function SearchIcon({ size = 24, color = '#8C39FB' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16.9284 17.0396L20.4016 20.3996M19.2816 11.4396C19.2816 15.7695 15.7715 19.2796 11.4416 19.2796C7.11165 19.2796 3.60156 15.7695 3.60156 11.4396C3.60156 7.1097 7.11165 3.59961 11.4416 3.59961C15.7715 3.59961 19.2816 7.1097 19.2816 11.4396Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
