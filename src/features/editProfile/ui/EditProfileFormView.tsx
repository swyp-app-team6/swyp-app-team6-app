import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Button, Input } from '@/shared/ui';
import { usePermissionStore } from '@/widgets/permissions';
import { toast } from '@/shared/lib/toast';
import { useEditProfileImagePicker } from '../lib/useEditProfileImagePicker';
import useProfileImageUploadMutation from '../api/useProfileImageUploadMutation';

interface Props {
  /** 저장 완료 시 호출 */
  onSave: () => void;
}

/**
 * # EditProfileFormView
 * ---
 * - 간단설명: 닉네임 및 프로필 사진 수정 폼
 * - 제약사항 및 특이사항:
 *   - 이미지 선택 시 presigned URL 발급 (ProfileAPI.profileImageUpload)
 *   - 갤러리 권한은 usePermissionStore로 관리
 * ---
 * @param onSave 저장 완료 시 호출되는 콜백
 * @example
 * <EditProfileFormView onSave={() => navigation.goBack()} />
 */
export default function EditProfileFormView({ onSave }: Props) {
  const [nickname, setNickname] = useState('');
  const { galleryStatus, requestGalleryPermission } = usePermissionStore();
  const { pickedImage, openGallery } = useEditProfileImagePicker();
  const { mutate: uploadImage, isPending } = useProfileImageUploadMutation();

  const handleSelectImage = async () => {
    if (galleryStatus !== 'granted' && galleryStatus !== 'limited') {
      await requestGalleryPermission();
    }
    openGallery();
  };

  const handleSave = () => {
    if (pickedImage) {
      uploadImage(pickedImage.contentType, {
        onSuccess: (presign) => {
          // TODO: presign.uploadUrl로 S3 PUT 업로드 후 presign.imageKey를 프로필 수정 API에 전달
          console.log('presign 발급 완료:', presign);
          onSave();
        },
        onError: () => {
          toast.error('이미지 업로드에 실패했습니다');
        },
      });
    } else {
      onSave();
    }
  };

  return (
    <View className="gap-4">
      {pickedImage ? (
        <Image
          source={{ uri: pickedImage.uri }}
          className="w-24 h-24 rounded-full self-center"
        />
      ) : null}
      <Button
        title="프로필 사진 변경"
        variant="secondary"
        onPress={handleSelectImage}
      />
      <Input
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChangeText={setNickname}
      />
      <Button
        title={isPending ? '저장 중...' : '저장'}
        onPress={handleSave}
        disabled={isPending}
      />
    </View>
  );
}
