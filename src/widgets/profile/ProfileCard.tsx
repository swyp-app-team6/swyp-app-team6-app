import React from 'react';
import { Text, View } from 'react-native';
import { ProfileImagePicker } from '@/features/profile/editProfileImage';
import useAuthStore from '@/entities/user/model/authStore';

export default function ProfileCard() {
  const user = useAuthStore((s) => s.user);

  return (
    <View className="items-center gap-4 p-6 bg-white rounded-2xl w-full">
      <ProfileImagePicker />
      <View className="items-center gap-1">
        <Text className="text-xl font-bold text-gray-900">{user?.email ?? '-'}</Text>
        <Text className="text-sm text-gray-500">{user?.role ?? '-'}</Text>
      </View>
    </View>
  );
}
