import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Input, BottomCTA, Button, CameraUploadZone, openErrorDialog } from '@/shared/ui';
import { ProfileAPI } from '@/entities/user';
import { usePermissionStore } from '@/widgets/permissions';
import useRegisterFormStore from '../model/useRegisterFormStore';


/**
 * # Step1BasicInfoView
 * ---
 * - 간단설명: 프로필 등록 1단계 - 필수 정보 입력 (사진, 이름, 성별)
 * - 제약사항 및 특이사항:
 *   - 프로필 사진은 갤러리에서 선택 후 presign URL로 S3 업로드
 *   - 이름: 2~10자, 한글/영문만, 공백 불가
 *   - 성별: 남성/여성 중 택 1
 *   - 자기소개는 3단계로 분리됨
 *   - 모든 필수 항목 충족 시 "다음으로" 버튼 활성화
 * ---
 * @example
 * <Step1BasicInfoView />
 */
export default function Step1BasicInfoView() {
  const { form, updateForm, nextStep, isStep1Valid } = useRegisterFormStore();
  const { galleryStatus, requestGalleryPermission } = usePermissionStore();
  const [uploading, setUploading] = useState(false);

  /** 프로필 사진 선택 및 업로드 */
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

    if (result.didCancel || !result.assets?.[0]?.uri) return;

    const uri = result.assets[0].uri;
    updateForm({ profileImageUri: uri });

    try {
      setUploading(true);
      const imageKey = await ProfileAPI.profileImageUpload(uri, 'image/jpeg');
      updateForm({ profileImageKey: imageKey });
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      openErrorDialog({ message: '이미지 업로드에 실패했습니다' });
    } finally {
      setUploading(false);
    }
  };

  /** 이름 변경 핸들러 */
  const handleNicknameChange = (text: string) => {
    if (text.length <= 10) {
      updateForm({ nickname: text });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* 안내 타이틀 */}
        <Text className="text-xl font-bold text-text-black mt-6 mb-8">
          {'프로필에 넣을\n정보를 입력해주세요'}
        </Text>

        {/* 프로필 사진 */}
        <View className="mb-8">
          <Text className="mb-3 text-base font-medium text-text-black">프로필 사진</Text>
          <CameraUploadZone
            imageUri={form.profileImageUri}
            onPress={handleSelectImage}
            disabled={uploading}
          />
        </View>

        {/* 이름 */}
        <View className="mb-8">
          <Input
            label="이름"
            placeholder="프로필 이름을 입력해주세요"
            value={form.nickname}
            onChangeText={handleNicknameChange}
            maxLength={10}
          />
        </View>

        {/* 성별 */}
        <View className="mb-8">
          <Text className="mb-3 text-base font-medium text-text-black">성별</Text>
          <View className="flex-row gap-3">
            <Button
              title="남성"
              variant={form.gender === 'M' ? 'primary' : 'secondary'}
              onPress={() => updateForm({ gender: 'M' })}
              className="px-6 h-11"
            />
            <Button
              title="여성"
              variant={form.gender === 'F' ? 'primary' : 'secondary'}
              onPress={() => updateForm({ gender: 'F' })}
              className="px-6 h-11"
            />
          </View>
        </View>

        <View className="h-24" />
      </ScrollView>

      <BottomCTA>
        <Button
          title="다음으로"
          disabled={!isStep1Valid()}
          onPress={nextStep}
        />
      </BottomCTA>
    </View>
  );
}
