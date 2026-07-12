import { useState } from 'react';
import {
  launchImageLibrary,
  OptionsCommon,
  type ImagePickerResponse,
} from 'react-native-image-picker';
import type { UploadContentType } from '@/entities/user';

const IMAGE_OPTIONS: OptionsCommon = {
  mediaType: 'photo',
  quality: 1,
};

/** 이미지 선택 결과 */
export interface PickedImage {
  uri: string;
  contentType: UploadContentType;
}

const ALLOWED_TYPES: string[] = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * # useEditProfileImagePicker
 * ---
 * - 간단설명: 갤러리에서 이미지를 선택하고 URI와 MIME 타입을 관리하는 훅
 * - 제약사항 및 특이사항:
 *   - MIME 타입이 없거나 허용 타입이 아닌 경우 image/jpeg로 기본 처리
 *   - 원본 이미지 그대로 사용 (압축/리사이즈 없음)
 * ---
 * @example
 * const { pickedImage, openGallery } = useEditProfileImagePicker();
 */
export function useEditProfileImagePicker() {
  const [pickedImage, setPickedImage] = useState<PickedImage | null>(null);

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel || response.errorCode) return;
    const asset = response.assets?.[0];
    if (!asset?.uri) return;

    const contentType: UploadContentType =
      asset.type && ALLOWED_TYPES.includes(asset.type)
        ? (asset.type as UploadContentType)
        : 'image/jpeg';

    setPickedImage({ uri: asset.uri, contentType });
  };

  return {
    pickedImage,
    openGallery: () => launchImageLibrary(IMAGE_OPTIONS, handleResponse),
  };
}
