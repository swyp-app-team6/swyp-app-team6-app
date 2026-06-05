import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { cn } from '@/shared/lib/cn';

interface StyleClass {
  root?: string;
}

function useShimmer() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.4, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, []);

  return useAnimatedStyle(() => ({ opacity: opacity.value }));
}

/**
 * 로딩 상태를 나타내는 shimmer 애니메이션 스켈레톤 컴포넌트.
 *
 * - `Skeleton.Box` — 직사각형 플레이스홀더
 * - `Skeleton.Circle` — 원형 플레이스홀더
 * - `Skeleton.Container` — Box/Circle을 감싸는 래퍼
 *
 * @example
 * ```tsx
 * <Skeleton.Container styleClass={{ root: 'gap-3' }}>
 *   <Skeleton.Circle styleClass={{ root: 'h-10 w-10' }} />
 *   <Skeleton.Box styleClass={{ root: 'h-4 w-3/4' }} />
 *   <Skeleton.Box styleClass={{ root: 'h-4 w-full' }} />
 * </Skeleton.Container>
 * ```
 */
const Box = ({ styleClass }: { styleClass?: StyleClass }) => {
  const shimmerStyle = useShimmer();
  return (
    <Animated.View
      style={shimmerStyle}
      className={cn('rounded bg-gray-200', styleClass?.root)}
    />
  );
};

const Circle = ({ styleClass }: { styleClass?: StyleClass }) => {
  const shimmerStyle = useShimmer();
  return (
    <Animated.View
      style={shimmerStyle}
      className={cn('rounded-full bg-gray-200', styleClass?.root)}
    />
  );
};

const Container = ({
  children,
  styleClass,
}: {
  children: React.ReactNode;
  styleClass?: StyleClass;
}) => {
  return (
    <View className={cn('', styleClass?.root)}>
      {children}
    </View>
  );
};

const Skeleton = { Box, Circle, Container };

export default Skeleton;
