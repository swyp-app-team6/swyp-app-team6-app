import React from 'react';
import { Pressable, Image, type ViewStyle } from 'react-native';
import { cn } from '@/shared/lib/cn';
import { CameraIcon } from '../icons';

interface StyleClass {
  root?: string;
}

interface CameraUploadZoneProps {
  /** 선택된 이미지 URI (있으면 이미지 표시, 없으면 카메라 아이콘 표시) */
  imageUri?: string | null;
  /** 영역 탭 시 호출 */
  onPress?: () => void;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 카메라 아이콘 크기 (기본값: 24) */
  iconSize?: number;
  /** 카메라 아이콘 색상 (기본값: #8C39FB) */
  iconColor?: string;
  /** 추가 스타일 클래스 */
  styleClass?: StyleClass;
  /** 인라인 스타일 오버라이드 */
  style?: ViewStyle;
}

/**
 * # CameraUploadZone
 * ---
 * - 간단설명: 사진 업로드를 위한 카메라 아이콘이 포함된 영역 컴포넌트
 * - 제약사항 및 특이사항:
 *   - imageUri가 없으면 회색 배경 + 카메라 아이콘 표시
 *   - imageUri가 있으면 선택된 이미지를 꽉 채워 표시
 *   - 기본 크기: 120x148, 12px 라운드
 * ---
 * @param imageUri 선택된 이미지 URI
 * @param onPress 영역 탭 시 호출되는 콜백
 * @param disabled 비활성화 여부
 * ---
 * @example
 * ```tsx
 * <CameraUploadZone
 *   imageUri={selectedImage}
 *   onPress={handleSelectImage}
 * />
 * ```
 */
export default function CameraUploadZone({
  imageUri,
  onPress,
  disabled,
  iconSize = 24,
  iconColor = '#8C39FB',
  styleClass,
  style,
}: CameraUploadZoneProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn(
        'w-[120px] h-[148px] rounded-xl bg-text-gray7 items-center justify-center overflow-hidden',
        styleClass?.root,
      )}
      style={style}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} className="w-full h-full" />
      ) : (
        <CameraIcon size={iconSize} color={iconColor} />
      )}
    </Pressable>
  );
}
