import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { Header, Layout, ArrowIcon, ProgressBar, ErrorBoundary, LoadSuspense } from '@/shared/ui';
import Step2InterestsView from '@/features/register/ui/Step2InterestsView';
import type { NavigatorType, NavigationPropType } from '@/shared/types';

/**
 * # ProfileStep3Page
 * ---
 * - 간단설명: 프로필 등록/수정 3단계 페이지 — 관심사 선택 (3~5개)
 * ---
 * @example
 * navigation.navigate('profileStep3', { mode: 'register' })
 */
export default function ProfileStep3Page() {
  const navigation = useNavigation<NavigationPropType>();
  const route = useRoute<RouteProp<NavigatorType, 'profileStep3'>>();
  const { mode } = route.params;

  const handleNext = () => {
    navigation.navigate('profileStep4', { mode });
  };

  return (
    <>
      <Header
        title={mode === 'edit' ? '프로필 수정' : '프로필 등록'}
        left={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowIcon direction="left" />
          </TouchableOpacity>
        }
      />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        <View className="px-5 pt-3 pb-2">
          <ProgressBar value={Math.round((3) * (100 / 6))} steps={6} />
        </View>
        <ErrorBoundary>
          <LoadSuspense>
            <Step2InterestsView onNext={handleNext} />
          </LoadSuspense>
        </ErrorBoundary>
      </Layout.Body>
    </>
  );
}
