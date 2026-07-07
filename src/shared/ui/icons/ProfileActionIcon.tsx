import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { OrientedIconProps } from './types';

/**
 * # ProfileActionIcon
 * ---
 * - 간단설명: 프로필 관련 처리 아이콘 (가로/세로 세 점)
 * - 제약사항 및 특이사항: orientation으로 가로/세로 전환, 비정사각 viewBox(16x4)
 * ---
 * @param size 아이콘 크기 (기본값: 16, 장축 기준)
 * @param color 아이콘 색상 (기본값: #1A1A1A)
 * @param orientation 방향 (기본값: horizontal)
 * ---
 * @example
 * <ProfileActionIcon size={16} orientation="horizontal" />
 * <ProfileActionIcon size={16} orientation="vertical" />
 */
export default function ProfileActionIcon({ size = 16, color = '#1A1A1A', orientation = 'horizontal' }: OrientedIconProps) {
  const isVertical = orientation === 'vertical';

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 4"
      fill="none"
      style={isVertical ? { transform: [{ rotate: '90deg' }] } : undefined}
    >
      <Path
        d="M4 2C4 3.10457 3.10457 4 2 4C0.895431 4 0 3.10457 0 2C0 0.895431 0.895431 0 2 0C3.10457 0 4 0.895431 4 2Z"
        fill={color}
      />
      <Path
        d="M10 2C10 3.10457 9.10457 4 8 4C6.89543 4 6 3.10457 6 2C6 0.895431 6.89543 0 8 0C9.10457 0 10 0.895431 10 2Z"
        fill={color}
      />
      <Path
        d="M16 2C16 3.10457 15.1046 4 14 4C12.8954 4 12 3.10457 12 2C12 0.895431 12.8954 0 14 0C15.1046 0 16 0.895431 16 2Z"
        fill={color}
      />
    </Svg>
  );
}
