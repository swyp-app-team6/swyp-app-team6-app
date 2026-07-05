import React from 'react';
import Svg, { Rect, G, ClipPath, Defs } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # StorageIcon
 * ---
 * - 간단설명: 보관함 탭 아이콘 (카드 2장 겹친 형태)
 * - 제약사항 및 특이사항: Rect 기반, viewBox 20x20
 * ---
 * @param size 아이콘 크기 (기본 24)
 * @param color 아이콘 색상 (기본 #1A1A1A)
 * ---
 * @example
 * <StorageIcon size={22} color="#8C39FB" />
 */
export default function StorageIcon({ size = 24, color = '#1A1A1A' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <G clipPath="url(#clip_storage)">
        <Rect
          x={1.1781}
          y={4.64059}
          width={7.58}
          height={11.6364}
          rx={0.783333}
          transform="rotate(-11.1239 1.1781 4.64059)"
          fill="white"
          stroke={color}
          strokeWidth={1.4}
        />
        <Rect
          x={11.638}
          y={4.08114}
          width={8.56789}
          height={13.3465}
          rx={0.783333}
          transform="rotate(23.3059 11.638 4.08114)"
          fill="white"
          stroke={color}
          strokeWidth={1.4}
        />
      </G>
      <Defs>
        <ClipPath id="clip_storage">
          <Rect width={20} height={20} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
