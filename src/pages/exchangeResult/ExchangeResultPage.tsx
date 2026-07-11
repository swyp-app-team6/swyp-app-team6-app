import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Header } from '@/shared/ui';
import { useExchangeFlowStore } from '@/features/exchange';
import type { NavigationPropType } from '@/shared/types';
import CommonInterestCard from './CommonInterestCard';

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
      <View className="flex-1 items-center px-5 pt-12">
        <CommonInterestCard
          hasCommon={hasCommon}
          interests={displayInterests}
          theirName={theirName}
        />
      </View>

      {/* 하단 CTA */}
      <View className="px-5 pb-6 pt-3">
        <View className="flex-row gap-3">
          <Pressable
            className="h-14 items-center justify-center rounded-xl px-6"
            style={{ backgroundColor: '#F5F5F5' }}
            onPress={handleGoHome}
          >
            <Text className="text-center text-base font-bold" style={{ color: '#888888' }}>홈으로</Text>
          </Pressable>
          <Button className="flex-1" title="교환한 프로필 보기" variant="primary" onPress={handleViewProfile} />
        </View>
      </View>
    </View>
  );
}
