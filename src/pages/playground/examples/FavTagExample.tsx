import { useState } from 'react';
import { View } from 'react-native';
import { FavTag } from '@/shared/ui';
import Section from './Section';

/**
 * # FavTagExample
 * ---
 * - 간단설명: FavTag 관심사/취미 선택 토글 태그를 확인하는 예제
 * ---
 * @example
 * <FavTagExample />
 */
export default function FavTagExample() {
  const [favTags, setFavTags] = useState<Record<string, boolean>>({});

  return (
    <Section title="FavTag — 관심사/취미 선택 토글 태그">
      <View className="flex-row flex-wrap gap-2">
        {[
          { emoji: '🇺🇸', label: '외국어', key: 'lang' },
          { emoji: '⛺', label: '캠핑 / 드라이브', key: 'camp' },
          { emoji: '🎵', label: '음악', key: 'music' },
          { emoji: '📚', label: '독서', key: 'book' },
        ].map(tag => (
          <FavTag
            key={tag.key}
            emoji={tag.emoji}
            label={tag.label}
            selected={!!favTags[tag.key]}
            onPress={() => setFavTags(prev => ({ ...prev, [tag.key]: !prev[tag.key] }))}
          />
        ))}
      </View>
    </Section>
  );
}
