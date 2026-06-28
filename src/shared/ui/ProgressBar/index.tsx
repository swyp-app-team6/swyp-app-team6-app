import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { cn } from '@/shared/lib/cn';

interface StyleClass {
  root?: string;
  track?: string;
  fill?: string;
}

/**
 * # ProgressBar
 * ---
 * - 간단설명: 선형 프로그레스 바 컴포넌트
 * - 제약사항 및 특이사항:
 *   - value는 0~100 범위로 클램핑됨
 *   - steps 지정 시 해당 단계에 맞게 값이 스냅됨
 *   - animated 기본 활성화 (react-native-reanimated 사용)
 * ---
 * @param value 현재 진행률 (0~100)
 * @param steps 전체 단계 수. 미지정 시 연속 진행바
 * @param animated 애니메이션 활성 여부. 기본값: true
 * ---
 * @example
 * ```tsx
 * <ProgressBar value={40} />
 * <ProgressBar value={2} steps={5} />
 * ```
 */

export interface ProgressBarProps {
  /** 현재 진행률 (0~100) */
  value: number;
  /** 전체 단계 수. 미지정 시 연속 진행바 */
  steps?: number;
  /** 애니메이션 활성 여부. 기본값: true */
  animated?: boolean;
  styleClass?: StyleClass;
}

export default function ProgressBar({
  value,
  steps,
  animated = true,
  styleClass,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const percent = steps
    ? Math.round(clamped / (100 / steps)) * (100 / steps)
    : clamped;

  const width = useSharedValue(percent);

  useEffect(() => {
    if (animated) {
      width.value = withTiming(percent, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
    } else {
      width.value = percent;
    }
  }, [percent, animated, width]);

  const fillStyle = useAnimatedStyle(() => ({
    width: `${width.value}%`,
  }));

  return (
    <View className={cn('w-full', styleClass?.root)}>
      <View
        className={cn(
          'h-1 w-full rounded-full bg-text-gray6',
          styleClass?.track,
        )}
      >
        <Animated.View
          className={cn('h-1 rounded-full bg-primary', styleClass?.fill)}
          style={fillStyle}
        />
      </View>
    </View>
  );
}
