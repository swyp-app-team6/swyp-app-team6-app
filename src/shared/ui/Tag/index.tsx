import React from 'react';
import { Text, View } from 'react-native';
import { cn } from '@/shared/lib/cn';

/**
 * 태그 스타일 변형
 * - default = 회색 배경
 * - primary = 보라 배경
 * - secondary = 노란 배경
 */
export type TagVariant = 'default' | 'primary' | 'secondary';

interface StyleClass {
  root?: string;
  label?: string;
}

/**
 * # Tag
 * ---
 * - 간단설명: 소형 라벨 태그 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 3가지 변형(default, primary, secondary) 지원
 *   - 읽기 전용 라벨 표시 용도
 * ---
 * @param label 태그에 표시할 텍스트
 * @param variant 태그 스타일 변형. 기본값: 'default'
 * ---
 * @example
 * ```tsx
 * <Tag label="Q1" />
 * <Tag label="연애" variant="primary" />
 * <Tag label="성격" variant="secondary" />
 * ```
 */

export interface TagProps {
  /** 태그에 표시할 텍스트 */
  label: string;
  /** 태그 스타일 변형. 기본값: 'default' */
  variant?: TagVariant;
  styleClass?: StyleClass;
}

const variantClass: Record<TagVariant, { root: string; label: string }> = {
  default: {
    root: 'bg-text-gray7',
    label: 'text-text-gray3',
  },
  primary: {
    root: 'bg-primary-lightest',
    label: 'text-primary',
  },
  secondary: {
    root: 'bg-secondary-yellow/20',
    label: 'text-text-black',
  },
};

export default function Tag({ label, variant = 'default', styleClass }: TagProps) {
  const v = variantClass[variant];

  return (
    <View className={cn('self-start rounded-full px-3 py-1', v.root, styleClass?.root)}>
      <Text className={cn('text-xs font-medium', v.label, styleClass?.label)}>
        {label}
      </Text>
    </View>
  );
}
