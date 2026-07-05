import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { DirectionalIconProps } from './types';

/** 방향별 회전 각도 매핑 (기본 SVG는 왼쪽 방향) */
const ROTATION: Record<string, string> = {
  left: '0deg',
  up: '90deg',
  right: '180deg',
  down: '270deg',
};

/**
 * # ArrowIcon
 * ---
 * - 간단설명: 공용 화살표 아이콘 (방향 변경 가능)
 * - 제약사항 및 특이사항: direction으로 상하좌우 방향 전환
 * ---
 * @param size 아이콘 크기 (기본값: 24)
 * @param color 아이콘 색상 (기본값: #111111)
 * @param direction 화살표 방향 (기본값: left)
 * ---
 * @example
 * <ArrowIcon size={24} direction="left" />
 * <ArrowIcon size={16} color="#888888" direction="right" />
 */
export default function ArrowIcon({ size = 24, color = '#111111', direction = 'left' }: DirectionalIconProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ transform: [{ rotate: ROTATION[direction] }] }}
    >
      <Path
        d="M15 18L9 12L15 6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="square"
      />
    </Svg>
  );
}
