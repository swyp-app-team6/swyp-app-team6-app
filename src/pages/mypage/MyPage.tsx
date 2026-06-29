import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Button, Header, Layout } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';
import useAuthStore from '@/entities/user/model/authStore';
import { UserAPI } from '@/entities/user';
import useConditionStateStore from '@/shared/model/conditionStateStore';
import { INTEREST_OPTIONS } from '@/features/register/model/types';
import type { Interest } from '@/entities/user';
import type { NavigationPropType } from '@/shared/types';

/**
 * 관심사 코드를 한국어 라벨로 변환
 */
function getInterestLabel(value: Interest): string {
  return INTEREST_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

/**
 * # MyPage
 * ---
 * - 간단설명: 프로필 정보 출력, 로그아웃 및 회원탈퇴 진입을 제공하는 마이페이지 화면
 * - 제약사항 및 특이사항:
 *   - UserAPI.query.profile로 프로필 정보 조회
 *   - 로그아웃 시 토큰 및 조건 플래그 초기화 후 로그인 화면 이동
 *   - 회원탈퇴 버튼 클릭 시 WithdrawalPage로 이동
 * ---
 */
function MyPage() {
  const navigation = useNavigation<NavigationPropType>();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clear);
  const clearCondition = useConditionStateStore((state) => state.clearAll);

  const { data: profileRes, isLoading } = useQuery(UserAPI.query.profile());
  const profile = profileRes?.data;

  /** 로그아웃: 토큰 및 조건 플래그 초기화 후 로그인 화면으로 이동 */
  const handleLogout = async () => {
    await clearAuth();
    await clearCondition();
    navigation.reset({
      index: 0,
      routes: [{ name: 'login' }],
    });
  };

  return (
    <>
      <Header title="마이페이지" />
      <Layout.Body styleClass={{ root: 'px-6 pt-10' }}>
        {isLoading ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#1A1A1A" />
          </View>
        ) : (
          <View className="gap-6">
            {/* 프로필 정보 */}
            <View className="gap-4">
              <InfoRow label="닉네임" value={profile?.nickname} />
              <InfoRow label="성별" value={profile?.gender === 'M' ? '남성' : profile?.gender === 'F' ? '여성' : undefined} />
              <InfoRow label="자기소개" value={profile?.bio} />
              <InfoRow label="키워드" value={profile?.keyword} />
              <InfoRow label="토픽" value={profile?.topic} />
              <View className="gap-2">
                <Text className="text-sm text-gray-500">관심사</Text>
                {profile?.interests && profile.interests.length > 0 ? (
                  <View className="flex-row flex-wrap gap-2">
                    {profile.interests.map((interest) => (
                      <View key={interest} className="rounded-full bg-gray-100 px-3 py-1.5">
                        <Text className="text-sm text-gray-700">{getInterestLabel(interest)}</Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-base text-gray-900">-</Text>
                )}
              </View>
            </View>

            {/* 계정 정보 */}
            <View className="border-t border-gray-100 pt-4 gap-4">
              <InfoRow label="이메일" value={user?.email} />
              <InfoRow label="로그인 방식" value={user?.provider} />
            </View>
          </View>
        )}

        <View className="mt-8 gap-3">
          <Button
            title="로그아웃"
            variant="secondary"
            onPress={handleLogout}
          />
          <Button
            title="회원탈퇴"
            variant="ghost"
            onPress={() => navigation.navigate('withdrawal')}
          />
        </View>
      </Layout.Body>
    </>
  );
}

/**
 * # InfoRow
 * ---
 * - 간단설명: 라벨-값 한 줄 정보 표시 컴포넌트
 * ---
 * @param label 항목 라벨
 * @param value 표시할 값
 */
function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <View className="gap-2">
      <Text className="text-sm text-gray-500">{label}</Text>
      <Text className="text-base text-gray-900">{value || '-'}</Text>
    </View>
  );
}

export default withAuthorization(withLayout(MyPage));
