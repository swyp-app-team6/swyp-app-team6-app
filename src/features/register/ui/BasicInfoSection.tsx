import React, { memo } from 'react';
import { View } from 'react-native';
import type { Region } from '@/entities/user/model/types';
import { getRegionLabel } from '@/shared/lib/regionLabel';
import InfoCard from './InfoCard';
import InfoRow from './InfoRow';

/**
 * # BasicInfoSection
 * ---
 * - 간단설명: 기본정보 탭 섹션 (나이, 지역, 직업/직장)
 * ---
 * @param age 나이
 * @param region 지역 객체 (group, detail, label)
 * @param jobField 직업/직장
 * ---
 * @example
 * <BasicInfoSection age="25" region={{ group: "서울", detail: "SEOUL", label: "서울전체" }} jobField="개발자" />
 */
const BasicInfoSection = memo(function BasicInfoSection({
  age,
  region,
  jobField,
}: {
  age: string;
  region: Region;
  jobField?: string;
}) {
  const regionText = getRegionLabel(region!.detail);
  return (
    <InfoCard title="기본정보">
      <View className="gap-3">
        <InfoRow label="나이" value={age ? `${age}세` : '-'} />
        <InfoRow label="지역" value={regionText} />
        <InfoRow label="직업/직장" value={jobField || '-'} />
      </View>
    </InfoCard>
  );
});

export default BasicInfoSection;
