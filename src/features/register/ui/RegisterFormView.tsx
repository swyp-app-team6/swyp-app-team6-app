import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { StepView, ProgressBar, ErrorBoundary, LoadSuspense, openErrorDialog } from '@/shared/ui';
import type { ChoiceTemplate, ShortTemplate } from '@/entities/user';
import { useUpdateProfileMutation } from '@/entities/user';
import { resolveRegionEnum } from '@/shared/lib/regionLabel';
import useRegisterFormStore from '../model/useRegisterFormStore';
import useRegisterStepStore from '../model/useRegisterStepStore';
import useRegisterMutation from '../api/useRegisterMutation';
import type { RegisterFormState } from '../model/types';
import Step1BasicInfoView from './Step1BasicInfoView';
import Step2DetailInfoView from './Step2DetailInfoView';
import Step3InterestsView from './Step2InterestsView';
import Step4BioView from './Step3BioView';
import Step6TMIView from './Step4TMIView';
import Step7PreviewView from './Step5PreviewView';
import RegisterCompleteView from './RegisterCompleteView';

interface Props {
  /** 폼 모드 (register: 신규 등록, edit: 수정) */
  mode?: 'register' | 'edit';
  /** edit 모드 시 초기 폼 데이터 (profileToFormState로 변환된 값) */
  initialData?: RegisterFormState;
}

/**
 * # buildRegisterRequest
 * ---
 * - 간단설명: RegisterFormState를 ProfileRegisterRequest 형식으로 변환
 * ---
 * @param form 등록 폼 상태
 */
function buildRegisterRequest(form: RegisterFormState) {
  const choiceTemplate: ChoiceTemplate[] = [];
  const shortTemplate: ShortTemplate[] = [];

  form.tmiAnswers.forEach((tmi) => {
    if (tmi.answerKind === 'CHOICE') {
      choiceTemplate.push({
        question_id: tmi.questionId,
        question_type: tmi.questionType,
        question: tmi.question,
        answer_id: tmi.answerId,
        answer: tmi.answer,
      });
    } else {
      shortTemplate.push({
        question_id: tmi.questionId,
        question_type: tmi.questionType,
        question: tmi.question,
        answer: tmi.answer,
      });
    }
  });

  return {
    nickname: form.nickname,
    image_key: form.profileImageKey ?? '',
    gender: form.gender as 'M' | 'F',
    age: Number(form.age),
    region: resolveRegionEnum(form.region, form.subArea),
    job: form.jobField,
    interests: form.interests,
    bio: form.bio || undefined,
    cosmic_type: form.cosmicType ?? undefined,
    choice_template: choiceTemplate.length > 0 ? choiceTemplate : undefined,
    short_template: shortTemplate.length > 0 ? shortTemplate : undefined,
  };
}

/**
 * # RegisterFormView
 * ---
 * - 간단설명: 프로필 등록/수정 6단계 폼 오케스트레이터
 * - 제약사항 및 특이사항:
 *   - StepView로 6단계 슬라이드 전환
 *   - ProgressBar로 상단 진행률 표시
 *   - 등록/수정 완료 시 RegisterCompleteView로 교체
 *   - 마운트 시 스토어 초기화 (단계 + 폼 데이터)
 *   - mode='register': useRegisterMutation (POST /profile)
 *   - mode='edit': useUpdateProfileMutation (PATCH /profile)
 * ---
 * @param mode 폼 모드 (기본값 'register')
 * @param initialData edit 모드 시 초기 폼 데이터
 * @example
 * <RegisterFormView />
 * <RegisterFormView mode="edit" initialData={formState} />
 */
export default function RegisterFormView({ mode = 'register', initialData }: Props) {
  const { currentStep, resetStep } = useRegisterStepStore();
  const { reset, updateForm } = useRegisterFormStore();
  const [isComplete, setIsComplete] = useState(false);
  const { mutateAsync: registerAsync, isPending: isRegistering } = useRegisterMutation();
  const { mutateAsync: updateAsync, isPending: isUpdating } = useUpdateProfileMutation();

  const isEdit = mode === 'edit';
  const isPending = isEdit ? isUpdating : isRegistering;

  useEffect(() => {
    const { isInitialized } = useRegisterStepStore.getState();
    if (isInitialized) return;

    resetStep();
    reset();
    if (isEdit && initialData) {
      updateForm(initialData);
    }
    useRegisterStepStore.setState({ isInitialized: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 프로필 등록/수정 API 호출 */
  const handleSubmit = useCallback(async () => {
    const form = useRegisterFormStore.getState().form;
    const request = buildRegisterRequest(form);

    try {
      if (isEdit) {
        await updateAsync(request);
      } else {
        await registerAsync(request);
      }
      setIsComplete(true);
    } catch (e) {
      console.error(e);
      openErrorDialog({ message: '프로필 저장에 실패했습니다' });
    }
  }, [isEdit, registerAsync, updateAsync]);

  if (isComplete) {
    return (
      <RegisterCompleteView mode={mode} />
    );
  }

  return (
    <View className="flex-1">
      <View className="px-5 pt-3 pb-2">
        <ProgressBar
          value={Math.round((currentStep + 1) * (100 / 6))}
          steps={6}
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
          <ErrorBoundary>
            <LoadSuspense>
              <Step3InterestsView />
            </LoadSuspense>
          </ErrorBoundary>
        </StepView.Step>
        <StepView.Step>
          <Step4BioView />
        </StepView.Step>
        <StepView.Step>
          <ErrorBoundary>
            <LoadSuspense>
              <Step6TMIView />
            </LoadSuspense>
          </ErrorBoundary>
        </StepView.Step>
        <StepView.Step>
          <Step7PreviewView mode={mode} onSubmit={handleSubmit} loading={isPending} />
        </StepView.Step>
      </StepView>
    </View>
  );
}
