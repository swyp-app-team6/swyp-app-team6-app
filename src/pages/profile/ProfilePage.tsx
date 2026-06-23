import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Header, Layout } from '@/shared/ui';
import ProfileCard from '@/widgets/profile/ProfileCard';
import withLayout from '@/shared/hoc/withLayout';
import type { NavigationPropType } from '@/shared/types';

/**
 * # ProfilePage
 * ---
 * - 간단설명: 프로필 화면 - 사용자 정보 확인, 회원정보 수정 및 탈퇴 진입
 * ---
 * @example
 * <ProfilePage />
 */
function ProfilePage() {
  const navigation = useNavigation<NavigationPropType>();

  return (
    <>
      <Header title="프로필" />
      <Layout.Body styleClass={{ root: 'bg-gray-50 items-center justify-center px-6' }}>
        <ProfileCard />
        <View className="w-full gap-3 mt-6">
          <Button
            title="회원정보 수정"
            variant="secondary"
            onPress={() => navigation.navigate('mypage')}
          />
          <Button
            title="회원탈퇴"
            variant="ghost"
            onPress={() => navigation.navigate('mypage')}
          />
        </View>
      </Layout.Body>
    </>
  );
}

export default withLayout(ProfilePage);
