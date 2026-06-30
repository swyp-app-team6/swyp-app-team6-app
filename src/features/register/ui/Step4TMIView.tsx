import React, { useRef, useState, useMemo } from 'react';
import { Pressable, View, Text, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { TMICard, BottomCTA, Button, ChipSelect, Textbox, SelectedTMIPreviewButton } from '@/shared/ui';
import Tag from '@/shared/ui/Tag';
import BottomSheet, { type BottomSheetHandle } from '@/shared/ui/BottomSheet';
import { useProfileDataStore } from '@/entities/user';
import useRegisterFormStore from '../model/useRegisterFormStore';
import { TMI_QUESTIONS } from '../model/tmiData';
import { TMI_CATEGORY_OPTIONS, type TMICategory, type TMIQuestion } from '../model/types';

/**
 * # Step4TMIView
 * ---
 * - 간단설명: 프로필 등록 4단계 - TMI 등록 (선택사항)
 * - 제약사항 및 특이사항:
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
  const { form, addTMIAnswer, removeTMIAnswer, nextStep } = useRegisterFormStore();
  const { setProfileData } = useProfileDataStore();
  const [selectedCategory, setSelectedCategory] = useState<TMICategory>('ALL');
  const [activeQuestion, setActiveQuestion] = useState<TMIQuestion | null>(null);
  const [textInput, setTextInput] = useState('');
  const [choiceInput, setChoiceInput] = useState<string | null>(null);
  const sheetRef = useRef<BottomSheetHandle>(null);
  const previewSheetRef = useRef<BottomSheetHandle>(null);

  /** 카테고리 필터링된 질문 목록 */
  const filteredQuestions = useMemo(() => {
    if (selectedCategory === 'ALL') return TMI_QUESTIONS;
    return TMI_QUESTIONS.filter((q) => q.category === selectedCategory);
  }, [selectedCategory]);

  /** 질문 카드 탭 핸들러 */
  const handleQuestionPress = (question: TMIQuestion) => {
    const existing = form.tmiAnswers.find((a) => a.questionId === question.id);
    if (existing) {
      removeTMIAnswer(question.id);
      return;
    }
    setActiveQuestion(question);
    setTextInput('');
    setChoiceInput(null);
    sheetRef.current?.open();
  };

  /** 선택형 옵션 토글 */
  const handleChoiceToggle = (option: string) => {
    setChoiceInput((prev) => (prev === option ? null : option));
  };

  /** 선택형 답변 확정 */
  const handleChoiceSubmit = () => {
    if (!activeQuestion || !choiceInput) return;
    addTMIAnswer({ questionId: activeQuestion.id, answer: choiceInput });
    sheetRef.current?.close();
    setActiveQuestion(null);
    setChoiceInput(null);
  };

  /** 서술형 답변 제출 */
  const handleTextSubmit = () => {
    if (!activeQuestion || textInput.length < 5) return;
    addTMIAnswer({ questionId: activeQuestion.id, answer: textInput });
    sheetRef.current?.close();
    setActiveQuestion(null);
    setTextInput('');
  };

  /** 질문별 답변 여부 확인 */
  const getAnswer = (questionId: string) => {
    return form.tmiAnswers.find((a) => a.questionId === questionId)?.answer;
  };

  /** 카테고리 라벨 가져오기 */
  const getCategoryLabel = (category: TMICategory) => {
    return TMI_CATEGORY_OPTIONS.find((c) => c.value === category)?.label ?? '';
  };

  /** 선택된 TMI 질문+답변 목록 */
  const selectedTMIList = useMemo(() => {
    return form.tmiAnswers.map((a) => {
      const question = TMI_QUESTIONS.find((q) => q.id === a.questionId);
      return {
        questionId: a.questionId,
        category: question?.category ?? 'ALL',
        question: question?.question ?? '',
        answer: a.answer,
      };
    });
  }, [form.tmiAnswers]);

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
            const answer = getAnswer(question.id);
            const isSelected = !!answer;
            return (
              <View key={question.id} className="flex-row items-start gap-3">
                {/* 체크박스 */}
                <View className="w-6 h-6 items-center justify-center mt-4">
                  <View
                    className={`w-[18px] h-[18px] rounded-[4px] border-2 ${
                      isSelected
                        ? 'bg-primary border-primary'
                        : 'bg-white border-[#BFBFBF]'
                    }`}
                  />
                </View>
                {/* 카드 */}
                <View className="flex-1">
                  <TMICard
                    tag={getCategoryLabel(question.category)}
                    question={question.question}
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
        {activeQuestion?.answerType === 'CHOICE' && activeQuestion.options ? (
          <View className="gap-4 pb-4">
            {/* 태그 + 질문 헤더 */}
            <View className="gap-4">
              <Tag
                label={getCategoryLabel(activeQuestion.category)}
                variant="primary"
              />
              <Text className="text-xl font-bold text-text-black leading-7">
                {activeQuestion.question}
              </Text>
            </View>

            {/* 선택지 목록 */}
            {activeQuestion.options.map((option) => {
              const isActive = choiceInput === option;
              return (
                <Pressable
                  key={option}
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
                    {option}
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
                  label={getCategoryLabel(activeQuestion.category)}
                  variant="primary"
                />
              )}
              <Text className="text-xl font-bold text-text-black leading-7">
                {activeQuestion?.question ?? ''}
              </Text>
            </View>

            <Textbox
              value={textInput}
              onChangeText={setTextInput}
              placeholder="답변을 입력해주세요 (5~100자)"
              maxLength={100}
              minHeight={80}
              isBottomSheet
            />
            <Button
              title="답변 완료"
              disabled={textInput.length < 5}
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
              key={item.questionId}
              tag={getCategoryLabel(item.category as TMICategory)}
              question={item.question}
              answer={item.answer}
              selected
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
