import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, Layout, ArrowIcon, openDialog } from '@/shared/ui';
import { RegisterFormView, useRegisterFormStore, useRegisterStepStore } from '@/features/register';
import type { NavigationPropType } from '@/shared/types';

/**
 * # RegisterPage
 * ---
 * - 간단설명: 프로필 등록 5단계 페이지
 * - 제약사항 및 특이사항:
 *   - 소셜 로그인 후 프로필 미등록 시 진입
 *   - 뒤로가기: step > 0이면 이전 단계, step === 0이면 이탈 확인 팝업
 *   - 완료 시 home 또는 profileCard 화면으로 이동
 * ---
 * @example
 * <RegisterPage />
 */
export default function RegisterPage() {
  const navigation = useNavigation<NavigationPropType>();
  const { currentStep, prevStep, nextStep, resetStep } = useRegisterStepStore();
  const { isDirty, reset } = useRegisterFormStore();

  /** 뒤로가기 핸들러 */
  const handleBack = () => {
    if (currentStep > 0) {
      prevStep();
    } else if (isDirty()) {
      openDialog({
        type: 'confirm',
        title: '프로필 등록 중단',
        message: '이미 입력한 정보가 있어요.\n프로필 등록을 그만두실건가요?',
        okLabel: '나가기',
        cancelLabel: '계속 작성',
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
        title="프로필 등록"
        left={
          <TouchableOpacity onPress={handleBack}>
            <ArrowIcon direction="left" />
          </TouchableOpacity>
        }
        right={
          (currentStep === 3 || currentStep === 4) ? (
            <TouchableOpacity onPress={nextStep} hitSlop={8}>
              <Text className="text-sm font-medium text-text-gray4">건너뛰기</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        <RegisterFormView />
      </Layout.Body>
    </>
  );
}
