import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # QRIcon
 * ---
 * - 간단설명: 하단 탭 네비게이션에 사용되는 QR 스캔 아이콘
 * - 제약사항 및 특이사항: stroke 기반, viewBox 20x20
 * ---
 * @param size 아이콘 크기 (기본값: 24)
 * @param color 아이콘 색상 (기본값: #1A1A1A)
 * ---
 * @example
 * <QRIcon size={22} color="#8C39FB" />
 */
export default function QRIcon({ size = 24, color = '#1A1A1A' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M7.33333 2H3.77778C2.79594 2 2 2.79594 2 3.77778V7.33333M7.33333 18H3.77778C2.79594 18 2 17.2041 2 16.2222V12.6667M12.6667 2H16.2222C17.2041 2 18 2.79594 18 3.77778V7.33333M18 12.6667V16.2222C18 17.2041 17.2041 18 16.2222 18H12.6667M2 10.0002H18"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}
