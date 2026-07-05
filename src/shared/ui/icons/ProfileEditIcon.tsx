import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # ProfileEditIcon
 * ---
 * - 간단설명: 내 프로필카드 수정 아이콘 (연필 형태)
 * ---
 * @param size 아이콘 크기 (기본값: 24)
 * @param color 아이콘 색상 (기본값: #1A1A1A)
 * ---
 * @example
 * <ProfileEditIcon size={24} color="#1A1A1A" />
 */
export default function ProfileEditIcon({ size = 24, color = '#1A1A1A' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12.5381 19.2433L13.2804 18.4114C14.1911 17.3907 15.8252 17.5234 16.5593 18.6777C17.2432 19.753 18.729 19.9568 19.6772 19.1054L21.0227 17.8974M2.98047 19.4704L7.34645 18.5907C7.57823 18.544 7.79105 18.4298 7.95818 18.2626L17.7319 8.48356C18.2005 8.01471 18.2001 7.25472 17.7311 6.78626L15.6607 4.71818C15.1919 4.24991 14.4323 4.25023 13.9639 4.71889L4.18923 14.4989C4.02242 14.6658 3.90852 14.8782 3.86177 15.1095L2.98047 19.4704Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
