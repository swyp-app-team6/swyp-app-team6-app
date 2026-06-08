import { launchCamera, launchImageLibrary, type ImagePickerResponse } from 'react-native-image-picker';
import useAuthStore from '@/entities/user/model/authStore';

const IMAGE_OPTIONS = {
  mediaType: 'photo' as const,
  quality: 0.8 as const,
  maxWidth: 512,
  maxHeight: 512,
};

/**
 * # useImagePicker
 * ---
 * - 간단설명: 카메라 또는 갤러리에서 이미지를 선택해 authStore의 프로필 이미지를 업데이트하는 훅
 * - 제약사항 및 특이사항: 최대 512x512로 리사이즈, quality 0.8 압축 적용
 * ---
 * @example
 * const { openCamera, openGallery } = useImagePicker();
 */
export function useImagePicker() {
  const setProfileImage = useAuthStore((s) => s.setProfileImage);

  const handleResponse = (response: ImagePickerResponse) => {
    if (response.didCancel || response.errorCode) return;
    const uri = response.assets?.[0]?.uri;
    if (uri) setProfileImage(uri);
  };

  return {
    openCamera: () => launchCamera(IMAGE_OPTIONS, handleResponse),
    openGallery: () => launchImageLibrary(IMAGE_OPTIONS, handleResponse),
  };
}
