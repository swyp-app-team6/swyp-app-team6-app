import React from 'react';
import Svg, { Path, G } from 'react-native-svg';
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
  if (filled) {
    const fillColor = color ?? '#EF4559';
    return (
      <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.17115 5.17232C3.92126 4.42244 4.93849 4.00118 5.99914 4.00118C7.0598 4.00118 8.07703 4.42244 8.82714 5.17232L9.99914 6.34332L11.1711 5.17232C11.5401 4.79028 11.9815 4.48555 12.4695 4.27592C12.9575 4.06628 13.4824 3.95594 14.0135 3.95132C14.5447 3.94671 15.0714 4.04791 15.563 4.24904C16.0545 4.45016 16.5012 4.74717 16.8767 5.12274C17.2523 5.49832 17.5493 5.94492 17.7504 6.43651C17.9516 6.92809 18.0528 7.45481 18.0481 7.98593C18.0435 8.51705 17.9332 9.04193 17.7235 9.52994C17.5139 10.018 17.2092 10.4593 16.8271 10.8283L9.99914 17.6573L3.17115 10.8283C2.42126 10.0782 2 9.06098 2 8.00032C2 6.93967 2.42126 5.92244 3.17115 5.17232Z"
          fill={fillColor}
        />
      </Svg>
    );
  }

  const strokeColor = color ?? '#BFBFBF';
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <G transform="translate(1.5, 2.5)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.67115 1.72115C2.42126 0.971268 3.43849 0.550007 4.49914 0.550007C5.5598 0.550007 6.57703 0.971268 7.32714 1.72115L8.49914 2.89215L9.67114 1.72115C10.0401 1.33911 10.4815 1.03438 10.9695 0.824747C11.4575 0.615111 11.9824 0.504766 12.5135 0.500151C13.0447 0.495536 13.5714 0.596743 14.063 0.797866C14.5545 0.99899 15.0012 1.296 15.3767 1.67157C15.7523 2.04714 16.0493 2.49375 16.2504 2.98534C16.4516 3.47692 16.5528 4.00364 16.5481 4.53476C16.5435 5.06587 16.4332 5.59076 16.2235 6.07877C16.0139 6.56679 15.7092 7.00817 15.3271 7.37715L8.49914 14.2062L1.67115 7.37715C0.921261 6.62704 0.5 5.60981 0.5 4.54915C0.5 3.4885 0.921261 2.47126 1.67115 1.72115V1.72115Z"
          stroke={strokeColor}
          strokeLinejoin="round"
        />
      </G>
    </Svg>
  );
}
