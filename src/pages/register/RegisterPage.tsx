import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, Layout, AlertModal, ArrowIcon } from '@/shared/ui';
import { RegisterFormView, useRegisterFormStore } from '@/features/register';
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
  const { currentStep, prevStep, isDirty, reset } = useRegisterFormStore();
  const [showExitModal, setShowExitModal] = useState(false);

  /** 뒤로가기 핸들러 */
  const handleBack = () => {
    if (currentStep > 0) {
      prevStep();
    } else if (isDirty()) {
      setShowExitModal(true);
    } else {
      navigation.goBack();
    }
  };

  /** 이탈 확인 후 나가기 */
  const handleExitConfirm = () => {
    setShowExitModal(false);
    reset();
    navigation.goBack();
  };

  /** 프로필 보기로 이동 */
  const handleViewProfile = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'profileCard' }],
    });
  };

  /** 홈으로 이동 */
  const handleGoHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'home' }],
    });
  };

  return (
    <>
      <Header
        left={
          <TouchableOpacity onPress={handleBack}>
            <ArrowIcon direction="left" />
          </TouchableOpacity>
        }
      />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        <RegisterFormView
          onViewProfile={handleViewProfile}
          onGoHome={handleGoHome}
        />
      </Layout.Body>

      <AlertModal
        visible={showExitModal}
        title="프로필 등록 중단"
        message="이미 입력한 정보가 있어요. 프로필 등록을 그만두실건가요?"
        confirmText="나가기"
        cancelText="계속 작성"
        onConfirm={handleExitConfirm}
        onCancel={() => setShowExitModal(false)}
      />
    </>
  );
}
