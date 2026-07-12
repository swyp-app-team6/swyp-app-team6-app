import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # HomeIcon
 * ---
 * - 간단설명: 하단 탭 네비게이션 홈 아이콘 (집 모양)
 * - 제약사항 및 특이사항: fill + stroke 기반, viewBox 20x20
 * ---
 * @param size 아이콘 크기 (기본값: 24)
 * @param color 아이콘 색상 (기본값: #1A1A1A)
 * ---
 * @example
 * <HomeIcon size={22} color="#8C39FB" />
 */
export default function HomeIcon({ size = 24, color = '#1A1A1A' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.54793 1.83834C9.80568 1.60923 10.1941 1.60923 10.4518 1.83834L18.1049 8.64109C18.2502 8.77018 18.3333 8.95522 18.3333 9.14954V17.653C18.3333 18.0287 18.0287 18.3333 17.653 18.3333H12.5509C12.1752 18.3333 11.8706 18.0287 11.8706 17.653V13.4013C11.8706 12.3314 11.0698 11.5305 9.99988 11.5305C8.93 11.5305 8.12912 12.3314 8.12912 13.4013V17.6529C8.12912 18.0286 7.82455 18.3333 7.44885 18.3333H2.34678C1.97107 18.3333 1.6665 18.0287 1.6665 17.653V9.14954C1.6665 8.95522 1.7496 8.77018 1.89483 8.64109L9.54793 1.83834ZM6.76857 16.9723V13.4013C6.76857 11.58 8.17859 10.1699 9.99988 10.1699C11.8212 10.1699 13.2312 11.58 13.2312 13.4013V16.9727H16.9727V9.45502L9.99988 3.25696L3.02706 9.45502V16.9727L6.76857 16.9723Z"
        fill={color}
        stroke={color}
        strokeWidth={0.2}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
