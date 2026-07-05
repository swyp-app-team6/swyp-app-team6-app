import React from 'react';
import Svg, { Mask, Rect, G, Path } from 'react-native-svg';
import type { IconProps } from './types';

/**
 * # ProfileQRCodeIcon
 * ---
 * - 간단설명: 프로필카드 QR코드 모달 노출 아이콘
 * - 제약사항 및 특이사항: Mask 기반 fill 아이콘, nav QRIcon과 별도
 * ---
 * @param size 아이콘 크기 (기본값: 24)
 * @param color 아이콘 색상 (기본값: white)
 * ---
 * @example
 * <ProfileQRCodeIcon size={24} color="#FFFFFF" />
 */
export default function ProfileQRCodeIcon({ size = 24, color = 'white' }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Mask id="mask_qr" maskType="alpha" maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}>
        <Rect width={24} height={24} fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask_qr)">
        <Path
          d="M3 10V4C3 3.71667 3.09583 3.47917 3.2875 3.2875C3.47917 3.09583 3.71667 3 4 3H10C10.2833 3 10.5208 3.09583 10.7125 3.2875C10.9042 3.47917 11 3.71667 11 4V10C11 10.2833 10.9042 10.5208 10.7125 10.7125C10.5208 10.9042 10.2833 11 10 11H4C3.71667 11 3.47917 10.9042 3.2875 10.7125C3.09583 10.5208 3 10.2833 3 10ZM5 9H9V5H5V9ZM3 20V14C3 13.7167 3.09583 13.4792 3.2875 13.2875C3.47917 13.0958 3.71667 13 4 13H10C10.2833 13 10.5208 13.0958 10.7125 13.2875C10.9042 13.4792 11 13.7167 11 14V20C11 20.2833 10.9042 20.5208 10.7125 20.7125C10.5208 20.9042 10.2833 21 10 21H4C3.71667 21 3.47917 20.9042 3.2875 20.7125C3.09583 20.5208 3 20.2833 3 20ZM5 19H9V15H5V19ZM13 10V4C13 3.71667 13.0958 3.47917 13.2875 3.2875C13.4792 3.09583 13.7167 3 14 3H20C20.2833 3 20.5208 3.09583 20.7125 3.2875C20.9042 3.47917 21 3.71667 21 4V10C21 10.2833 20.9042 10.5208 20.7125 10.7125C20.5208 10.9042 20.2833 11 20 11H14C13.7167 11 13.4792 10.9042 13.2875 10.7125C13.0958 10.5208 13 10.2833 13 10ZM15 9H19V5H15V9ZM19 21V19H21V21H19ZM13 15V13H15V15H13ZM15 17V15H17V17H15ZM13 19V17H15V19H13ZM15 21V19H17V21H15ZM17 19V17H19V19H17ZM17 15V13H19V15H17ZM19 17V15H21V17H19Z"
          fill={color}
        />
      </G>
    </Svg>
  );
}
