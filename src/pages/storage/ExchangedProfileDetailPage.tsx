import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { Header } from '@/shared/ui';
import type { NavigatorType, NavigationPropType } from '@/shared/types';
import ExchangedProfileView from '@/features/storage/ui/ExchangedProfileView';

/**
 * # ExchangedProfileDetailPage
 * ---
 * - 간단설명: 교환한 프로필 상세 보기 페이지
 * - 제약사항 및 특이사항:
 *   - route params로 profileId 수신
 *   - Header + ExchangedProfileView 구성
 *   - 만남후기 작성 CTA → writeReview 페이지로 이동
 * ---
 * @example
 * navigation.navigate('exchangedProfileDetail', { profileId: 1 })
 */
export default function ExchangedProfileDetailPage() {
  const navigation = useNavigation<NavigationPropType>();
  const route =
    useRoute<RouteProp<NavigatorType, 'exchangedProfileDetail'>>();
  const { profileId } = route.params;

  return (
    <>
      <Header title="프로필 상세보기" />
      <ExchangedProfileView
        profileId={profileId}
        onNavigateToReview={() =>
          navigation.navigate('writeReview', { profileId })
        }
      />
    </>
  );
}
