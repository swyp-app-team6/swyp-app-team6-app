import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GalleryIcon, Header, Layout, PlaygroundIcon, ProfileIcon, TodoIcon } from '@/shared/ui';
import { GalleryGrid, useGalleryImages } from '@/features/gallery/shareImage';

const ACTIVE_COLOR = '#3b82f6';
const INACTIVE_COLOR = '#9ca3af';

const NAV_ITEMS = [
  { name: 'Todo123', label: 'Todo', icon: (active: boolean) => <TodoIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: 'Profile', label: '프로필', icon: (active: boolean) => <ProfileIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: 'Gallery', label: '갤러리', icon: (active: boolean) => <GalleryIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
  { name: 'Playground', label: 'UI', icon: (active: boolean) => <PlaygroundIcon size={22} color={active ? ACTIVE_COLOR : INACTIVE_COLOR} /> },
];

/**
 * # GalleryPage
 * ---
 * - 간단설명: 갤러리 화면 - 디바이스 사진 선택 및 공유 기능 제공
 * ---
 * @example
 * <GalleryPage />
 */
export default function GalleryPage() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { images, pickImages, shareImage } = useGalleryImages();

  return (
    <Layout>
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
      <Layout.BottomNav
        items={NAV_ITEMS}
        activeRoute={route.name}
        onPress={(name) => navigation.navigate(name)}
      />
    </Layout>
  );
}
