import React, { memo } from 'react';
import { View, Text } from 'react-native';

/**
 * # InfoCard
 * ---
 * - 간단설명: 프로필 미리보기 정보 섹션 카드
 * - 제약사항 및 특이사항:
 *   - 흰색 배경, #E3E3E3 테두리, rounded-xl
 *   - centered prop으로 내용 중앙 정렬 가능
 * ---
 * @param title 섹션 제목
 * @param children 섹션 내용
 * @param centered 내용 중앙 정렬 여부
 * ---
 * @example
 * <InfoCard title="기본정보"><Text>내용</Text></InfoCard>
 */
const InfoCard = memo(function InfoCard({
  title,
  children,
  centered,
}: {
  title: string;
  children: React.ReactNode;
  centered?: boolean;
}) {
  return (
    <View
      className="bg-white rounded-xl px-5 py-7 overflow-hidden"
      style={{ borderWidth: 1, borderColor: '#E3E3E3' }}
    >
      <View className="gap-4">
        <Text
          className="text-base font-semibold text-text-black"
          style={{ lineHeight: 22.4 }}
        >
          {title}
        </Text>
        <View className={centered ? 'items-center' : undefined}>
          {children}
        </View>
      </View>
    </View>
  );
});

export default InfoCard;
