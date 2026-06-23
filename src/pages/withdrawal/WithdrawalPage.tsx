import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header, Layout } from '@/shared/ui';
import {
  WithdrawalInfoView,
  WithdrawalReasonView,
  WithdrawalConfirmView,
  useWithdrawalFlow,
} from '@/features/withdrawal';
import useAuthStore from '@/entities/user/model/authStore';
import type { NavigationPropType } from '@/shared/types';

/**
 * # WithdrawalPage
 * ---
 * - 간단설명: 회원탈퇴 4단계 플로우 페이지
 * - 제약사항 및 특이사항:
 *   - 안내 → 사유 선택 → 최종 확인 → 완료 순서로 진행
 *   - 완료 시 authStore 클리어 후 로그인으로 리다이렉트
 * ---
 * @example
 * <WithdrawalPage />
 */
function WithdrawalPage() {
  const navigation = useNavigation<NavigationPropType>();
  const { clear } = useAuthStore();
  const {
    step,
    selectedReason,
    customReason,
    confirmed,
    selectReason,
    setCustomReason,
    toggleConfirm,
    next,
  } = useWithdrawalFlow();

  const handleWithdraw = async () => {
    await clear();
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });
  };

  return (
    <>
      <Header title="회원탈퇴" showBack />
      <Layout.Body styleClass={{ root: 'px-6 pt-10' }}>
        {step === 'info' && <WithdrawalInfoView onNext={next} />}
        {step === 'reason' && (
          <WithdrawalReasonView
            selectedReason={selectedReason}
            customReason={customReason}
            onSelectReason={selectReason}
            onChangeCustomReason={setCustomReason}
            onNext={next}
          />
        )}
        {step === 'confirm' && (
          <WithdrawalConfirmView
            confirmed={confirmed}
            onToggleConfirm={toggleConfirm}
            onWithdraw={handleWithdraw}
          />
        )}
      </Layout.Body>
    </>
  );
}

export default WithdrawalPage;
