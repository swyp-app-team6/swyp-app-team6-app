import { useState } from 'react';
import { Share } from 'react-native';
import { launchImageLibrary, type Asset } from 'react-native-image-picker';

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
