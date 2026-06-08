import { useState } from 'react';
import { Share } from 'react-native';
import { launchImageLibrary, type Asset } from 'react-native-image-picker';

/**
 * # useGalleryImages
 * ---
 * - 간단설명: 디바이스 갤러리 이미지 선택·공유·초기화 상태를 관리하는 훅
 * ---
 * @example
 * const { images, pickImages, shareImage, clearImages } = useGalleryImages();
 */
export function useGalleryImages() {
  const [images, setImages] = useState<Asset[]>([]);

  const pickImages = () => {
    launchImageLibrary(
      { mediaType: 'photo', selectionLimit: 0, quality: 1 },
      (response) => {
        if (response.didCancel || response.errorCode) return;
        if (response.assets) setImages(response.assets);
      },
    );
  };

  const shareImage = async (uri: string) => {
    await Share.share({ url: uri });
  };

  const clearImages = () => setImages([]);

  return { images, pickImages, shareImage, clearImages };
}
