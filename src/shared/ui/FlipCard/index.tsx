import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

/**
 * # FlipCard
 * ---
 * - 간단설명: 앞면과 뒷면을 3D 플립 애니메이션으로 전환하는 카드 컴포넌트
 * - 제약사항 및 특이사항:
 *   - isFlipped는 react-native-reanimated의 SharedValue<boolean>이어야 함
 *   - 앞면/뒷면 컨텐츠는 어떤 ReactNode든 수용 가능
 *   - cardStyle에 width/height를 반드시 지정해야 올바르게 표시됨
 * ---
 * @param front 앞면에 표시할 ReactNode
 * @param back 뒷면에 표시할 ReactNode
 * @param isFlipped 플립 상태를 제어하는 SharedValue<boolean>
 * @param direction 회전 축 ('x' | 'y'), 기본값 'y'
 * @param duration 애니메이션 지속 시간(ms), 기본값 500
 * @param cardStyle 카드에 적용할 스타일 (width, height 포함 권장)
 * ---
 * @example
 * const isFlipped = useSharedValue(false);
 *
 * <FlipCard
 *   isFlipped={isFlipped}
 *   front={<FrontContent />}
 *   back={<BackContent />}
 *   cardStyle={{ width: 300, height: 400 }}
 * />
 */
export default function FlipCard({
  front,
  back,
  isFlipped,
  direction = 'y',
  duration = 500,
  cardStyle,
}: {
  front: React.ReactNode;
  back: React.ReactNode;
  isFlipped: SharedValue<boolean>;
  direction?: 'x' | 'y';
  duration?: number;
  cardStyle?: StyleProp<ViewStyle>;
}) {
  const isDirectionX = direction === 'x';

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [0, 180]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });
    return {
      transform: [isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue }],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinValue = interpolate(Number(isFlipped.value), [0, 1], [180, 360]);
    const rotateValue = withTiming(`${spinValue}deg`, { duration });
    return {
      transform: [isDirectionX ? { rotateX: rotateValue } : { rotateY: rotateValue }],
    };
  });

  return (
    <View>
      <Animated.View
        style={[
          { position: 'absolute', zIndex: 1, backfaceVisibility: 'hidden' },
          cardStyle,
          frontAnimatedStyle,
        ]}
      >
        {front}
      </Animated.View>
      <Animated.View
        style={[
          { zIndex: 2, backfaceVisibility: 'hidden' },
          cardStyle,
          backAnimatedStyle,
        ]}
      >
        {back}
      </Animated.View>
    </View>
  );
}
