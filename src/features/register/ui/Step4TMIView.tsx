import React, { useRef, useState, useMemo } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { TMICard, BottomCTA, Button, ChipSelect } from '@/shared/ui';
import BottomSheet, { type BottomSheetHandle } from '@/shared/ui/BottomSheet';
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
 * ---
 * @example
 * <Step4TMIView />
 */
export default function Step4TMIView() {
  const { form, addTMIAnswer, removeTMIAnswer, nextStep } = useRegisterFormStore();
  const [selectedCategory, setSelectedCategory] = useState<TMICategory>('ALL');
  const [activeQuestion, setActiveQuestion] = useState<TMIQuestion | null>(null);
  const [textInput, setTextInput] = useState('');
  const sheetRef = useRef<BottomSheetHandle>(null);

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
    sheetRef.current?.open();
  };

  /** 선택형 답변 선택 */
  const handleChoiceSelect = (answer: string) => {
    if (!activeQuestion) return;
    addTMIAnswer({ questionId: activeQuestion.id, answer });
    sheetRef.current?.close();
    setActiveQuestion(null);
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

  return (
    <View className="flex-1">
      <ScrollView className="flex-1 pt-6" showsVerticalScrollIndicator={false}>
        <View className="px-5">
          <Text className="text-xl font-bold text-text-black mb-2">
            TMI를 등록
          </Text>
        </View>

        {/* 카테고리 필터 */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4"
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
            return (
              <TMICard
                key={question.id}
                tag={getCategoryLabel(question.category)}
                question={question.question}
                answer={answer}
                selected={!!answer}
                onPress={() => handleQuestionPress(question)}
              />
            );
          })}
        </View>

        {form.tmiAnswers.length > 0 && (
          <Text className="text-xs text-text-gray4 text-center mt-4 mb-2">
            {form.tmiAnswers.length}개의 TMI를 선택했어요
          </Text>
        )}

        <View className="h-24" />
      </ScrollView>

      <BottomCTA>
        <Button title="다음으로" onPress={nextStep} />
      </BottomCTA>

      {/* 답변 바텀시트 */}
      <BottomSheet
        ref={sheetRef}
        title={activeQuestion?.question ?? ''}
        onClose={() => setActiveQuestion(null)}
      >
        {activeQuestion?.answerType === 'CHOICE' && activeQuestion.options ? (
          <View className="gap-3 pb-4">
            {activeQuestion.options.map((option) => (
              <Button
                key={option}
                title={option}
                variant="secondary"
                onPress={() => handleChoiceSelect(option)}
              />
            ))}
          </View>
        ) : (
          <View className="pb-4">
            <BottomSheetTextInput
              value={textInput}
              onChangeText={setTextInput}
              placeholder="답변을 입력해주세요 (5~100자)"
              placeholderTextColor="#BFBFBF"
              maxLength={100}
              multiline
              className="rounded-xl border border-text-gray6 p-4 text-base text-text-black min-h-[80px]"
              textAlignVertical="top"
            />
            <Text className="text-xs text-text-gray4 text-right mt-1">
              {textInput.length}/100
            </Text>
            <Button
              title="확인"
              disabled={textInput.length < 5}
              onPress={handleTextSubmit}
              className="mt-3"
            />
          </View>
        )}
      </BottomSheet>
    </View>
  );
}
