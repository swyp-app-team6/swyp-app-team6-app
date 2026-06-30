import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { CosmicTypeResult } from '../model/cosmicTypeResults';
import { COSMIC_TYPE_RESULTS } from '../model/cosmicTypeResults';

interface Props {
  /** 유형 결과 데이터 */
  result: CosmicTypeResult;
  /** 앞면보기 콜백 */
  onFlip: () => void;
}

/**
 * # CosmicResultBackCard
 * ---
 * - 간단설명: 코스믹 유형 테스트 결과 카드 뒷면
 * - 제약사항 및 특이사항:
 *   - 보라 그라데이션 배경 (350x520, rounded-xl)
 *   - 연애 스타일 / 자주 듣는 말 / 궁합이 좋은 유형 3개 섹션
 *   - "앞면보기" 버튼으로 카드 전환
 *   - result props로 결과 데이터를 주입받아 렌더링
 * ---
 * @param result 유형 결과 데이터
 * @param onFlip 앞면보기 콜백
 * ---
 * @example
 * <CosmicResultBackCard result={result} onFlip={() => setIsBack(false)} />
 */
export default function CosmicResultBackCard({ result, onFlip }: Props) {
  return (
    <View
      className="w-[350px] rounded-xl overflow-hidden self-center px-6 py-7"
      style={{
        height: 520,
        backgroundColor: '#7843ED',
      }}
    >
      {/* 연애 스타일 */}
      <View className="mb-5">
        <Text className="text-sm font-bold text-white mb-3">연애 스타일</Text>
        <View className="gap-1.5">
          {result.loveStyle.map((item) => (
            <View key={item} className="flex-row items-start">
              <Text className="text-white mr-2">•</Text>
              <Text
                className="text-xs text-white flex-1"
                style={{ lineHeight: 18 }}
              >
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* 자주 듣는 말 */}
      <View className="mb-5">
        <Text className="text-sm font-bold text-white mb-3">
          이런 말을 자주 들어요
        </Text>
        <View className="gap-1">
          {result.quotes.map((quote) => (
            <Text
              key={quote}
              className="text-xs text-white"
              style={{ lineHeight: 18 }}
            >
              {quote}
            </Text>
          ))}
        </View>
      </View>

      {/* 궁합이 좋은 유형 */}
      <View className="mb-4">
        <Text className="text-sm font-bold text-white mb-3">
          궁합이 좋은 유형
        </Text>
        <View className="flex-row gap-4">
          {result.bestMatches.map((matchType) => {
            const match = COSMIC_TYPE_RESULTS[matchType];
            return (
              <View key={matchType} className="items-center">
                <View
                  className="w-12 h-12 rounded-full items-center justify-center mb-1"
                  style={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
                >
                  <Text className="text-lg">✨</Text>
                </View>
                <Text className="text-xs text-white">
                  {match.name.replace(' 형', '형')}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* 앞면보기 버튼 */}
      <View className="items-center mt-auto">
        <Pressable
          onPress={onFlip}
          className="flex-row items-center rounded-full px-3 py-2"
          style={{ backgroundColor: 'rgba(245, 245, 245, 0.3)' }}
        >
          <FlipIcon />
          <Text className="text-sm text-white ml-1" style={{ lineHeight: 19.6 }}>
            앞면보기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/** 뒤집기 아이콘 */
function FlipIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M13.5 3.5L17 7l-3.5 3.5M3 13l3.5-3.5L3 6"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M17 7H8.5a4 4 0 00-4 4v2M3 13h8.5a4 4 0 004-4V7"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
