import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # ProfileCreatePlusIcon
 * ---
 * - 간단설명: 프로필 카드 없을 때 표시되는 원형 + 아이콘
 * - 제약사항 및 특이사항: 원형 배경(#F5EDFF) + 흰색 테두리 포함, 40x40 viewBox
 * ---
 * @param size 아이콘 크기 (기본값: 40)
 * @param color 십자 아이콘 색상 (기본값: #8C39FB)
 * ---
 * @example
 * <ProfileCreatePlusIcon size={40} />
 */
export default function ProfileCreatePlusIcon({ size = 40, color = '#8C39FB' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <Rect x={1} y={1} width={38} height={38} rx={19} fill="#F5EDFF" />
      <Rect x={1} y={1} width={38} height={38} rx={19} stroke="white" strokeWidth={2} />
      <Rect x={19} y={12} width={2} height={16} fill={color} />
      <Rect x={28} y={19} width={2} height={16} transform="rotate(90 28 19)" fill={color} />
    </Svg>
  );
}
