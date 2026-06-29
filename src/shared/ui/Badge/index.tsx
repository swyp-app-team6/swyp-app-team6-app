import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { cn } from '@/shared/lib/cn';

/**
 * 뱃지 레벨 타입
 * - star = 슈팅스타 등급 (보라 그라디언트)
 * - galaxy = 갤럭시 등급 (블루-퍼플 그라디언트)
 * - solar = 솔라 등급 (오렌지-레드 그라디언트)
 * - luna = 루나 등급 (골드 그라디언트)
 */
export type BadgeLevel = 'star' | 'galaxy' | 'solar' | 'luna';

interface StyleClass {
  label?: string;
}

/**
 * # Badge
 * ---
 * - 간단설명: 등급/레벨 표시 그라디언트 뱃지 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 4가지 레벨(star, galaxy, solar, luna) 각각 고유 그라디언트 색상
 *   - label 미지정 시 레벨명을 기본 텍스트로 사용
 *   - react-native-linear-gradient 의존
 * ---
 * @param level 뱃지 레벨
 * @param label 커스텀 라벨 (미지정 시 레벨명 사용)
 * ---
 * @example
 * ```tsx
 * <Badge level="star" />
 * <Badge level="galaxy" label="갤럭시 유형" />
 * ```
 */

export interface BadgeProps {
  /** 뱃지 레벨 */
  level: BadgeLevel;
  /** 커스텀 라벨 (미지정 시 레벨명 사용) */
  label?: string;
  styleClass?: StyleClass;
}

const levelConfig: Record<BadgeLevel, { colors: string[]; defaultLabel: string }> = {
  star: {
    colors: ['#DB76FF', '#8C39FB'],
    defaultLabel: '슈팅스타 유형',
  },
  galaxy: {
    colors: ['#37C7FF', '#517BE1', '#6A2EC4'],
    defaultLabel: '갤럭시 유형',
  },
  solar: {
    colors: ['#FF7D37', '#C42E59'],
    defaultLabel: '솔라 유형',
  },
  luna: {
    colors: ['#F8E3A4', '#F3CA65', '#ED9626'],
    defaultLabel: '루나 유형',
  },
};

export default function Badge({ level, label, styleClass }: BadgeProps) {
  const config = levelConfig[level];

  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={config.colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={StyleSheet.absoluteFill}
      />
      <Text
        className={cn('font-semibold text-white', styleClass?.label)}
        style={styles.label}
      >
        {label ?? config.defaultLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 28,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
  },
});
