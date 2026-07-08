import React from 'react';
import { Image, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Header, InterestTag } from '@/shared/ui';
import ProfileCardGradientBackground from '@/shared/ui/ProfileCard/ProfileCardGradientBackground';
import { useExchangeFlowStore } from '@/features/exchange';
import { getInterestLabel } from '@/features/register';
import type { NavigationPropType } from '@/shared/types';

const profileCommonFound = require('@/assets/characters/profile-common-found.png');
const profileCommonNotFound = require('@/assets/characters/profile-common-not-found.png');

/**
 * # ExchangeResultPage
 * ---
 * - 간단설명: 프로필 교환 완료 후 공통 관심사 결과를 표시하는 페이지
 * - 제약사항 및 특이사항:
 *   - 보라색 그라디언트 카드 위에 관심사 태그 표시
 *   - 공통 관심사 유무에 따라 다른 메시지 표시
 *   - 하단: 홈으로 / 교환한 프로필 보기 CTA
 *   - 데이터는 useExchangeFlowStore에서 읽음
 * ---
 * @example
 * <ExchangeResultPage />
 */
export default function ExchangeResultPage() {
  const navigation = useNavigation<NavigationPropType>();

  const scannedProfile = useExchangeFlowStore((s) => s.scannedProfile);
  const exchangeResult = useExchangeFlowStore((s) => s.exchangeResult);
  const reset = useExchangeFlowStore((s) => s.reset);

  const matchedInterests = exchangeResult?.matched_interests ?? [];
  const hasCommon = matchedInterests.length > 0;
  const theirName = scannedProfile?.nickname ?? '';
  const displayInterests = hasCommon
    ? matchedInterests.map((i) => i.type)
    : scannedProfile?.interests.map((i) => i.type) ?? [];

  /** 홈으로 이동 */
  const handleGoHome = () => {
    reset();
    navigation.navigate('home');
  };

  /** 교환한 프로필 보기 — store 데이터를 상세 페이지에서 사용하므로 reset하지 않음 */
  const handleViewProfile = () => {
    const profileId = exchangeResult?.exchange_id;
    if (profileId) {
      navigation.navigate('exchangedProfileDetail', { profileId });
    } else {
      console.error('프로필 없음', scannedProfile)
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* 헤더 */}
      <Header title="공통된 관심사 결과" showBack />

      {/* 본문 */}
      <View className="flex-1 items-center pt-6">
        {/* 그라디언트 카드 */}
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
                {displayInterests.map((interest) => (
                  <InterestTag key={interest} label={getInterestLabel(interest)} variant="overlay" />
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
      </View>

      {/* 하단 CTA */}
      <View className="px-5 pb-6 pt-3">
        <View className="flex-row gap-3">
          <Button className="w-1/3" title="홈으로" variant="secondary" onPress={handleGoHome} />
          <Button className="w-2/3" title="교환한 프로필 보기" variant="primary" onPress={handleViewProfile} />
        </View>
      </View>
    </View>
  );
}
