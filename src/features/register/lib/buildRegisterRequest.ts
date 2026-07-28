import type { ChoiceTemplate, ShortTemplate } from '@/entities/user';
import { resolveRegionEnum } from '@/shared/lib/regionLabel';
import type { RegisterFormState } from '../model/types';

/**
 * # buildRegisterRequest
 * ---
 * - 간단설명: RegisterFormState를 ProfileRegisterRequest 형식으로 변환
 * ---
 * @param form 등록 폼 상태
 */
export function buildRegisterRequest(form: RegisterFormState, isEdit = false) {
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
    ...(isEdit && !form.imageChanged ? {} : { image_key: form.profileImageKey ?? '' }),
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
