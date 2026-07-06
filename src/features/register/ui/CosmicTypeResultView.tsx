import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { BottomCTA, Button } from '@/shared/ui';
import type { CosmicTypeResponse } from '@/entities/cosmic';
import CosmicResultFrontCard from './CosmicResultFrontCard';
import CosmicResultBackCard from './CosmicResultBackCard';

interface Props {
  /** 유형 결과 데이터 (API 응답) */
  result: CosmicTypeResponse;
  /** 사용자 닉네임 */
  nickname: string;
  /** "카드에 적용하기" 콜백 */
  onApply: () => void;
  /** "이미지 저장" 콜백 */
  onSaveImage?: () => void;
}

/**
 * # CosmicTypeResultView
 * ---
 * - 간단설명: 코스믹 유형 테스트 결과 화면 (앞면/뒷면 전환)
 * - 제약사항 및 특이사항:
 *   - CosmicTypeResponse API 데이터를 주입받아 앞면/뒷면 카드 렌더링
 *   - 앞면: 유형명 + 일러스트 + 태그 + 한줄설명
 *   - 뒷면: 연애 스타일 + 자주 듣는 말 + 궁합 유형
 *   - 하단 CTA: "이미지 저장" (outline) + "카드에 적용하기" (primary)
 * ---
 * @param result 유형 결과 데이터 (API 응답)
 * @param nickname 사용자 닉네임
 * @param onApply 카드 적용 콜백
 * @param onSaveImage 이미지 저장 콜백
 * ---
 * @example
 * <CosmicTypeResultView result={cosmicData} nickname="홍길동" onApply={handleApply} />
 */
export default function CosmicTypeResultView({
  result,
  nickname,
  onApply,
  onSaveImage,
}: Props) {
  const [isBack, setIsBack] = useState(false);

  return (
    <View className="flex-1">
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 24 }}
      >
        {isBack ? (
          <CosmicResultBackCard
            result={result}
            nickname={nickname}
            onFlip={() => setIsBack(false)}
          />
        ) : (
          <CosmicResultFrontCard
            result={result}
            nickname={nickname}
            onFlip={() => setIsBack(true)}
          />
        )}
      </ScrollView>

      <BottomCTA styleClass={{ root: 'border-t-0' }}>
        <View className="gap-3">
          {onSaveImage && (
            <Button
              title="이미지 저장"
              variant="outline"
              onPress={onSaveImage}
            />
          )}
          <Button title="카드에 적용하기" onPress={onApply} />
        </View>
      </BottomCTA>
    </View>
  );
}
