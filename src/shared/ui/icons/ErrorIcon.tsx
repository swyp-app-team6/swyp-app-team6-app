import React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # ErrorIcon
 * ---
 * - 간단설명: 삼각형 경고 아이콘 (에러 다이얼로그용)
 * - 제약사항 및 특이사항:
 *   - 기본 크기: 80, 기본 색상: #BFBFBF
 *   - 내부 느낌표는 흰색 고정
 * ---
 * @param size 아이콘 크기 (기본 80)
 * @param color 삼각형 배경 색상 (기본 #BFBFBF)
 * ---
 * @example
 * ```tsx
 * <ErrorIcon />
 * <ErrorIcon size={60} color="#FF0000" />
 * ```
 */
export function ErrorIcon({ size = 80, color = '#BFBFBF' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Path
        d="M34.8038 9C37.1132 5 42.8868 5 45.1962 9L69.4449 51C71.7543 55 68.8675 60 64.2487 60H15.7513C11.1325 60 8.24573 55 10.5551 51L34.8038 9Z"
        fill={color}
      />
      <Path
        d="M40.0039 19C42.1684 19 43.9044 20.7895 43.8387 22.9531L43.3561 38.8448C43.3013 40.6489 41.823 42.083 40.0181 42.083C38.2154 42.083 36.7381 40.6524 36.6802 38.8507L36.1692 22.9599C36.0996 20.7938 37.8367 19 40.0039 19ZM40.0003 53C37.7737 53 35.9595 51.0109 36.0007 48.5129C35.9595 46.0612 37.7737 44.0721 40.0003 44.0721C42.1033 44.0721 44 46.0612 44 48.5129C44 51.0109 42.1033 53 40.0003 53Z"
        fill="white"
      />
    </Svg>
  );
}
