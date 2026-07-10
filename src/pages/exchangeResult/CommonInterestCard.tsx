import React from 'react';
import { Image, Text, View } from 'react-native';
import { InterestTag } from '@/shared/ui';
import ProfileCardGradientBackground from '@/shared/ui/ProfileCard/ProfileCardGradientBackground';
import { INTEREST_LABEL } from '@/features/register';
import ProfileCardContainer from '../../shared/ui/ProfileCard/ProfileCardContainer';

const profileCommonFound = require('@/assets/characters/profile-common-found.png');
const profileCommonNotFound = require('@/assets/characters/profile-common-not-found.png');

interface CommonInterestCardProps {
  /** 공통 관심사가 있는지 여부 */
  hasCommon: boolean;
  /** 표시할 관심사 목록 (INTEREST enum 값) */
  interests: string[];
  /** 상대 닉네임 (공통 관심사 없을 때 사용) */
  theirName: string;
}

/**
 * # CommonInterestCard
 * ---
 * - 간단설명: 프로필 교환 결과에서 공통 관심사를 보라색 그라디언트 카드로 표시하는 순수 컴포넌트
 * - 제약사항 및 특이사항:
 *   - 공통 관심사 유무에 따라 타이틀, 일러스트, 안내 문구가 다르게 표시됨
 *   - store/navigation 의존 없이 props만으로 동작
 * ---
 * @param hasCommon 공통 관심사 유무
 * @param interests 표시할 관심사 INTEREST enum 값 배열
 * @param theirName 상대 닉네임
 * ---
 * @example
 * <CommonInterestCard hasCommon={true} interests={['TRAVEL', 'MUSIC']} theirName="민수" />
 */
export default function CommonInterestCard({
  hasCommon,
  interests,
  theirName,
}: CommonInterestCardProps) {
  return (
    <ProfileCardContainer responsive>
      <ProfileCardGradientBackground>
        <View className="flex-1 px-6 py-8">
          {/* 타이틀 */}
          <Text className="text-center text-[20px] font-bold leading-[28px] text-white">
            {hasCommon
              ? '드디어 두 우주가 서로 통하는\n관심사를 찾았어요!'
              : '아쉽지만 서로 겹치는 관심사가\n아직 없어요!'}
          </Text>

          {/* 일러스트 영역 */}
          <View className="my-8 items-center">
            <Image
              source={hasCommon ? profileCommonFound : profileCommonNotFound}
              className="h-[154px] w-[214px]"
              resizeMode="contain"
            />
          </View>

          {/* 공통 관심사 섹션 */}
          <View className="items-center gap-2">
            <Text className="text-center text-[18px] font-bold leading-[24px] text-white">
              {hasCommon ? '두 분의 공통된 관심사는' : `${theirName}의 관심사는`}
            </Text>

            {/* 관심사 태그 */}
            <View className="mt-2 flex-row flex-wrap justify-center gap-2">
              {interests.map((interest) => (
                <InterestTag key={interest} label={INTEREST_LABEL[interest] ?? interest} variant="overlay" />
              ))}
            </View>

            {/* 안내 문구 */}
            <Text className="mt-3 text-center text-[14px] font-medium leading-[20px] text-neutral-100">
              {hasCommon
                ? '공통된 관심사를 기반으로\n가볍게 이야기를 시작해보세요!'
                : '다양한 관심사를 통해\n새로운 이야기를 나눠보세요!'}
            </Text>
          </View>
        </View>
      </ProfileCardGradientBackground>
    </ProfileCardContainer>
  );
}
