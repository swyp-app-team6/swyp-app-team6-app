import React, { useCallback, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Button, Layout, StepView } from '@/shared/ui';
import type { NavigationPropType } from '@/shared/types';
import useConditionStateStore from '@/shared/model/conditionStateStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/** 온보딩 캐릭터 이미지 */
const onboarding1 = require('@/assets/characters/onboarding-1.png');
const onboarding2 = require('@/assets/characters/onboarding-2.png');
const onboarding3 = require('@/assets/characters/onboarding-3.png');
const onboarding4 = require('@/assets/characters/onboarding-4.png');

/** 온보딩 슬라이드 데이터 (4단계) */
const ONBOARDING_SLIDES = [
  {
    title: '프로필 등록',
    description: '상대방에게 어필할 수 있는\n나만의 프로필을 등록할 수 있어요',
    image: onboarding1,
  },
  {
    title: '프로필 교환',
    description: '프로필의 QR코드와 스캔 기능을 사용해\n서로의 프로필 정보를 교환할 수 있어요',
    image: onboarding2,
  },
  {
    title: '관심사 찾기',
    description: '프로필을 교환하면 상대방과 자신의\n공통된 관심사를 볼 수 있어요',
    image: onboarding3,
  },
  {
    title: '교환한 프로필 후기 작성',
    description: '교환한 상대방 프로필에\n나만 보는 후기를 작성해 상대방을 기억할 수 있어요',
    image: onboarding4,
  },
];

/**
 * # OnboardingPage
 * ---
 * - 간단설명: 앱 최초 실행 시 4단계 스와이프 온보딩 화면
 * - 제약사항 및 특이사항:
 *   - conditionStateStore 'hasSeenOnboarding' 플래그로 최초 실행 판별
 *   - 좌우 스와이프로 단계 이동 가능
 *   - 마지막 단계에서는 "건너뛰기" 숨김, "시작하기" 표시
 * ---
 * @example
 * <OnboardingPage />
 */
function OnboardingPage() {
  const navigation = useNavigation<NavigationPropType>();
  const { setHasSeenOnboarding } = useConditionStateStore();
  const { top } = useSafeAreaInsets();
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
      {/* 슬라이드 영역 */}
      <GestureDetector gesture={swipeGesture}>
        <View className="flex-1" style={{ paddingTop: top }}>
          <StepView currentStep={currentStep}>
            {ONBOARDING_SLIDES.map((slide, index) => (
              <StepView.Step key={index}>
                <View className="flex-1 px-5">
                  {/* 제목 (이미지 위) */}
                  <View className="items-center pt-10 pb-5">
                    <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
                      {slide.title}
                    </Text>
                    <Text className="text-sm text-gray-500 text-center leading-5">
                      {slide.description}
                    </Text>
                  </View>

                  {/* 일러스트 이미지 */}
                  <View
                    className="w-full items-center justify-center rounded-2xl"
                    style={{ height: 440 }}
                  >
                    <Image
                      source={slide.image}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </StepView.Step>
            ))}
          </StepView>
        </View>
      </GestureDetector>

      {/* 하단: 인디케이터 + 건너뛰기 + CTA 버튼 */}
      <View className="px-5 pb-10">
        {/* 인디케이터 */}
        <View className="flex-row justify-center gap-2 mb-3">
          {ONBOARDING_SLIDES.map((_, index) => (
            <View
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentStep ? 'bg-primary' : 'bg-gray-200'
              }`}
            />
          ))}
        </View>

        {/* 건너뛰기 (마지막 단계에서 숨김) */}
        <View className="items-center mb-4" style={{ minHeight: 24 }}>
          {!isLastStep && (
            <Pressable onPress={handleComplete} hitSlop={8}>
              <Text className="text-sm text-gray-400 underline">건너뛰기</Text>
            </Pressable>
          )}
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
