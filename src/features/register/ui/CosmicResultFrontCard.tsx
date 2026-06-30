import React from 'react';
import { View, Text, Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { CosmicTypeResult } from '../model/cosmicTypeResults';

interface Props {
  /** 유형 결과 데이터 */
  result: CosmicTypeResult;
  /** 사용자 닉네임 */
  nickname: string;
  /** 뒷면보기 콜백 */
  onFlip: () => void;
}

/**
 * # CosmicResultFrontCard
 * ---
 * - 간단설명: 코스믹 유형 테스트 결과 카드 앞면
 * - 제약사항 및 특이사항:
 *   - 보라 그라데이션 배경 (350x520, rounded-xl)
 *   - 닉네임 + 유형명 + 일러스트(placeholder) + 태그 3개 + 한줄설명
 *   - "뒷면보기" 버튼으로 카드 전환
 *   - result props로 결과 데이터를 주입받아 렌더링
 * ---
 * @param result 유형 결과 데이터
 * @param nickname 사용자 닉네임
 * @param onFlip 뒷면보기 콜백
 * ---
 * @example
 * <CosmicResultFrontCard result={result} nickname="홍길동" onFlip={() => setIsBack(true)} />
 */
export default function CosmicResultFrontCard({
  result,
  nickname,
  onFlip,
}: Props) {
  return (
    <View
      className="w-[350px] rounded-xl overflow-hidden self-center"
      style={{
        height: 520,
        backgroundColor: '#7843ED',
      }}
    >
      {/* 닉네임 + 유형명 */}
      <View className="items-center mt-7">
        <Text className="text-base font-medium text-white" style={{ lineHeight: 22.4 }}>
          {nickname} 님은
        </Text>
        <Text className="text-xl font-bold text-white mt-1" style={{ lineHeight: 28 }}>
          {result.name}
        </Text>
      </View>

      {/* 일러스트 영역 (placeholder) */}
      <View className="items-center justify-center mt-6" style={{ height: 200 }}>
        <View
          className="rounded-full items-center justify-center"
          style={{
            width: 123,
            height: 123,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          <Text className="text-5xl">✨</Text>
        </View>
      </View>

      {/* 태그 */}
      <View className="flex-row justify-center gap-1 mt-2">
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

      {/* 한줄 설명 */}
      <View className="items-center mt-4 px-8">
        <Text
          className="text-sm font-semibold text-white text-center"
          style={{ lineHeight: 19.6 }}
        >
          {result.description}
        </Text>
      </View>

      {/* 뒷면보기 버튼 */}
      <View className="items-center mt-4">
        <Pressable
          onPress={onFlip}
          className="flex-row items-center rounded-full px-3 py-2"
          style={{ backgroundColor: 'rgba(245, 245, 245, 0.3)' }}
        >
          <FlipIcon />
          <Text className="text-sm text-white ml-1" style={{ lineHeight: 19.6 }}>
            뒷면보기
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
