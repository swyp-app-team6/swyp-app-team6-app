import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Header, InterestTag } from '@/shared/ui';
import { useExchangeFlowStore } from '@/features/exchange';
import { getInterestLabel } from '@/features/register';
import { useMyProfileQuery } from '@/entities/user';
import type { NavigationPropType } from '@/shared/types';

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

  const { data: profile } = useMyProfileQuery();
  const scannedProfile = useExchangeFlowStore((s) => s.scannedProfile);
  const commonInterests = useExchangeFlowStore((s) => s.commonInterests);
  const reset = useExchangeFlowStore((s) => s.reset);

  const hasCommon = commonInterests.length > 0;
  const theirName = scannedProfile?.name ?? '';
  const myName = profile?.nickname ?? '';
  const displayInterests = hasCommon ? commonInterests : (scannedProfile?.interests ?? []);

  /** 홈으로 이동 */
  const handleGoHome = () => {
    reset();
    navigation.navigate('home');
  };

  /** 교환한 프로필 보기 */
  const handleViewProfile = () => {
    const profileId = scannedProfile?.id;
    reset();
    if (profileId) {
      navigation.navigate('exchangedProfileDetail', { profileId });
    }
  };

  return (
    <View className="flex-1 bg-white">
      {/* 헤더 */}
      <Header title="공통된 관심사 결과" showBack />

      {/* 본문 */}
      <View className="flex-1 px-5 pt-6">
        {/* 그라디언트 카드 */}
        <LinearGradient
          colors={['rgba(67,56,202,0.8)', 'rgba(124,58,237,0.8)']}
          start={{ x: 0, y: 1 }}
          end={{ x: 0, y: 0 }}
          className="w-full rounded-xl px-6 py-8"
          style={{ minHeight: 520 }}
        >
          {/* 타이틀 */}
          <Text className="text-center text-[20px] font-bold leading-[28px] text-white">
            {hasCommon
              ? '드디어 두 우주의 서로 통하는\n관심사를 찾았어요!'
              : `아쉽지만 ${myName}와 ${theirName}\n서로 같은 관심사가 아직 없어요!`}
          </Text>

          {/* 일러스트 영역 (플레이스홀더) */}
          <View className="my-8 items-center">
            <View className="h-[154px] w-[214px] items-center justify-center rounded-xl">
              <Text className="text-[48px]">🌌</Text>
            </View>
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
        </LinearGradient>
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
