// shared/lib/cn.ts
import { twMerge } from 'tailwind-merge';

/**
 * class 합치기용
 */
export const cn = (...classes: (string | undefined)[]) => {
  return twMerge(classes.filter(Boolean).join(' '));
};