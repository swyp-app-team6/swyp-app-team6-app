import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Button, Input } from '@/shared/ui';
import { usePermissionStore } from '@/widgets/permissions';
import { useUpdateProfileMutation } from '@/entities/user';
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
 *   - 이미지 선택 시 presigned URL 발급 → S3 업로드 → 프로필 수정 API 호출
 *   - 갤러리 권한은 usePermissionStore로 관리
 * ---
 * @param onSave 저장 완료 시 호출되는 콜백
 * @example
 * <EditProfileFormView onSave={() => navigation.goBack()} />
 */
export default function EditProfileFormView({ onSave }: Props) {
  const [nickname, setNickname] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { galleryStatus, requestGalleryPermission } = usePermissionStore();
  const { pickedImage, openGallery } = useEditProfileImagePicker();
  const { mutateAsync: getPresignUrl } = useProfileImageUploadMutation();
  const { mutateAsync: updateProfile } = useUpdateProfileMutation();

  const handleSelectImage = async () => {
    if (galleryStatus !== 'granted' && galleryStatus !== 'limited') {
      await requestGalleryPermission();
    }
    openGallery();
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let imageKey: string | undefined;

      if (pickedImage) {
        imageKey = await getPresignUrl({
          fileUri: pickedImage.uri,
          contentType: pickedImage.contentType,
        });
      }

      const hasChanges = imageKey || nickname.trim();
      if (hasChanges) {
        await updateProfile({
          ...(imageKey && { image_key: imageKey }),
          ...(nickname.trim() && { nickname: nickname.trim() }),
        });
      }

      onSave();
    } catch {
      toast.error('프로필 수정에 실패했습니다');
    } finally {
      setIsSaving(false);
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
        title={isSaving ? '저장 중...' : '저장'}
        onPress={handleSave}
        disabled={isSaving}
      />
    </View>
  );
}
