import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { StepView, ProgressBar } from '@/shared/ui';
import useRegisterFormStore from '../model/useRegisterFormStore';
import Step1BasicInfoView from './Step1BasicInfoView';
import Step2DetailInfoView from './Step2DetailInfoView';
import Step3InterestsView from './Step2InterestsView';
import Step4BioView from './Step3BioView';
import Step5TypeTestView from './Step3TypeTestView';
import Step6TMIView from './Step4TMIView';
import Step7PreviewView from './Step5PreviewView';
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
 * - 간단설명: 프로필 등록 7단계 폼 오케스트레이터
 * - 제약사항 및 특이사항:
 *   - StepView로 7단계 슬라이드 전환
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
  const { currentStep, reset } = useRegisterFormStore();
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    return () => {
      reset();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 
   * 프로필 등록 제출 (API 호출 없이 완료 처리) 
   * TODO: 프로필등록 API 연동
   * */
  const handleSubmit = () => {
    setIsComplete(true);
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
          value={Math.round((currentStep + 1) * (100 / 7))}
          steps={7}
        />
      </View>

      <StepView currentStep={currentStep}>
        <StepView.Step>
          <Step1BasicInfoView />
        </StepView.Step>
        <StepView.Step>
          <Step2DetailInfoView />
        </StepView.Step>
        <StepView.Step>
          <Step3InterestsView />
        </StepView.Step>
        <StepView.Step>
          <Step4BioView />
        </StepView.Step>
        <StepView.Step>
          <Step5TypeTestView />
        </StepView.Step>
        <StepView.Step>
          <Step6TMIView />
        </StepView.Step>
        <StepView.Step>
          <Step7PreviewView onSubmit={handleSubmit} loading={false} />
        </StepView.Step>
      </StepView>
    </View>
  );
}
