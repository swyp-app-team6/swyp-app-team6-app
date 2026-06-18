import { useState } from 'react';
import { launchCamera, launchImageLibrary, type ImagePickerResponse } from 'react-native-image-picker';

const IMAGE_OPTIONS = {
  mediaType: 'photo' as const,
  quality: 0.8 as const,
  maxWidth: 512,
  maxHeight: 512,
};

/**
 * # useImagePicker
 * ---
 * - 간단설명: 카메라 또는 갤러리에서 이미지를 선택해 로컬 프로필 이미지 URI를 관리하는 훅
 * - 제약사항 및 특이사항: 최대 512x512로 리사이즈, quality 0.8 압축 적용
 * ---
 * @example
 * const { localImageUri, openCamera, openGallery } = useImagePicker();
 */
export function useImagePicker() {
  const [localImageUri, setLocalImageUri] = useState<string | null>(null);

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel || response.errorCode) return;
    const uri = response.assets?.[0]?.uri;
    if (uri) setLocalImageUri(uri);
  };

  return {
    localImageUri,
    openCamera: () => launchCamera(IMAGE_OPTIONS, handleResponse),
    openGallery: () => launchImageLibrary(IMAGE_OPTIONS, handleResponse),
  };
}
