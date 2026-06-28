import React from 'react';
import Svg, { ClipPath, Defs, Path, Rect } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # KakaoIcon
 * ---
 * - 간단설명: 카카오 로그인 말풍선 아이콘
 * ---
 * @param size 아이콘 크기 (기본값: 18)
 * @param color 아이콘 색상 (기본값: black)
 * ---
 * @example
 * ```tsx
 * <KakaoIcon size={18} color="black" />
 * ```
 */
export default function KakaoIcon({ size = 18, color = 'black' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <Defs>
        <ClipPath id="kakao-clip">
          <Rect width={18} height={18} fill="white" />
        </ClipPath>
      </Defs>
      <Path
        opacity={0.902}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 0.944C4.29 0.944 0 4.73 0 7.933C0 10.333 1.558 12.45 3.931 13.708L2.933 17.374C2.844 17.699 3.213 17.957 3.496 17.77L7.873 14.865C8.242 14.901 8.618 14.922 9 14.922C13.97 14.922 18 11.793 18 7.933C18 4.73 13.97 0.944 9 0.944Z"
        fill={color}
        clipPath="url(#kakao-clip)"
      />
    </Svg>
  );
}
