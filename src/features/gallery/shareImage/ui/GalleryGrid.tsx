import React from 'react';
import { Dimensions, FlatList, Image, Pressable, Text, View } from 'react-native';
import type { Asset } from 'react-native-image-picker';
import { Button } from '@/shared/ui';

const CELL_SIZE = (Dimensions.get('window').width - 6) / 3; // 3열, 간격 2px

/**
 * GalleryGrid 컴포넌트 Props
 * - images: 표시할 이미지 목록
 * - onPickImages: 사진 선택 버튼 콜백
 * - onShare: 이미지 공유 콜백 (uri 전달)
 */
interface GalleryGridProps {
  images: Asset[];
  onPickImages: () => void;
  onShare: (uri: string) => void;
}

/**
 * # GalleryGrid
 * ---
 * - 간단설명: 선택된 이미지를 3열 그리드로 표시하고, 탭 시 공유 가능한 갤러리 UI
 * - 제약사항 및 특이사항: 이미지가 없을 경우 빈 상태 뷰 표시
 * ---
 * @param images 표시할 이미지 Asset 배열
 * @param onPickImages 사진 선택 버튼 콜백
 * @param onShare 이미지 탭 시 공유 콜백 (uri 전달)
 * @example
 * <GalleryGrid images={images} onPickImages={pickImages} onShare={shareImage} />
 */
export default function GalleryGrid({ images, onPickImages, onShare }: GalleryGridProps) {
  if (images.length === 0) {
    return (
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="text-gray-400 text-base">선택된 사진이 없습니다</Text>
        <Button title="사진 불러오기" variant="primary" onPress={onPickImages} />
      </View>
    );
  }

  return (
    <FlatList
      data={images}
      numColumns={3}
      keyExtractor={(item, index) => item.uri ?? String(index)}
      columnWrapperStyle={{ gap: 2 }}
      ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
      renderItem={({ item }) =>
        item.uri ? (
          <Pressable
            style={{ width: CELL_SIZE, height: CELL_SIZE }}
            onPress={() => onShare(item.uri!)}
          >
            <Image source={{ uri: item.uri }} style={{ width: '100%', height: '100%' }} />
          </Pressable>
        ) : null
      }
    />
  );
}
