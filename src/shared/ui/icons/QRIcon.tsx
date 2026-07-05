import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # QRIcon
 * ---
 * - 간단설명: 하단 탭 네비게이션에 사용되는 QR 스캔 아이콘
 * - 제약사항 및 특이사항: stroke 기반, viewBox 18x18
 * ---
 * @param size 아이콘 크기 (기본값: 24)
 * @param color 아이콘 색상 (기본값: #1A1A1A)
 * ---
 * @example
 * <QRIcon size={22} color="#8C39FB" />
 */
export default function QRIcon({ size = 24, color = '#1A1A1A' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Path
        d="M6.33333 1H2.77778C1.79594 1 1 1.79594 1 2.77778V6.33333M6.33333 17H2.77778C1.79594 17 1 16.2041 1 15.2222V11.6667M11.6667 1H15.2222C16.2041 1 17 1.79594 17 2.77778V6.33333M17 11.6667V15.2222C17 16.2041 16.2041 17 15.2222 17H11.6667M1 9.00024H17"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}
