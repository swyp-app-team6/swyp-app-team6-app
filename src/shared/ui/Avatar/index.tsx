import React from 'react';
import { Image, Text, View } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface Props {
  /** 프로필 이미지 URI */
  uri?: string | null;
  /** 이미지 없을 때 이니셜 생성용 이름 */
  name?: string;
  /** 아바타 크기(px). 기본값: 48 */
  size?: number;
  styleClass?: { root?: string; text?: string };
}

/**
 * # Avatar
 * ---
 * - 간단설명: 원형 프로필 이미지 컴포넌트
 * - 제약사항 및 특이사항:
 *   - uri가 없으면 name의 첫 글자를 이니셜로 표시
 *   - name도 없으면 기본 아이콘(?) 표시
 * ---
 * @param uri 프로필 이미지 URI
 * @param name 이니셜 생성용 이름
 * @param size 아바타 크기(px)
 * ---
 * @example
 * ```tsx
 * <Avatar uri="https://example.com/photo.jpg" size={64} />
 * <Avatar name="홍길동" size={48} />
 * <Avatar size={32} />
 * ```
 */
export default function Avatar({ uri, name, size = 48, styleClass }: Props) {
  const initial = name ? name.charAt(0).toUpperCase() : '?';
  const fontSize = Math.round(size * 0.4);

  return (
    <View
      className={cn(
        'items-center justify-center overflow-hidden rounded-full bg-gray-200',
        styleClass?.root,
      )}
      style={{ width: size, height: size }}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size }}
          className="rounded-full"
        />
      ) : (
        <Text
          className={cn('font-semibold text-gray-500', styleClass?.text)}
          style={{ fontSize }}
        >
          {initial}
        </Text>
      )}
    </View>
  );
}
