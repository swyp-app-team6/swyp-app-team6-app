import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, Input } from '@/shared/ui';
import { usePermissionStore } from '@/widgets/permissions';
import useAuthStore from '@/entities/user/model/authStore';

interface Props {
  /** 저장 완료 시 호출 */
  onSave: () => void;
}

/**
 * # EditProfileFormView
 * ---
 * - 간단설명: 닉네임 및 프로필 사진 수정 폼
 * - 제약사항 및 특이사항:
 *   - authStore.updateUser로 부분 업데이트
 *   - 갤러리 권한은 usePermissionStore로 관리
 * ---
 * @param onSave 저장 완료 시 호출되는 콜백
 * @example
 * <EditProfileFormView onSave={() => navigation.goBack()} />
 */
export default function EditProfileFormView({ onSave }: Props) {
  const { user, updateUser } = useAuthStore();
  const [nickname, setNickname] = useState(user?.name ?? '');
  const [profileUri, setProfileUri] = useState<string | null>(
    user?.picture ?? null,
  );
  const { galleryStatus, requestGalleryPermission } = usePermissionStore();

  const handleSelectImage = async () => {
    if (galleryStatus !== 'granted' && galleryStatus !== 'limited') {
      await requestGalleryPermission();
    }
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 512,
      maxHeight: 512,
    });
    if (!result.didCancel && result.assets?.[0]?.uri) {
      setProfileUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    updateUser({
      name: nickname,
      ...(profileUri ? { picture: profileUri } : {}),
    });
    onSave();
  };

  return (
    <View className="gap-4">
      {profileUri ? (
        <Image
          source={{ uri: profileUri }}
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
      <Button title="저장" onPress={handleSave} />
    </View>
  );
}
