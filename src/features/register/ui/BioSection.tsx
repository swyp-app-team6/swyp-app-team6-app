import React, { memo } from 'react';
import { Text } from 'react-native';
import InfoCard from './InfoCard';

/**
 * # BioSection
 * ---
 * - 간단설명: 자기소개 탭 섹션
 * ---
 * @param bio 자기소개 텍스트
 * ---
 * @example
 * <BioSection bio="안녕하세요!" />
 */
const BioSection = memo(function BioSection({ bio }: { bio?: string }) {
  return (
    <InfoCard title="자기소개">
      <Text
        className="text-sm font-medium text-text-black"
        style={{ lineHeight: 19.6 }}
      >
        {bio || '등록된 자기소개가 없습니다'}
      </Text>
    </InfoCard>
  );
});

export default BioSection;
