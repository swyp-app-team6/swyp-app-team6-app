import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import { Header, Layout, ArrowIcon, ProgressBar } from '@/shared/ui';
import Step2DetailInfoView from '@/features/register/ui/Step2DetailInfoView';
import type { NavigatorType, NavigationPropType } from '@/shared/types';

/**
 * # ProfileStep2Page
 * ---
 * - 간단설명: 프로필 등록/수정 2단계 페이지 — 상세정보 (나이, 직무, 지역)
 * ---
 * @example
 * navigation.navigate('profileStep2', { mode: 'register' })
 */
export default function ProfileStep2Page() {
  const navigation = useNavigation<NavigationPropType>();
  const route = useRoute<RouteProp<NavigatorType, 'profileStep2'>>();
  const { mode } = route.params;

  const handleNext = () => {
    navigation.navigate('profileStep3', { mode });
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
          <ProgressBar value={Math.round((2) * (100 / 6))} steps={6} />
        </View>
        <Step2DetailInfoView onNext={handleNext} />
      </Layout.Body>
    </>
  );
}
