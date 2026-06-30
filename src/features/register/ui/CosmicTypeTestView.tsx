import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BottomCTA, Button } from '@/shared/ui';
import { Modal } from '@/shared/ui/Modal';
import {
  COSMIC_TYPE_QUESTIONS,
  type CosmicTypeQuestion,
} from '../model/cosmicTypeData';

interface Props {
  /** 테스트 완료 시 호출되는 콜백 */
  onComplete: () => void;
}

/**
 * # CosmicTypeTestView
 * ---
 * - 간단설명: 코스믹 유형 테스트 7문항 4지선다 뷰
 * - 제약사항 및 특이사항:
 *   - JSON 더미데이터 기반으로 질문/선택지 렌더링
 *   - 답변 선택 시 자동으로 다음 질문 이동 (300ms 딜레이)
 *   - 이전/다음 화살표로 질문 탐색 가능
 *   - 모든 문항 응답 완료 시 "테스트 완료" 버튼 활성화
 *   - 미응답 문항 존재 시 팝업으로 안내
 * ---
 * @param onComplete 테스트 완료 시 호출되는 콜백
 * ---
 * @example
 * <CosmicTypeTestView onComplete={() => console.log('완료')} />
 */
export default function CosmicTypeTestView({ onComplete }: Props) {
  const questions = COSMIC_TYPE_QUESTIONS;
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [firstUnansweredIndex, setFirstUnansweredIndex] = useState(0);

  const currentQuestion: CosmicTypeQuestion = questions[currentIndex];
  const selectedAnswer = answers[currentQuestion.id];
  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount === totalQuestions;

  /** 이전 질문으로 이동 */
  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  /** 다음 질문으로 이동 */
  const goNext = useCallback(() => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalQuestions]);

  /** 선택지 선택 핸들러 */
  const handleSelect = useCallback(
    (option: string) => {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
      if (currentIndex < totalQuestions - 1) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 300);
      }
    },
    [currentQuestion.id, currentIndex, totalQuestions],
  );

  /** 테스트 완료 핸들러 */
  const handleComplete = useCallback(() => {
    if (isAllAnswered) {
      onComplete();
      return;
    }
    const unansweredIdx = questions.findIndex((q) => !answers[q.id]);
    setFirstUnansweredIndex(unansweredIdx);
    setShowIncompleteModal(true);
  }, [isAllAnswered, onComplete, questions, answers]);

  /** 미응답 질문으로 이동 */
  const goToUnanswered = useCallback(() => {
    setShowIncompleteModal(false);
    setCurrentIndex(firstUnansweredIndex);
  }, [firstUnansweredIndex]);

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* 일러스트 이미지 영역 (placeholder) */}
        <View className="items-center justify-center mt-4 mb-4" style={{ height: 120 }}>
          <View className="w-[134px] h-[106px] rounded-2xl bg-primary-lightest items-center justify-center">
            <Text className="text-4xl">🔮</Text>
          </View>
        </View>

        {/* 질문 네비게이터 */}
        <View className="px-5 mb-2">
          <View className="flex-row items-center">
            {/* 이전 화살표 */}
            <Pressable
              onPress={goPrev}
              disabled={currentIndex === 0}
              hitSlop={8}
            >
              <ChevronLeftIcon
                color={currentIndex === 0 ? '#BFBFBF' : '#8C39FB'}
              />
            </Pressable>

            {/* 현재 번호 / 전체 */}
            <View className="flex-row items-center mx-1">
              <Text className="text-base font-semibold text-primary">
                {currentIndex + 1}
              </Text>
              <Text className="text-sm font-medium text-[#BFBFBF] mx-0.5">
                /
              </Text>
              <Text className="text-sm font-medium text-[#BFBFBF]">
                {totalQuestions}
              </Text>
            </View>

            {/* 다음 화살표 */}
            <Pressable
              onPress={goNext}
              disabled={currentIndex === totalQuestions - 1}
              hitSlop={8}
            >
              <ChevronRightIcon
                color={
                  currentIndex === totalQuestions - 1 ? '#BFBFBF' : '#8C39FB'
                }
              />
            </Pressable>
          </View>

          {/* 질문 텍스트 */}
          <Text
            className="text-lg font-bold text-[#40403F] mt-2"
            style={{ lineHeight: 25.2 }}
          >
            {currentQuestion.question}
          </Text>
        </View>

        {/* 선택지 목록 */}
        <View className="px-5 mt-3 gap-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option;
            return (
              <Pressable
                key={option}
                onPress={() => handleSelect(option)}
                className={`h-[72px] px-6 rounded-xl flex-row items-center justify-between border ${
                  isSelected
                    ? 'bg-primary-lightest border-primary'
                    : 'bg-[#F5F5F5] border-[#BFBFBF]'
                }`}
              >
                <View className="flex-row items-center flex-1">
                  {isSelected && (
                    <View className="mr-2">
                      <CheckIcon />
                    </View>
                  )}
                  <Text
                    className={`text-base font-medium ${
                      isSelected ? 'text-primary' : 'text-[#888888]'
                    }`}
                    style={{ lineHeight: 22.4 }}
                  >
                    {option}
                  </Text>
                </View>
                <ChevronRightIcon
                  color={isSelected ? '#8C39FB' : '#888888'}
                  size={16}
                />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* 하단 CTA */}
      <BottomCTA>
        <Button
          title="테스트 완료"
          disabled={!isAllAnswered}
          onPress={handleComplete}
        />
      </BottomCTA>

      {/* 미응답 안내 팝업 */}
      <Modal
        visible={showIncompleteModal}
        onClose={() => setShowIncompleteModal(false)}
      >
        <View className="items-center">
          <Text className="text-base font-bold text-text-black text-center mb-1">
            {totalQuestions}문항 중{' '}
            <Text className="text-red-500">
              질문 {firstUnansweredIndex + 1}번
            </Text>{' '}
            미응답
          </Text>
          <Text className="text-base font-medium text-text-black text-center">
            선택하지 않은 답변이 있어요.
          </Text>
        </View>
        <View className="mt-6 w-[260px] self-center">
          <Button title="선택하러 가기" onPress={goToUnanswered} />
        </View>
      </Modal>
    </View>
  );
}

/**
 * # CheckIcon
 * ---
 * - 간단설명: 선택 상태 체크 아이콘 (원형 + 체크마크)
 * ---
 */
function CheckIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0z"
        fill="#8C39FB"
      />
      <Path
        d="M14.5 7l-5.5 5.5L6 9.5"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * # ChevronLeftIcon
 * ---
 * - 간단설명: 왼쪽 방향 화살표 아이콘
 * ---
 */
function ChevronLeftIcon({
  color = '#888888',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * # ChevronRightIcon
 * ---
 * - 간단설명: 오른쪽 방향 화살표 아이콘
 * ---
 */
function ChevronRightIcon({
  color = '#888888',
  size = 24,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9 6l6 6-6 6"
        stroke={color}
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
