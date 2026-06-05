import React from 'react';
import { Dimensions, FlatList, Image, Pressable, Text, View } from 'react-native';
import type { Asset } from 'react-native-image-picker';
import { Button } from '@/shared/ui';

const CELL_SIZE = (Dimensions.get('window').width - 6) / 3; // 3열, 간격 2px

interface GalleryGridProps {
  images: Asset[];
  onPickImages: () => void;
  onShare: (uri: string) => void;
}

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
