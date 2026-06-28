import React from 'react';
import { Text, View } from 'react-native';
import { cn } from '@/shared/lib/cn';

/**
 * 뱃지 레벨 타입
 * - star = 스타 등급
 * - galaxy = 갤럭시 등급
 * - solar = 솔라 등급
 * - luna = 루나 등급
 */
export type BadgeLevel = 'star' | 'galaxy' | 'solar' | 'luna';

interface StyleClass {
  root?: string;
  label?: string;
}

/**
 * # Badge
 * ---
 * - 간단설명: 등급/레벨 표시 뱃지 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 4가지 레벨(star, galaxy, solar, luna) 각각 고유 색상
 *   - label 미지정 시 레벨명을 기본 텍스트로 사용
 * ---
 * @param level 뱃지 레벨
 * @param label 커스텀 라벨 (미지정 시 레벨명 사용)
 * ---
 * @example
 * ```tsx
 * <Badge level="star" />
 * <Badge level="galaxy" label="갤럭시 등급" />
 * ```
 */

export interface BadgeProps {
  /** 뱃지 레벨 */
  level: BadgeLevel;
  /** 커스텀 라벨 (미지정 시 레벨명 사용) */
  label?: string;
  styleClass?: StyleClass;
}

const levelConfig: Record<BadgeLevel, { icon: string; root: string; label: string; defaultLabel: string }> = {
  star: {
    icon: '⭐',
    root: 'bg-secondary-yellow/20',
    label: 'text-text-black',
    defaultLabel: 'Star',
  },
  galaxy: {
    icon: '🌌',
    root: 'bg-primary-lightest',
    label: 'text-primary',
    defaultLabel: 'Galaxy',
  },
  solar: {
    icon: '☀️',
    root: 'bg-secondary-pink/20',
    label: 'text-secondary-pink',
    defaultLabel: 'Solar',
  },
  luna: {
    icon: '🌙',
    root: 'bg-text-gray7',
    label: 'text-text-gray3',
    defaultLabel: 'Luna',
  },
};

export default function Badge({ level, label, styleClass }: BadgeProps) {
  const config = levelConfig[level];

  return (
    <View
      className={cn(
        'flex-row items-center gap-1 rounded-full px-3 py-1',
        config.root,
        styleClass?.root,
      )}
    >
      <Text className="text-xs">{config.icon}</Text>
      <Text
        className={cn('text-xs font-medium', config.label, styleClass?.label)}
      >
        {label ?? config.defaultLabel}
      </Text>
    </View>
  );
}
