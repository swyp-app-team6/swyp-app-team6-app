import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { cn } from '@/shared/lib/cn';

const ANIM_DURATION_MS = 250;

type Direction = 'up' | 'down' | 'left' | 'right';
type FadeType = 'in' | 'out';

/**
 * 페이드·슬라이드 애니메이션 컴포넌트.
 *
 * - `Anim.Fade` — 방향 슬라이드 + 페이드 인/아웃
 * - `Anim.ScaleFade` — 스케일 + 페이드 인/아웃
 *
 * @example
 * ```tsx
 * <Anim.Fade type="in" direction="up">
 *   <View><Text>나타남</Text></View>
 * </Anim.Fade>
 *
 * <Anim.ScaleFade type={visible ? 'in' : 'out'}>
 *   <View><Text>스케일 애니메이션</Text></View>
 * </Anim.ScaleFade>
 * ```
 */
interface AnimProps {
  /** `'in'`: 나타남, `'out'`: 사라짐. 기본값: `'in'` */
  type?: FadeType;
  /** 슬라이드 방향. 기본값: `'up'` */
  direction?: Direction;
  /** 애니메이션 지속 시간(ms). 기본값: `250` */
  duration?: number;
  /** 시작 딜레이(ms). 기본값: `0` */
  delay?: number;
  styleClass?: { root?: string };
  children: React.ReactNode;
}

const DIRECTION_OFFSET = 16;

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: DIRECTION_OFFSET },
  down: { x: 0, y: -DIRECTION_OFFSET },
  left: { x: DIRECTION_OFFSET, y: 0 },
  right: { x: -DIRECTION_OFFSET, y: 0 },
};

function Fade({
  type = 'in',
  direction = 'up',
  duration = ANIM_DURATION_MS,
  delay = 0,
  styleClass,
  children,
}: AnimProps) {
  const offset = directionOffset[direction];
  const opacity = useSharedValue(type === 'in' ? 0 : 1);
  const translateX = useSharedValue(type === 'in' ? offset.x : 0);
  const translateY = useSharedValue(type === 'in' ? offset.y : 0);

  useEffect(() => {
    const config = {
      duration,
      easing: type === 'out' ? Easing.in(Easing.ease) : Easing.out(Easing.ease),
    };
    const run = () => {
      if (type === 'in') {
        opacity.value = withTiming(1, config);
        translateX.value = withTiming(0, config);
        translateY.value = withTiming(0, config);
      } else {
        opacity.value = withTiming(0, config);
        translateX.value = withTiming(-offset.x, config);
        translateY.value = withTiming(-offset.y, config);
      }
    };
    if (delay > 0) {
      const t = setTimeout(run, delay);
      return () => clearTimeout(t);
    }
    run();
  }, [type, direction, duration, delay]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animStyle} className={cn('w-full', styleClass?.root)}>
      {children}
    </Animated.View>
  );
}

function ScaleFade({
  type = 'in',
  duration = ANIM_DURATION_MS,
  delay = 0,
  styleClass,
  children,
}: Omit<AnimProps, 'direction'>) {
  const opacity = useSharedValue(type === 'in' ? 0 : 1);
  const scale = useSharedValue(type === 'in' ? 0.85 : 1);

  useEffect(() => {
    const config = {
      duration,
      easing: type === 'out' ? Easing.in(Easing.ease) : Easing.out(Easing.ease),
    };
    const run = () => {
      if (type === 'in') {
        opacity.value = withTiming(1, config);
        scale.value = withTiming(1, config);
      } else {
        opacity.value = withTiming(0, config);
        scale.value = withTiming(0.85, config);
      }
    };
    if (delay > 0) {
      const t = setTimeout(run, delay);
      return () => clearTimeout(t);
    }
    run();
  }, [type, duration, delay]);

  const animStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animStyle} className={cn('', styleClass?.root)}>
      {children}
    </Animated.View>
  );
}

const Anim = { Fade, ScaleFade };

export default Anim;
