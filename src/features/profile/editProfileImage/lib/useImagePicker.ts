import { launchCamera, launchImageLibrary, type ImagePickerResponse } from 'react-native-image-picker';
import useAuthStore from '@/entities/user/model/authStore';

const IMAGE_OPTIONS = {
  mediaType: 'photo' as const,
  quality: 0.8 as const,
  maxWidth: 512,
  maxHeight: 512,
};

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
