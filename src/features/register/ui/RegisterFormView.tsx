import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button, Input } from '@/shared/ui';
import { usePermissionStore } from '@/widgets/permissions';

interface Props {
  /** 가입 완료 시 호출 */
  onSuccess: () => void;
}

/**
 * # RegisterFormView
 * ---
 * - 간단설명: 닉네임 입력 + 프로필 사진 선택 회원가입 폼
 * - 제약사항 및 특이사항:
 *   - 갤러리 권한은 usePermissionStore로 관리
 *   - 더미 동작: authStore에 로컬 상태만 업데이트
 * ---
 * @param onSuccess 가입 완료 시 호출되는 콜백
 * @example
 * <RegisterFormView onSuccess={() => navigation.reset(...)} />
 */
export default function RegisterFormView({ onSuccess }: Props) {
  const [nickname, setNickname] = useState('');
  const [profileUri, setProfileUri] = useState<string | null>(null);
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

  const handleSubmit = () => {
    // TODO: registerProfile API 연동 시 구현
    onSuccess();
  };

  return (
    <View className="gap-4">
      {profileUri && (
        <Image
          source={{ uri: profileUri }}
          className="w-24 h-24 rounded-full self-center"
        />
      )}
      <Button
        title="프로필 사진 선택"
        variant="secondary"
        onPress={handleSelectImage}
      />
      <Input
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChangeText={setNickname}
      />
      <Button title="가입 완료" onPress={handleSubmit} />
    </View>
  );
}
