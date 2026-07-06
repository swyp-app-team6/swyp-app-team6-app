import React from 'react';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Header, Layout, ProfileCard } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import { useAuthStore, useDeleteProfileMutation, useMyProfileQuery } from '@/entities/user';
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
  const { data: profile, isLoading } = useMyProfileQuery();
  const { mutate: deleteProfile, isPending } = useDeleteProfileMutation();
  const clearAuth = useAuthStore((s) => s.clear);

  const handleWithdrawal = () => {
    Alert.alert(
      '프로필 삭제',
      '프로필을 삭제하시겠습니까?\n삭제된 프로필은 복구할 수 없습니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: () => {
            deleteProfile(undefined, {
              onSuccess: () => {
                clearAuth();
                navigation.reset({ index: 0, routes: [{ name: 'login' }] });
              },
            });
          },
        },
      ],
    );
  };

  return (
    <>
      <Header title="프로필" />
      <Layout.Body styleClass={{ root: 'bg-gray-50 items-center justify-center px-6' }}>
        <ProfileCard
          variant="compact"
          profileImageUri={profile?.image_key}
          nickname={profile?.nickname}
          job={profile?.job}
          region={profile?.region}
          isLoading={isLoading}
        />
        <View className="w-full gap-3 mt-6">
          <Button
            title="회원정보 수정"
            variant="secondary"
            onPress={() => navigation.navigate('mypage')}
          />
          <Button
            title="회원탈퇴"
            variant="ghost"
            onPress={handleWithdrawal}
            loading={isPending}
          />
        </View>
      </Layout.Body>
    </>
  );
}

export default withLayout(ProfilePage);
