import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

interface HeartIconProps extends IconProps {
  /** true면 채워진 하트, false면 외곽선만 */
  filled?: boolean;
}

/**
 * # HeartIcon
 * ---
 * - 간단설명: 하트 형태의 좋아요 아이콘 (채움/외곽선 토글 지원)
 * - 제약사항 및 특이사항:
 *   - filled=true: 빨간색(#EF4559) 채움
 *   - filled=false: 회색(#BFBFBF) 외곽선
 * ---
 * @param size 아이콘 크기 (기본 20)
 * @param color 아이콘 색상 (기본: filled에 따라 자동)
 * @param filled 채움 여부 (기본 false)
 * ---
 * @example
 * <HeartIcon filled />
 * <HeartIcon filled={false} />
 */
export default function HeartIcon({ size = 20, color, filled = false }: HeartIconProps) {
  const fillColor = color ?? (filled ? '#EF4559' : 'none');
  const strokeColor = color ?? (filled ? '#EF4559' : '#BFBFBF');

  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 17.5C10 17.5 2.5 13 2.5 7.5C2.5 5.5 4 3.5 6.25 3.5C8 3.5 9.5 4.5 10 5.5C10.5 4.5 12 3.5 13.75 3.5C16 3.5 17.5 5.5 17.5 7.5C17.5 13 10 17.5 10 17.5Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
