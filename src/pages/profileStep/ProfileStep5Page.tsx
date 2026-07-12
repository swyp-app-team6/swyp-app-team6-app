import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { Header, Layout, ArrowIcon, ProgressBar, ErrorBoundary, LoadSuspense } from '@/shared/ui';
import Step4TMIView from '@/features/register/ui/Step4TMIView';
import type { NavigatorType, NavigationPropType } from '@/shared/types';

/**
 * # ProfileStep5Page
 * ---
 * - 간단설명: 프로필 등록/수정 5단계 페이지 — TMI 등록 (선택사항)
 * - 제약사항 및 특이사항:
 *   - register 모드에서만 "건너뛰기" 버튼 표시
 * ---
 * @example
 * navigation.navigate('profileStep5', { mode: 'register' })
 */
export default function ProfileStep5Page() {
  const navigation = useNavigation<NavigationPropType>();
  const route = useRoute<RouteProp<NavigatorType, 'profileStep5'>>();
  const { mode } = route.params;

  const handleNext = () => {
    navigation.navigate('profileStep6', { mode });
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
        right={
          mode === 'register' ? (
            <TouchableOpacity onPress={handleNext} hitSlop={8}>
              <Text className="text-sm font-medium text-text-gray4">건너뛰기</Text>
            </TouchableOpacity>
          ) : undefined
        }
      />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        <View className="px-5 pt-3 pb-2">
          <ProgressBar value={Math.round((5) * (100 / 6))} steps={6} />
        </View>
        <ErrorBoundary>
          <LoadSuspense>
            <Step4TMIView onNext={handleNext} />
          </LoadSuspense>
        </ErrorBoundary>
      </Layout.Body>
    </>
  );
}
