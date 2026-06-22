import { useState } from 'react';
import type { WithdrawalStep, WithdrawalReason } from './types';

/**
 * # useWithdrawalFlow
 * ---
 * - 간단설명: 회원탈퇴 4단계 플로우 상태 관리 훅
 * - 제약사항 및 특이사항:
 *   - info → reason → confirm → complete 순서로 진행
 *   - 사유 미선택 시 다음 단계 진행 불가
 * ---
 * @example
 * const { step, next, selectedReason, selectReason } = useWithdrawalFlow();
 */
export default function useWithdrawalFlow() {
  const [step, setStep] = useState<WithdrawalStep>('info');
  const [selectedReason, setSelectedReason] =
    useState<WithdrawalReason | null>(null);
  const [customReason, setCustomReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const next = () => {
    if (step === 'info') setStep('reason');
    else if (step === 'reason' && selectedReason) setStep('confirm');
    else if (step === 'confirm' && confirmed) setStep('complete');
  };

  return {
    step,
    selectedReason,
    customReason,
    confirmed,
    selectReason: setSelectedReason,
    setCustomReason,
    toggleConfirm: () => setConfirmed((prev) => !prev),
    next,
  };
}
