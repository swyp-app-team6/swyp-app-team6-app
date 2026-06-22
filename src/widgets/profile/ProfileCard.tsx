import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import useAuthStore from '@/entities/user/model/authStore';

/**
 * # ProfileCard
 * ---
 * - 간단설명: 로그인된 사용자의 기본 정보를 카드 형태로 표시
 * - 제약사항 및 특이사항:
 *   - 마운트 시 fetchMe를 호출하여 최신 유저 정보를 서버에서 조회
 * ---
 * @example
 * <ProfileCard />
 */
export default function ProfileCard() {
  const user = useAuthStore((s) => s.user);
  const fetchMe = useAuthStore((s) => s.fetchMe);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return (
    <View className="items-center gap-4 p-6 bg-white rounded-2xl w-full">
      <View className="w-20 h-20 rounded-full bg-gray-200 items-center justify-center">
        <Text className="text-2xl text-gray-500">
          {user?.email?.charAt(0)?.toUpperCase() ?? '?'}
        </Text>
      </View>
      <View className="items-center gap-1">
        <Text className="text-xl font-bold text-gray-900">{user?.email ?? '-'}</Text>
        <Text className="text-sm text-gray-500">
          {user?.provider ?? '-'} · {user?.role ?? '-'}
        </Text>
      </View>
    </View>
  );
}
