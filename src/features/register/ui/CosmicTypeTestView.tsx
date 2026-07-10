import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { BottomCTA, Button } from '@/shared/ui';
import { Modal } from '@/shared/ui/Modal';
import { useCosmicTestQuery, useCosmicTypeQuery } from '@/entities/cosmic';
import type { CosmicTestQuestion, CosmicTestAnswer } from '@/entities/cosmic';
import { CosmicType } from '@/shared/enums';
import CosmicTypeResultView from './CosmicTypeResultView';

interface Props {
  /** 테스트 완료 시 호출되는 콜백 (계산된 코스믹 유형 전달) */
  onComplete: (cosmicType: CosmicType) => void;
  /** 사용자 닉네임 (미전달 시 '사용자' 기본값) */
  nickname?: string;
  /** 결과 화면 표시 상태 변경 시 호출되는 콜백 */
  onResultShow?: (isResult: boolean) => void;
}

/**
 * # calculateCosmicType
 * ---
 * - 간단설명: 답변별 점수를 합산하여 최종 코스믹 유형 판별
 * ---
 * @param selectedAnswers 질문별 선택된 답변 객체
 */
function calculateCosmicType(
  selectedAnswers: Record<number, CosmicTestAnswer>,
): CosmicType {
  const scores: Record<string, number> = {};

  Object.values(selectedAnswers).forEach((answer) => {
    const type = answer.cosmic_type;
    scores[type] = (scores[type] ?? 0) + answer.score;
  });

  let maxType: CosmicType = CosmicType.SHOOTING_STAR;
  let maxScore = -1;

  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      maxScore = score;
      maxType = type as CosmicType;
    }
  });

  return maxType;
}

/**
 * # CosmicTypeTestView
 * ---
 * - 간단설명: 코스믹 유형 테스트 문항 4지선다 뷰
 * - 제약사항 및 특이사항:
 *   - API에서 질문/선택지 데이터를 조회하여 렌더링
 *   - 답변 선택 시 자동으로 다음 질문 이동 (300ms 딜레이)
 *   - 이전/다음 화살표로 질문 탐색 가능
 *   - 모든 문항 응답 완료 시 "테스트 완료" 버튼 활성화
 *   - 미응답 문항 존재 시 팝업으로 안내
 *   - 답변 점수 합산으로 유형 판별 후 API에서 상세 결과 조회
 * ---
 * @param onComplete 테스트 완료 시 호출되는 콜백 (계산된 코스믹 유형 전달)
 * @param nickname 사용자 닉네임 (미전달 시 '사용자' 기본값)
 * ---
 * @example
 * <CosmicTypeTestView onComplete={(type) => console.log(type)} nickname="홍길동" />
 */
export default function CosmicTypeTestView({ onComplete, nickname = '사용자', onResultShow }: Props) {
  const { data: testData, isLoading } = useCosmicTestQuery();
  const questions = useMemo<CosmicTestQuestion[]>(
    () => testData?.questions ?? [],
    [testData?.questions],
  );
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, CosmicTestAnswer>>({});
  const [showIncompleteModal, setShowIncompleteModal] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [firstUnansweredIndex, setFirstUnansweredIndex] = useState(0);

  useEffect(() => {
    onResultShow?.(showResult);
  }, [showResult, onResultShow]);

  const currentQuestion = questions[currentIndex];
  const selectedAnswer = currentQuestion ? selectedAnswers[currentQuestion.question_id] : undefined;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isAllAnswered = totalQuestions > 0 && answeredCount === totalQuestions;
  /** 마지막 질문 응답 여부 — CTA 활성화 조건 */
  const lastQuestion = questions[totalQuestions - 1];
  const isLastAnswered = lastQuestion ? !!selectedAnswers[lastQuestion.question_id] : false;


  /** 모든 답변 완료 시 계산된 코스믹 유형 */
  const calculatedType = useMemo(() => {
    if (!isAllAnswered) return undefined;
    return calculateCosmicType(selectedAnswers);
  }, [isAllAnswered, selectedAnswers]);

  /** 코스믹 유형 상세 정보 API 조회 */
  const { data: cosmicTypeData, isLoading: isTypeLoading } = useCosmicTypeQuery(calculatedType);

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
    (answer: CosmicTestAnswer) => {
      if (!currentQuestion) return;
      setSelectedAnswers((prev) => ({ ...prev, [currentQuestion.question_id]: answer }));
      if (currentIndex < totalQuestions - 1) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
        }, 300);
      }
    },
    [currentQuestion, currentIndex, totalQuestions],
  );

  /** 테스트 완료 핸들러 - 결과 카드 뷰 표시 */
  const handleComplete = useCallback(() => {
    if (isAllAnswered) {
      setShowResult(true);
      return;
    }
    const unansweredIdx = questions.findIndex((q) => !selectedAnswers[q.question_id]);
    setFirstUnansweredIndex(unansweredIdx);
    setShowIncompleteModal(true);
  }, [isAllAnswered, questions, selectedAnswers]);

  /** 미응답 질문으로 이동 */
  const goToUnanswered = useCallback(() => {
    setShowIncompleteModal(false);
    setCurrentIndex(firstUnansweredIndex);
  }, [firstUnansweredIndex]);

  /** 카드에 적용하기 → 계산된 유형을 콜백으로 전달 */
  const handleApply = useCallback(() => {
    if (calculatedType) {
      onComplete(calculatedType);
    }
  }, [calculatedType, onComplete]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (showResult) {
    if (isTypeLoading || !cosmicTypeData) {
      return (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" />
          <Text className="text-sm text-text-gray4 mt-2">결과를 불러오는 중...</Text>
        </View>
      );
    }

    return (
      <CosmicTypeResultView
        result={cosmicTypeData}
        nickname={nickname}
        onApply={handleApply}
      />
    );
  }

  if (!currentQuestion) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-sm text-text-gray4">질문을 불러올 수 없습니다</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1 mt-10"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* TODO: 여기에 질문유형별 캐릭터 png 필요함 */}
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
          {currentQuestion.answers.map((answer) => {
            const isSelected = selectedAnswer?.answer_id === answer.answer_id;
            return (
              <Pressable
                key={answer.answer_id}
                onPress={() => handleSelect(answer)}
                className={`h-[72px] px-6 rounded-xl flex-row items-center justify-between border ${isSelected
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
                    className={`text-base font-medium ${isSelected ? 'text-primary' : 'text-[#888888]'
                      }`}
                    style={{ lineHeight: 22.4 }}
                  >
                    {answer.answer}
                  </Text>
                </View>
                {currentIndex < totalQuestions - 1 && (
                  <ChevronRightIcon
                    color={isSelected ? '#8C39FB' : '#888888'}
                    size={16}
                  />
                )}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* 하단 CTA — 마지막 문항에서만 노출 */}
      {currentIndex === totalQuestions - 1 && (
        <BottomCTA>
          <Button
            title="테스트 완료"
            disabled={!isLastAnswered}
            onPress={handleComplete}
          />
        </BottomCTA>
      )}

      {/* 미응답 안내 팝업 */}
      <Modal
        visible={showIncompleteModal}
        onClose={() => setShowIncompleteModal(false)}
      >
        <View className="items-center">
          <Text className="text-sm font-medium text-[#1B1B1B] text-center">
            {totalQuestions}문항 중{' '}
            <Text className="text-[#E01619] text-sm font-medium">
              질문 {firstUnansweredIndex + 1}번 미응답
            </Text>
          </Text>
          <Text
            className="text-base font-semibold text-[#1A1A1A] text-center"
            style={{ lineHeight: 22.4 }}
          >
            선택하지 않은 답변이 있어요.
          </Text>
        </View>
        <View className="items-center my-4">
          <Image
            source={require('@/assets/characters/cosmic-test-warn.png')}
            style={{ width: 40, height: 111 }}
            resizeMode="contain"
          />
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
