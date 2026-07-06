import React, { useCallback, useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { StepView, ProgressBar, ErrorBoundary, LoadSuspense } from '@/shared/ui';
import type { ChoiceTemplate, ShortTemplate } from '@/entities/user';
import { useUpdateProfileMutation } from '@/entities/user';
import useRegisterFormStore from '../model/useRegisterFormStore';
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
  /** 등록/수정 완료 후 프로필 보기 콜백 */
  onViewProfile?: () => void;
  /** 등록/수정 완료 후 홈으로 이동 콜백 */
  onGoHome?: () => void;
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
    region: form.region,
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
 *   - 언마운트 시 스토어 자동 리셋
 *   - mode='register': useRegisterMutation (POST /profile)
 *   - mode='edit': useUpdateProfileMutation (PATCH /profile)
 * ---
 * @param mode 폼 모드 (기본값 'register')
 * @param initialData edit 모드 시 초기 폼 데이터
 * @param onViewProfile 완료 후 프로필 보기 콜백
 * @param onGoHome 완료 후 홈으로 이동 콜백
 * @example
 * <RegisterFormView onViewProfile={...} onGoHome={...} />
 * <RegisterFormView mode="edit" initialData={formState} onViewProfile={...} onGoHome={...} />
 */
export default function RegisterFormView({ mode = 'register', initialData, onViewProfile, onGoHome }: Props) {
  const { currentStep, reset, updateForm } = useRegisterFormStore();
  const [isComplete, setIsComplete] = useState(false);
  const { mutateAsync: registerAsync, isPending: isRegistering } = useRegisterMutation();
  const { mutateAsync: updateAsync, isPending: isUpdating } = useUpdateProfileMutation();

  const isEdit = mode === 'edit';
  const isPending = isEdit ? isUpdating : isRegistering;

  useEffect(() => {
    if (isEdit && initialData) {
      updateForm(initialData);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      reset();
    };
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
    } catch {
      Alert.alert(
        isEdit ? '수정 실패' : '등록 실패',
        isEdit
          ? '프로필 수정 중 오류가 발생했습니다. 다시 시도해주세요.'
          : '프로필 등록 중 오류가 발생했습니다. 다시 시도해주세요.',
      );
    }
  }, [isEdit, registerAsync, updateAsync]);

  if (isComplete) {
    return (
      <RegisterCompleteView
        onViewProfile={onViewProfile!}
        onGoHome={onGoHome!}
      />
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
          <Step7PreviewView onSubmit={handleSubmit} loading={isPending} />
        </StepView.Step>
      </StepView>
    </View>
  );
}
