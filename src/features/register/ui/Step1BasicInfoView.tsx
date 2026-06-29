import React, { useState } from 'react';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { TextField, Textbox, BottomCTA, Button } from '@/shared/ui';
import { UserAPI } from '@/entities/user';
import { usePermissionStore } from '@/widgets/permissions';
import useRegisterFormStore from '../model/useRegisterFormStore';

/**
 * # Step1BasicInfoView
 * ---
 * - 간단설명: 프로필 등록 1단계 - 필수 정보 입력 (사진, 이름, 성별, 자기소개)
 * - 제약사항 및 특이사항:
 *   - 프로필 사진은 갤러리에서 선택 후 presign URL로 S3 업로드
 *   - 이름: 2~10자, 한글/영문만, 공백 불가
 *   - 성별: 남성/여성 중 택 1
 *   - 자기소개: 10~100자
 *   - 모든 필수 항목 충족 시 "다음" 버튼 활성화
 * ---
 * @example
 * <Step1BasicInfoView />
 */
export default function Step1BasicInfoView() {
  const { form, updateForm, nextStep, isStep1Valid } = useRegisterFormStore();
  const { galleryStatus, requestGalleryPermission } = usePermissionStore();
  const [uploading, setUploading] = useState(false);
  const [nicknameError, setNicknameError] = useState<string | undefined>();
  const [bioError, setBioError] = useState<string | undefined>();

  const nicknameRegex = /^[가-힣a-zA-Z]{2,10}$/;

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
      const { data } = await UserAPI.profileImageUpload('image/jpeg');
      const imageBlob = await fetch(uri);
      await fetch(data.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': 'image/jpeg' },
        body: await imageBlob.blob(),
      });
      updateForm({ profileImageKey: data.imageKey });
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
    } finally {
      setUploading(false);
    }
  };

  /** 이름 변경 핸들러 */
  const handleNicknameChange = (text: string) => {
    const trimmed = text.replace(/\s/g, '');
    updateForm({ nickname: trimmed });

    if (trimmed.length > 0 && !nicknameRegex.test(trimmed)) {
      setNicknameError('2~10자의 한글 또는 영문만 입력 가능합니다');
    } else {
      setNicknameError(undefined);
    }
  };

  /** 자기소개 변경 핸들러 */
  const handleBioChange = (text: string) => {
    updateForm({ bio: text });

    if (text.length > 0 && text.length < 10) {
      setBioError('최소 10자 이상 입력해주세요');
    } else {
      setBioError(undefined);
    }
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 px-5 pt-6" showsVerticalScrollIndicator={false}>
        {/* 프로필 사진 */}
        <View className="items-center mb-8">
          <Pressable
            onPress={handleSelectImage}
            disabled={uploading}
            className="w-[100px] h-[100px] rounded-full bg-gray-100 items-center justify-center overflow-hidden"
          >
            {form.profileImageUri ? (
              <Image
                source={{ uri: form.profileImageUri }}
                className="w-full h-full"
              />
            ) : (
              <Text className="text-3xl text-gray-400">📷</Text>
            )}
          </Pressable>
          <Text className="text-xs text-text-gray4 mt-2">
            {uploading ? '업로드 중...' : '프로필 사진을 등록해주세요'}
          </Text>
        </View>

        {/* 이름 */}
        <View className="mb-5">
          <TextField
            label="이름"
            placeholder="이름을 입력해주세요"
            value={form.nickname}
            onChangeText={handleNicknameChange}
            maxLength={10}
            error={nicknameError}
          />
        </View>

        {/* 성별 */}
        <View className="mb-5">
          <Text className="mb-1.5 text-sm font-medium text-text-gray3">성별</Text>
          <View className="flex-row gap-3">
            <Pressable
              onPress={() => updateForm({ gender: 'M' })}
              className={`flex-1 h-14 rounded-xl items-center justify-center border ${
                form.gender === 'M'
                  ? 'bg-primary border-primary'
                  : 'bg-white border-text-gray6'
              }`}
            >
              <Text
                className={`text-base font-medium ${
                  form.gender === 'M' ? 'text-white' : 'text-text-gray3'
                }`}
              >
                남성
              </Text>
            </Pressable>
            <Pressable
              onPress={() => updateForm({ gender: 'F' })}
              className={`flex-1 h-14 rounded-xl items-center justify-center border ${
                form.gender === 'F'
                  ? 'bg-primary border-primary'
                  : 'bg-white border-text-gray6'
              }`}
            >
              <Text
                className={`text-base font-medium ${
                  form.gender === 'F' ? 'text-white' : 'text-text-gray3'
                }`}
              >
                여성
              </Text>
            </Pressable>
          </View>
        </View>

        {/* 자기소개 */}
        <Textbox
          label="한줄 자기소개"
          placeholder="자신을 소개하는 한 줄을 작성해주세요 (10~100자)"
          value={form.bio}
          onChangeText={handleBioChange}
          maxLength={100}
          minHeight={80}
          error={bioError}
        />

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
