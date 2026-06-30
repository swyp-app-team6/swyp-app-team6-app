import React, { memo } from 'react';
import { View } from 'react-native';
import { REGION_OPTIONS } from '../model/types';
import InfoCard from './InfoCard';
import InfoRow from './InfoRow';

/**
 * # BasicInfoSection
 * ---
 * - 간단설명: 기본정보 탭 섹션 (나이, 지역, 직업/직장)
 * ---
 * @param age 나이
 * @param region 지역 코드
 * @param subArea 세부 지역
 * @param jobField 직업/직장
 * ---
 * @example
 * <BasicInfoSection age={25} region="SEOUL" subArea="강남구" jobField="개발자" />
 */
const BasicInfoSection = memo(function BasicInfoSection({
  age,
  region,
  subArea,
  jobField,
}: {
  age?: string;
  region?: string;
  subArea?: string;
  jobField?: string;
}) {
  const regionLabel =
    REGION_OPTIONS.find((r) => r.value === region)?.label ?? '';
  const regionDisplay = subArea ? `${regionLabel} ${subArea}` : regionLabel || '-';

  return (
    <InfoCard title="기본정보">
      <View className="gap-3">
        <InfoRow label="나이" value={age ? `${age}세` : '-'} />
        <InfoRow label="지역" value={regionDisplay} />
        <InfoRow label="직업/직장" value={jobField || '-'} />
      </View>
    </InfoCard>
  );
});

export default BasicInfoSection;
