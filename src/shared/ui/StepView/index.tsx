import React, { Children, useMemo } from 'react';
import { View, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { cn } from '@/shared/lib/cn';

interface StepViewProps {
  /** 현재 활성 단계 인덱스 (0부터 시작) */
  currentStep: number;
  /** 애니메이션 지속 시간(ms). 기본값: 300 */
  duration?: number;
  styleClass?: { root?: string };
  children: React.ReactNode;
}

interface StepProps {
  children: React.ReactNode;
  styleClass?: { root?: string };
}

/**
 * # StepView
 * ---
 * - 간단설명: 단계별 슬라이드 전환 뷰 컨테이너
 * - 제약사항 및 특이사항:
 *   - children은 StepView.Step 컴포넌트여야 함
 *   - currentStep이 범위를 벗어나면 마지막/첫 번째 단계에 고정
 * ---
 * @param currentStep 현재 활성 단계 인덱스 (0부터)
 * @param duration 애니메이션 지속 시간(ms)
 * @param children StepView.Step 컴포넌트들
 * ---
 * @example
 * ```tsx
 * const [step, setStep] = useState(0);
 *
 * <StepView currentStep={step}>
 *   <StepView.Step>
 *     <Text>1단계 내용</Text>
 *   </StepView.Step>
 *   <StepView.Step>
 *     <Text>2단계 내용</Text>
 *   </StepView.Step>
 * </StepView>
 * ```
 */
function StepView({
  currentStep,
  duration = 300,
  styleClass,
  children,
}: StepViewProps) {
  const { width } = useWindowDimensions();
  const steps = Children.toArray(children);
  const clampedStep = Math.max(0, Math.min(currentStep, steps.length - 1));

  const translateX = useSharedValue(-clampedStep * width);

  React.useEffect(() => {
    translateX.value = withTiming(-clampedStep * width, {
      duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [clampedStep, width, duration, translateX]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const containerWidth = useMemo(() => steps.length * width, [steps.length, width]);

  return (
    <View className={cn('flex-1 overflow-hidden', styleClass?.root)}>
      <Animated.View
        style={[animStyle, { width: containerWidth }]}
        className="flex-1 flex-row"
      >
        {steps.map((step, i) => (
          <View key={i} style={{ width }} className="flex-1">
            {step}
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

/**
 * # StepView.Step
 * ---
 * - 간단설명: StepView 내부의 개별 단계 컨테이너
 * ---
 * @param children 단계 내부 컨텐츠
 */
function Step({ children, styleClass }: StepProps) {
  return (
    <View className={cn('flex-1', styleClass?.root)}>
      {children}
    </View>
  );
}

StepView.Step = Step;

export default StepView;
