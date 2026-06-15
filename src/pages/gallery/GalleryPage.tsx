import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Header, Layout } from '@/shared/ui';
import { GalleryGrid, useGalleryImages } from '@/features/gallery/shareImage';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '../../shared/hoc/withAuthorization';
import Config from 'react-native-config';

/**
 * # GalleryPage
 * ---
 * - 간단설명: 갤러리 화면 - 디바이스 사진 선택 및 공유 기능 제공
 * ---
 * @example
 * <GalleryPage />
 */
function GalleryPage() {
  const { images, pickImages, shareImage } = useGalleryImages();

  return (
    <>
      <Header
        title="갤러리"
        right={
          <TouchableOpacity onPress={pickImages}>
            <Text className="text-blue-500 text-sm">사진 선택</Text>
          </TouchableOpacity>
        }
      />
      <Layout.Body>
        <GalleryGrid images={images} onPickImages={pickImages} onShare={shareImage} />
      </Layout.Body>
    </>
  );
}

export default withLayout(GalleryPage);
