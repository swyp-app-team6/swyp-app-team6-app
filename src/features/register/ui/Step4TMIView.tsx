import React, { useRef, useState, useMemo } from 'react';
import { Pressable, View, Text, ScrollView, ActivityIndicator } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TMICard, BottomCTA, Button, ChipSelect, Textbox, SelectedTMIPreviewButton, Checkbox } from '@/shared/ui';
import Tag from '@/shared/ui/Tag';
import BottomSheet, { type BottomSheetHandle } from '@/shared/ui/BottomSheet';
import { useProfileDataStore } from '@/entities/user';
import { useQuestionsQuery } from '@/entities/question';
import type { MultipleQuestion, ShortQuestion, QuestionAnswer } from '@/entities/question';
import { TMIQuestionType } from '@/shared/enums';
import useRegisterFormStore from '../model/useRegisterFormStore';
import useRegisterStepStore from '../model/useRegisterStepStore';
import { tmiKey, TMI_CATEGORY_OPTIONS, type TMICategoryFilter } from '../model/types';

/**
 * TMI 질문 통합 타입 (선택형 + 단답형)
 * - answerType: 'CHOICE' = 선택형, 'TEXT' = 단답형
 * - answers: 선택형일 때 선택지 목록
 */
interface TMIQuestionUI {
  id: number;
  type: TMIQuestionType;
  content: string;
  answerType: 'CHOICE' | 'TEXT';
  answers?: QuestionAnswer[];
}

/**
 * # Step4TMIView
 * ---
 * - 간단설명: 프로필 등록 4단계 - TMI 등록 (선택사항)
 * - 제약사항 및 특이사항:
 *   - API에서 질문 목록을 조회하여 표시
 *   - 카테고리 필터로 질문 목록 필터링
 *   - 선택형: 바텀시트에서 선택지 중 1개 탭
 *   - 서술형: 바텀시트에서 텍스트 직접 입력 (5~100자)
 *   - 입력 없이 건너뛰기 가능
 *   - "다음으로" 클릭 시 form 데이터 전체를 useProfileDataStore에 저장 후 다음 단계로 이동
 * ---
 * @example
 * <Step4TMIView />
 */
export default function Step4TMIView() {
  const { form, addTMIAnswer } = useRegisterFormStore();
  const { nextStep } = useRegisterStepStore();
  const { setProfileData } = useProfileDataStore();
  const { data: questionData, isLoading } = useQuestionsQuery();
  const [selectedCategory, setSelectedCategory] = useState<TMICategoryFilter>('ALL');
  const [activeQuestion, setActiveQuestion] = useState<TMIQuestionUI | null>(null);
  const [textInput, setTextInput] = useState('');
  const [choiceInput, setChoiceInput] = useState<QuestionAnswer | null>(null);
  const sheetRef = useRef<BottomSheetHandle>(null);
  const previewSheetRef = useRef<BottomSheetHandle>(null);

  /** API 질문을 통합 타입으로 변환 */
  const allQuestions = useMemo<TMIQuestionUI[]>(() => {
    if (!questionData) return [];
    const multiple: TMIQuestionUI[] = (questionData.multiple_questions ?? []).map(
      (q: MultipleQuestion) => ({
        id: q.id,
        type: q.type,
        content: q.content,
        answerType: 'CHOICE' as const,
        answers: q.answers,
      }),
    );
    const short: TMIQuestionUI[] = (questionData.short_questions ?? []).map(
      (q: ShortQuestion) => ({
        id: q.id,
        type: q.type,
        content: q.content,
        answerType: 'TEXT' as const,
      }),
    );
    return [...multiple, ...short];
  }, [questionData]);

  /** 카테고리 필터링된 질문 목록 */
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'ALL') return allQuestions;
    return allQuestions.filter((q) => q.type === selectedCategory);
  }, [selectedCategory, allQuestions]);

  /** 질문 카드 탭 핸들러 - 기존 답변이 있으면 답변을 유지한 채 바텀시트 재오픈 */
  const handleQuestionPress = (question: TMIQuestionUI) => {
    const key = tmiKey(question.answerType, question.id);
    const existing = form.tmiAnswers.find(
      (a) => tmiKey(a.answerKind, a.questionId) === key,
    );
    setActiveQuestion(question);
    if (existing) {
      setTextInput(existing.answerKind === 'TEXT' ? existing.answer : '');
      setChoiceInput(
        existing.answerKind === 'CHOICE' && question.answers
          ? question.answers.find((a) => a.answer_id === existing.answerId) ?? null
          : null,
      );
    } else {
      setTextInput('');
      setChoiceInput(null);
    }
    sheetRef.current?.open();
  };

  /** 선택형 옵션 토글 */
  const handleChoiceToggle = (answer: QuestionAnswer) => {
    setChoiceInput((prev) => (prev?.answer_id === answer.answer_id ? null : answer));
  };

  /** 선택형 답변 확정 */
  const handleChoiceSubmit = () => {
    if (!activeQuestion || !choiceInput) return;
    addTMIAnswer({
      questionId: activeQuestion.id,
      answerKind: 'CHOICE',
      questionType: activeQuestion.type,
      question: activeQuestion.content,
      answer: choiceInput.content,
      answerId: choiceInput.answer_id,
    });
    sheetRef.current?.close();
    setActiveQuestion(null);
    setChoiceInput(null);
  };

  /** 서술형 답변 제출 */
  const handleTextSubmit = () => {
    if (!activeQuestion || textInput.length < 1) return;
    addTMIAnswer({
      questionId: activeQuestion.id,
      answerKind: 'TEXT',
      questionType: activeQuestion.type,
      question: activeQuestion.content,
      answer: textInput,
    });
    sheetRef.current?.close();
    setActiveQuestion(null);
    setTextInput('');
  };

  /** 질문별 답변 여부 확인 */
  const getAnswer = (answerType: 'CHOICE' | 'TEXT', questionId: number) => {
    const key = tmiKey(answerType, questionId);
    return form.tmiAnswers.find(
      (a) => tmiKey(a.answerKind, a.questionId) === key,
    )?.answer;
  };

  /** 카테고리 라벨 가져오기 */
  const getCategoryLabel = (type: TMIQuestionType) => {
    return TMI_CATEGORY_OPTIONS.find((c) => c.value === type)?.label ?? '';
  };

  /** 선택된 TMI 질문+답변 목록 */
  const selectedTMIList = useMemo(() => {
    return form.tmiAnswers.map((a) => ({
      questionId: a.questionId,
      answerKind: a.answerKind,
      type: a.questionType,
      question: a.question,
      answer: a.answer,
    }));
  }, [form.tmiAnswers]);

  /** 미리보기에서 TMI 질문 탭 시 답변 바텀시트로 이동 */
  const handlePreviewItemPress = (item: (typeof selectedTMIList)[number]) => {
    const original = allQuestions.find(
      (q) => q.id === item.questionId && q.answerType === item.answerKind,
    );
    if (!original) return;
    previewSheetRef.current?.close();
    setActiveQuestion(original);
    setTextInput(original.answerType === 'TEXT' ? item.answer : '');
    setChoiceInput(
      original.answerType === 'CHOICE' && original.answers
        ? original.answers.find((a) => a.content === item.answer) ?? null
        : null,
    );
    setTimeout(() => sheetRef.current?.open(), 300);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 pt-6" showsVerticalScrollIndicator={false}>
        <View className="px-5">
          <Text className="text-xl font-bold text-text-black leading-7">
            {'프로필을 꾸밀 나만의 TMI를\n선택하고 답변해주세요'}
          </Text>
        </View>

        {/* 카테고리 필터 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-6 mb-4"
          contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}
        >
          {TMI_CATEGORY_OPTIONS.map((cat) => (
            <ChipSelect.Chip
              key={cat.value}
              label={cat.label}
              selected={selectedCategory === cat.value}
              onPress={() => setSelectedCategory(cat.value)}
            />
          ))}
        </ScrollView>

        {/* 질문 목록 */}
        <View className="px-5 gap-3">
          {filteredQuestions.map((question) => {
            const answer = getAnswer(question.answerType, question.id);
            const isSelected = !!answer;
            return (
              <View key={`${question.answerType}-${question.id}`} className="flex-row items-start gap-3">
                {/* 체크박스 */}
                <View className="mt-4">
                  <Checkbox
                    checked={isSelected}
                    onValueChange={() => handleQuestionPress(question)}
                  />
                </View>
                {/* 카드 */}
                <View className="flex-1">
                  <TMICard
                    tag={getCategoryLabel(question.type)}
                    question={question.content}
                    answer={answer}
                    selected={isSelected}
                    onPress={() => handleQuestionPress(question)}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <View className="h-40" />
      </ScrollView>

      <BottomCTA>
        {form.tmiAnswers.length > 0 && (
          <SelectedTMIPreviewButton
            count={form.tmiAnswers.length}
            onPress={() => previewSheetRef.current?.open()}
            styleClass={{ root: 'mb-3' }}
          />
        )}
        <Button
          title="다음으로"
          onPress={() => {
            setProfileData({
              nickname: form.nickname,
              profileImageUri: form.profileImageUri,
              profileImageKey: form.profileImageKey,
              gender: form.gender,
              age: form.age,
              jobField: form.jobField,
              region: form.region,
              subArea: form.subArea,
              bio: form.bio,
              interests: [...form.interests],
              tmiAnswers: form.tmiAnswers.map((a) => ({ ...a })),
            });
            nextStep();
          }}
        />
      </BottomCTA>

      {/* 답변 바텀시트 */}
      <BottomSheet
        ref={sheetRef}
        showClose
        onClose={() => {
          setActiveQuestion(null);
          setChoiceInput(null);
        }}
      >
        {activeQuestion?.answerType === 'CHOICE' && activeQuestion.answers ? (
          <View className="gap-4 pb-4">
            {/* 태그 + 질문 헤더 */}
            <View className="gap-4">
              <Tag
                label={getCategoryLabel(activeQuestion.type)}
                variant="primary"
              />
              <Text className="text-xl font-bold text-text-black leading-7">
                {activeQuestion.content}
              </Text>
            </View>

            {/* 선택지 목록 */}
            {activeQuestion.answers.map((option) => {
              const isActive = choiceInput?.answer_id === option.answer_id;
              return (
                <Pressable
                  key={option.answer_id}
                  onPress={() => handleChoiceToggle(option)}
                  className={`h-[52px] flex-row items-center justify-between rounded-xl px-4 ${
                    isActive
                      ? 'bg-primary-lightest border border-primary'
                      : 'bg-[#F5F5F5]'
                  }`}
                >
                  <Text
                    className={`flex-1 text-sm ${
                      isActive
                        ? 'font-semibold text-primary'
                        : 'font-medium text-text-black'
                    }`}
                  >
                    {option.content}
                  </Text>
                  {isActive && <CheckIcon />}
                </Pressable>
              );
            })}

            {/* 답변 완료 버튼 */}
            <Button
              title="답변 완료"
              disabled={!choiceInput}
              onPress={handleChoiceSubmit}
            />
          </View>
        ) : (
          <View className="pb-4">
            {/* 태그 + 질문 헤더 */}
            <View className="gap-4 mb-4">
              {activeQuestion && (
                <Tag
                  label={getCategoryLabel(activeQuestion.type)}
                  variant="primary"
                />
              )}
              <Text className="text-xl font-bold text-text-black leading-7">
                {activeQuestion?.content ?? ''}
              </Text>
            </View>

            <Textbox
              value={textInput}
              onChangeText={setTextInput}
              placeholder="답변을 입력해주세요 (1~100자)"
              maxLength={100}
              minHeight={80}
              isBottomSheet
            />
            <Button
              title="답변 완료"
              disabled={textInput.length < 1}
              onPress={handleTextSubmit}
              className="mt-3"
            />
          </View>
        )}
      </BottomSheet>

      {/* 선택한 TMI 미리보기 바텀시트 */}
      <BottomSheet
        ref={previewSheetRef}
        title="선택한 TMI 미리보기"
        snapPoints={['60%']}
      >
        <View className="gap-3 pb-4">
          {selectedTMIList.map((item) => (
            <TMICard
              key={tmiKey(item.answerKind, item.questionId)}
              tag={getCategoryLabel(item.type)}
              question={item.question}
              answer={item.answer}
              selected
              onPress={() => handlePreviewItemPress(item)}
            />
          ))}
        </View>
      </BottomSheet>
    </View>
  );
}

/** 선택 체크 아이콘 (#7832D5) */
function CheckIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.2 12l3.6 3.6 6-6"
        stroke="#7832D5"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
