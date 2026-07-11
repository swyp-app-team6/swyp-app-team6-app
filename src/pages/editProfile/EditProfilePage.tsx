import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import { Header, Layout, ArrowIcon, openDialog } from '@/shared/ui';
import { RegisterFormView, useRegisterFormStore, useRegisterStepStore, profileToFormState } from '@/features/register';
import { ProfileAPI } from '@/entities/user';
import type { MyProfileResponse } from '@/entities/user';
import type { NavigationPropType } from '@/shared/types';

/**
 * # EditProfilePage
 * ---
 * - 간단설명: 프로필 수정 화면 — 등록 UI를 재사용하여 전체 프로필 수정
 * - 제약사항 및 특이사항:
 *   - getQueryData로 캐시된 프로필 데이터를 초기값으로 사용
 *   - RegisterFormView(mode='edit')로 6단계 수정 폼 표시
 *   - 뒤로가기: step > 0이면 이전 단계, step === 0이면 이탈 확인 팝업
 * ---
 * @example
 * <EditProfilePage />
 */
export default function EditProfilePage() {
  const navigation = useNavigation<NavigationPropType>();
  const queryClient = useQueryClient();
  const { currentStep, prevStep, resetStep } = useRegisterStepStore();
  const { isDirty, reset } = useRegisterFormStore();

  const profileData = queryClient.getQueryData<MyProfileResponse>(
    ProfileAPI.query.me().queryKey,
  );
  const initialFormData = profileData ? profileToFormState(profileData) : undefined;

  /** 뒤로가기 핸들러 */
  const handleBack = () => {
    if (currentStep > 0) {
      prevStep();
    } else if (isDirty()) {
      openDialog({
        type: 'confirm',
        title: '프로필 수정 중단',
        message: '이미 수정한 정보가 있어요.\n프로필 수정을 그만두실건가요?',
        okLabel: '나가기',
        cancelLabel: '계속 수정',
        okFn: () => {
          resetStep();
          reset();
          navigation.goBack();
        },
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <>
      <Header
        title="프로필 수정"
        left={
          <TouchableOpacity onPress={handleBack}>
            <ArrowIcon direction="left" />
          </TouchableOpacity>
        }
      />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        <RegisterFormView
          mode="edit"
          initialData={initialFormData}
        />
      </Layout.Body>
    </>
  );
}
