import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header, ErrorBoundary, LoadSuspense } from '@/shared/ui';
import { CosmicTypeTestView } from '@/features/register';
import { useMyProfileQuery } from '@/entities/user';
import type { CosmicType } from '@/shared/enums';
import type { NavigationPropType } from '@/shared/types';

/**
 * # CosmicTestPage
 * ---
 * - 간단설명: 독립 코스믹 유형 테스트 페이지
 * - 제약사항 및 특이사항:
 *   - 홈 카드 뒷면, 프로필 상세에서 진입
 *   - 테스트 완료 후 이전 화면으로 복귀
 *   - 유형테스트 등록/수정 API는 별도 제공 예정
 * ---
 * @example
 * navigation.navigate('cosmicTest')
 */
export default function CosmicTestPage() {
  const navigation = useNavigation<NavigationPropType>();
  const { data: profile } = useMyProfileQuery();

  /** 테스트 완료 → 이전 화면 복귀 */
  const handleComplete = useCallback(
    (_cosmicType: CosmicType) => {
      navigation.goBack();
    },
    [navigation],
  );

  return (
    <View className="flex-1 bg-white">
      <Header title="코스믹 유형 테스트" showBack />
      <ErrorBoundary>
        <LoadSuspense>
          <CosmicTypeTestView
            onComplete={handleComplete}
            nickname={profile?.nickname ?? '사용자'}
          />
        </LoadSuspense>
      </ErrorBoundary>
    </View>
  );
}
