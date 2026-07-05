import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { useMyProfileQuery } from '@/entities/user';

/**
 * # ProfileCard
 * ---
 * - 간단설명: 로그인된 사용자의 프로필 정보를 카드 형태로 표시
 * - 제약사항 및 특이사항:
 *   - useMyProfileQuery로 실제 프로필 데이터 조회
 *   - 프로필 이미지가 없으면 닉네임 첫 글자 표시
 * ---
 * @example
 * <ProfileCard />
 */
export default function ProfileCard() {
  const { data: profile, isLoading } = useMyProfileQuery();

  if (isLoading) {
    return (
      <View className="items-center justify-center p-6 bg-white rounded-2xl w-full h-40">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="items-center gap-4 p-6 bg-white rounded-2xl w-full">
      <View className="w-20 h-20 rounded-full bg-gray-200 items-center justify-center overflow-hidden">
        {profile?.image_key ? (
          <Image
            source={{ uri: profile.image_key }}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <Text className="text-2xl text-gray-500">
            {profile?.nickname?.charAt(0)?.toUpperCase() ?? '?'}
          </Text>
        )}
      </View>
      <View className="items-center gap-1">
        <Text className="text-xl font-bold text-gray-900">
          {profile?.nickname ?? '-'}
        </Text>
        <Text className="text-sm text-gray-500">
          {profile?.job ?? '-'} · {profile?.region ?? '-'}
        </Text>
      </View>
    </View>
  );
}
