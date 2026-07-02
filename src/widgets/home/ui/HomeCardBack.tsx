import React, { memo } from 'react';
import { View, Text } from 'react-native';
import type { CosmicType } from '@/features/register/model/cosmicTypeResults';
import { COSMIC_TYPE_RESULTS } from '@/features/register/model/cosmicTypeResults';

interface Props {
  /** 코스믹 유형 */
  cosmicType: CosmicType;
}

/**
 * # HomeCardBack
 * ---
 * - 간단설명: 홈 화면 프로필 카드 뒷면 — 코스믹 유형 정보 표시
 * - 제약사항 및 특이사항:
 *   - 284x392 크기, 보라색(#7843ED) 배경
 *   - 일러스트 placeholder + 유형명 + 설명 + 키워드 태그 3개
 *   - 뒷면 보기/전체보기 버튼은 부모(HomeWidget)에서 렌더링
 * ---
 * @param cosmicType 코스믹 유형 코드
 * ---
 * @example
 * <HomeCardBack cosmicType="SHOOTING_STAR" />
 */
const HomeCardBack = memo(function HomeCardBack({ cosmicType }: Props) {
  const result = COSMIC_TYPE_RESULTS[cosmicType];

  return (
    <View
      className="w-[284px] h-[392px] rounded-xl overflow-hidden items-center justify-center px-5"
      style={{ backgroundColor: '#7843ED' }}
    >
      {/* 일러스트 placeholder */}
      <View
        className="rounded-full items-center justify-center mb-5"
        style={{
          width: 120,
          height: 120,
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
        }}
      >
        <Text className="text-5xl">✨</Text>
      </View>

      {/* 유형명 */}
      <Text
        className="text-xl font-bold text-white text-center mb-2"
        style={{ lineHeight: 28 }}
      >
        {result.name}
      </Text>

      {/* 한줄 설명 */}
      <Text
        className="text-sm font-medium text-white text-center mb-4"
        style={{ lineHeight: 19.6 }}
      >
        {result.description}
      </Text>

      {/* 키워드 태그 */}
      <View className="flex-row gap-1">
        {result.tags.map((tag) => (
          <View
            key={tag}
            className="rounded-full border border-white px-3 py-2"
          >
            <Text className="text-xs text-white" style={{ lineHeight: 12 }}>
              {tag}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
});

export default HomeCardBack;
