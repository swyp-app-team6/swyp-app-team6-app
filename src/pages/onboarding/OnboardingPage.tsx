import React, { useCallback, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Button, Layout, StepView } from '@/shared/ui';
import type { NavigationPropType } from '@/shared/types';
import useConditionStateStore from '@/shared/model/conditionStateStore';

/** 온보딩 슬라이드 데이터 */
const ONBOARDING_SLIDES = [
  {
    title: '프로필 등록',
    description: '상대방에게 어필할 수 있는\n나만의 프로필을 등록할 수 있어요',
  },
  {
    title: '프로필 교환',
    description: '프로필의 QR코드와 카메라 기능을 사용해\n서로의 프로필 정보를 교환할 수 있어요',
  },
  {
    title: '교환한 프로필 후기 작성',
    description: '교환한 상대방 프로필에 나만 보는 후기를\n작성해 상대방을 기억할 수 있어요',
  },
] as const;

/**
 * # OnboardingPage
 * ---
 * - 간단설명: 앱 최초 실행 시 3단계 스와이프 온보딩 화면
 * - 제약사항 및 특이사항:
 *   - conditionStateStore 'hasSeenOnboarding' 플래그로 최초 실행 판별
 *   - 좌우 스와이프로 단계 이동 가능
 *   - 마지막 단계에서는 "건너뛰기" 숨김, "시작하기" 표시
 * TODO: slide step ui ui/state hook으로 분리 필ㅛ
 * ---
 * @example
 * <OnboardingPage />
 */
function OnboardingPage() {
  const navigation = useNavigation<NavigationPropType>();
  const { setHasSeenOnboarding } = useConditionStateStore();
  const [currentStep, setCurrentStep] = useState(0);
  const isLastStep = currentStep === ONBOARDING_SLIDES.length - 1;

  /** 온보딩 완료 후 로그인 화면으로 이동 */
  const handleComplete = useCallback(async () => {
    await setHasSeenOnboarding(true);
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });
  }, [navigation, setHasSeenOnboarding]);

  /** 다음 단계로 이동 */
  const handleNext = useCallback(() => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  }, [isLastStep, handleComplete]);

  /** 이전 단계로 이동 */
  const handlePrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  /** 좌우 스와이프 제스처 */
  const swipeGesture = Gesture.Pan()
    .activeOffsetX([-30, 30])
    .onEnd((e) => {
      if (e.translationX < -50 && currentStep < ONBOARDING_SLIDES.length - 1) {
        runOnJS(setCurrentStep)(currentStep + 1);
      } else if (e.translationX > 50 && currentStep > 0) {
        runOnJS(setCurrentStep)(currentStep - 1);
      }
    });

  return (
    <Layout styleClass={{ root: 'bg-white' }}>
      {/* 건너뛰기 버튼 */}
      <View className="flex-row justify-end px-6 pt-4" style={{ minHeight: 44 }}>
        {!isLastStep && (
          <Pressable onPress={handleComplete} hitSlop={8}>
            <Text className="text-base text-gray-400">건너뛰기</Text>
          </Pressable>
        )}
      </View>

      {/* 슬라이드 영역 */}
      <GestureDetector gesture={swipeGesture}>
        <View className="flex-1">
          <StepView currentStep={currentStep}>
            {ONBOARDING_SLIDES.map((slide, index) => (
              <StepView.Step key={index}>
                <View className="flex-1 justify-center items-center px-8">
                  {/* 일러스트 플레이스홀더 */}
                  <View className="w-64 h-64 bg-gray-100 rounded-2xl items-center justify-center mb-10">
                    <Text className="text-5xl text-gray-300">📱</Text>
                  </View>

                  {/* 제목 */}
                  <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
                    {slide.title}
                  </Text>

                  {/* 설명 */}
                  <Text className="text-base text-gray-500 text-center leading-6">
                    {slide.description}
                  </Text>
                </View>
              </StepView.Step>
            ))}
          </StepView>
        </View>
      </GestureDetector>

      {/* 하단: 인디케이터 + CTA 버튼 */}
      <View className="px-6 pb-10">
        {/* 인디케이터 */}
        <View className="flex-row justify-center gap-2 mb-8">
          {ONBOARDING_SLIDES.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep ? 'bg-gray-900' : 'bg-gray-200'
              }`}
            />
          ))}
        </View>

        {/* CTA 버튼 */}
        <Button
          title={isLastStep ? '시작하기' : '다음으로'}
          variant='primary'
          onPress={handleNext}
        />
      </View>
    </Layout>
  );
}

export default OnboardingPage;
