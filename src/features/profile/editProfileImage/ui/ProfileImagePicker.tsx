import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Button, Modal } from '@/shared/ui';
import useModal from '@/shared/lib/useModal';
import useAuthStore from '@/entities/user/model/authStore';
import { useImagePicker } from '../lib/useImagePicker';

/**
 * # ProfileImagePicker
 * ---
 * - 간단설명: 프로필 이미지를 표시하고, 탭 시 카메라/갤러리 선택 모달을 띄우는 컴포넌트
 * - 제약사항 및 특이사항: iOS에서 Modal dismiss 애니메이션 충돌 방지를 위해 300ms 딜레이 후 시스템 UI 실행
 * ---
 * @example
 * <ProfileImagePicker />
 */
export default function ProfileImagePicker() {
  const { isOpen, openModal, closeModal } = useModal();
  const user = useAuthStore((s) => s.user);
  const { imageUri, openCamera, openGallery } = useImagePicker();

  const handleCamera = () => {
    closeModal();
    setTimeout(openCamera, 300);
  };

  const handleGallery = () => {
    closeModal();
    setTimeout(openGallery, 300);
  };

  return (
    <>
      <Pressable onPress={openModal} className="items-center">
        <View className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-100 items-center justify-center">
          {imageUri ? (
            <Image source={{ uri: imageUri }} className="w-full h-full" resizeMode="cover" />
          ) : (
            <Text className="text-3xl text-gray-400">
              {user?.email?.charAt(0)?.toUpperCase() ?? '?'}
            </Text>
          )}
        </View>
        <Text className="mt-2 text-sm text-blue-600">사진 변경</Text>
      </Pressable>

      <Modal visible={isOpen} onClose={closeModal} title="프로필 사진 설정">
        <View className="gap-3">
          <Button title="카메라로 찍기"   variant="primary"   onPress={handleCamera}  />
          <Button title="갤러리에서 선택" variant="secondary" onPress={handleGallery} />
          <Button title="취소"           variant="ghost"     onPress={closeModal}    />
        </View>
      </Modal>
    </>
  );
}
