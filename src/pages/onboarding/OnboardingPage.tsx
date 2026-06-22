import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@/shared/ui';
import Header from '@/shared/ui/Header';
import Layout from '@/shared/ui/Layout';
import { usePermissionStore } from '@/widgets/permissions';
import type { NavigationPropType } from '@/shared/types';

/**
 * # OnboardingPage
 * ---
 * - 간단설명: 앱 최초 실행 시 카메라/갤러리 권한 안내 온보딩 화면
 * - 제약사항 및 특이사항:
 *   - AsyncStorage의 hasSeenOnboarding 플래그로 최초 실행 판별
 *   - 권한 거부 시에도 로그인으로 진행 가능
 * ---
 * @example
 * <OnboardingPage />
 */
function OnboardingPage() {
  const navigation = useNavigation<NavigationPropType>();
  const { requestCameraPermission, requestGalleryPermission } =
    usePermissionStore();

  const handleStart = async () => {
    await requestCameraPermission();
    await requestGalleryPermission();
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });
  };

  return (
    <>
      <Header title="권한 안내" />
      <Layout.Body styleClass={{ root: 'px-6 pt-10' }}>
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl font-bold mb-6 text-center">
            앱 사용을 위한 권한 안내
          </Text>
          <Text className="text-base text-gray-600 mb-4 text-center">
            카메라 권한: QR코드 스캔에 사용됩니다
          </Text>
          <Text className="text-base text-gray-600 mb-8 text-center">
            갤러리 권한: 프로필 사진 등록에 사용됩니다
          </Text>
        </View>
        <View className="pb-8">
          <Button title="시작하기" onPress={handleStart} />
        </View>
      </Layout.Body>
    </>
  );
}

export default OnboardingPage;
