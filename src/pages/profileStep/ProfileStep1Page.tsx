import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { Header, Layout, ArrowIcon, ProgressBar, openDialog } from '@/shared/ui';
import { ProfileAPI } from '@/entities/user';
import type { MyProfileResponse } from '@/entities/user';
import { useRegisterFormStore, profileToFormState } from '@/features/register';
import Step1BasicInfoView from '@/features/register/ui/Step1BasicInfoView';
import type { NavigatorType, NavigationPropType } from '@/shared/types';

/**
 * # ProfileStep1Page
 * ---
 * - 간단설명: 프로필 등록/수정 1단계 페이지 — 기본정보 (사진, 이름, 성별)
 * - 제약사항 및 특이사항:
 *   - register 모드: 마운트 시 폼 초기화
 *   - edit 모드: 마운트 시 캐시된 프로필 데이터로 폼 초기화
 *   - 뒤로가기: 데이터 입력 시 이탈 확인 팝업
 * ---
 * @example
 * navigation.navigate('profileStep1', { mode: 'register' })
 */
export default function ProfileStep1Page() {
  const navigation = useNavigation<NavigationPropType>();
  const route = useRoute<RouteProp<NavigatorType, 'profileStep1'>>();
  const { mode } = route.params;
  const isEdit = mode === 'edit';
  const queryClient = useQueryClient();
  const { reset, updateForm, isDirty } = useRegisterFormStore();

  useEffect(() => {
    reset();
    if (isEdit) {
      const profileData = queryClient.getQueryData<MyProfileResponse>(
        ProfileAPI.query.me().queryKey,
      );
      if (profileData) {
        updateForm(profileToFormState(profileData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 뒤로가기 핸들러 */
  const handleBack = () => {
    if (isDirty()) {
      openDialog({
        type: 'confirm',
        title: isEdit ? '프로필 수정 중단' : '프로필 등록 중단',
        message: isEdit
          ? '이미 수정한 정보가 있어요.\n프로필 수정을 그만두실건가요?'
          : '이미 입력한 정보가 있어요.\n프로필 등록을 그만두실건가요?',
        okLabel: '나가기',
        cancelLabel: isEdit ? '계속 수정' : '계속 작성',
        okFn: () => {
          reset();
          navigation.goBack();
        },
      });
    } else {
      reset();
      navigation.goBack();
    }
  };

  const handleNext = () => {
    navigation.navigate('profileStep2', { mode });
  };

  return (
    <>
      <Header
        title={isEdit ? '프로필 수정' : '프로필 등록'}
        left={
          <TouchableOpacity onPress={handleBack}>
            <ArrowIcon direction="left" />
          </TouchableOpacity>
        }
      />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        <View className="px-5 pt-3 pb-2">
          <ProgressBar value={Math.round((1) * (100 / 6))} steps={6} />
        </View>
        <Step1BasicInfoView onNext={handleNext} />
      </Layout.Body>
    </>
  );
}
