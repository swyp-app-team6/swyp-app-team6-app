import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { Header, Layout, ArrowIcon, ProgressBar } from '@/shared/ui';
import Step3BioView from '@/features/register/ui/Step3BioView';
import type { NavigatorType, NavigationPropType } from '@/shared/types';

/**
 * # ProfileStep4Page
 * ---
 * - 간단설명: 프로필 등록/수정 4단계 페이지 — 자기소개 (선택사항)
 * - 제약사항 및 특이사항:
 *   - register 모드에서만 "건너뛰기" 버튼 표시
 * ---
 * @example
 * navigation.navigate('profileStep4', { mode: 'register' })
 */
export default function ProfileStep4Page() {
  const navigation = useNavigation<NavigationPropType>();
  const route = useRoute<RouteProp<NavigatorType, 'profileStep4'>>();
  const { mode } = route.params;

  const handleNext = () => {
    navigation.navigate('profileStep5', { mode });
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
          <ProgressBar value={Math.round((4) * (100 / 6))} steps={6} />
        </View>
        <Step3BioView onNext={handleNext} />
      </Layout.Body>
    </>
  );
}
