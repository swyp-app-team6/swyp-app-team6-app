import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StepView, ProgressBar } from '@/shared/ui';
import type { ProfileRegisterRequest } from '@/entities/user';
import useRegisterFormStore from '../model/useRegisterFormStore';
import useRegisterMutation from '../api/useRegisterMutation';
import Step1BasicInfoView from './Step1BasicInfoView';
import Step2InterestsView from './Step2InterestsView';
import Step3TMIView from './Step4TMIView';
import Step4PreviewView from './Step5PreviewView';
import RegisterCompleteView from './RegisterCompleteView';

interface Props {
  /** 등록 완료 후 프로필 보기 콜백 */
  onViewProfile: () => void;
  /** 등록 완료 후 홈으로 이동 콜백 */
  onGoHome: () => void;
}

/**
 * # RegisterFormView
 * ---
 * - 간단설명: 프로필 등록 4단계 폼 오케스트레이터
 * - 제약사항 및 특이사항:
 *   - StepView로 4단계 슬라이드 전환
 *   - ProgressBar로 상단 진행률 표시
 *   - 등록 완료 시 RegisterCompleteView로 교체
 *   - 언마운트 시 스토어 자동 리셋
 * ---
 * @param onViewProfile 등록 완료 후 프로필 보기 콜백
 * @param onGoHome 등록 완료 후 홈으로 이동 콜백
 * @example
 * <RegisterFormView onViewProfile={...} onGoHome={...} />
 */
export default function RegisterFormView({ onViewProfile, onGoHome }: Props) {
  const { currentStep, form, reset } = useRegisterFormStore();
  const { mutate, isPending } = useRegisterMutation();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  /** 프로필 등록 제출 */
  const handleSubmit = () => {
    const request: ProfileRegisterRequest = {
      nickname: form.nickname,
      gender: form.gender!,
      bio: form.bio,
      keyword: '',
      topic: '',
      interests: form.interests,
      ...(form.profileImageKey && { image_key: form.profileImageKey }),
    };

    mutate(request, {
      onSuccess: () => {
        setIsComplete(true);
      },
    });
  };

  if (isComplete) {
    return (
      <RegisterCompleteView
        onViewProfile={onViewProfile}
        onGoHome={onGoHome}
      />
    );
  }

  return (
    <View className="flex-1">
      <View className="px-5 pt-3 pb-2">
        <ProgressBar
          value={(currentStep + 1) * 25}
          steps={4}
        />
      </View>

      <StepView currentStep={currentStep}>
        <StepView.Step>
          <Step1BasicInfoView />
        </StepView.Step>
        <StepView.Step>
          <Step2InterestsView />
        </StepView.Step>
        <StepView.Step>
          <Step3TMIView />
        </StepView.Step>
        <StepView.Step>
          <Step4PreviewView onSubmit={handleSubmit} loading={isPending} />
        </StepView.Step>
      </StepView>
    </View>
  );
}
