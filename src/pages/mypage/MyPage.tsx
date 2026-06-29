import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Header, Layout } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';
import useAuthStore from '@/entities/user/model/authStore';
import useConditionStateStore from '@/shared/model/conditionStateStore';
import type { NavigationPropType } from '@/shared/types';

/**
 * # MyPage
 * ---
 * - 간단설명: 회원정보 출력 및 회원탈퇴 진입을 제공하는 마이페이지 화면
 * - 제약사항 및 특이사항:
 *   - authStore의 user 정보를 출력
 *   - 회원탈퇴 버튼 클릭 시 WithdrawalPage로 이동
 * ---
 */
function MyPage() {
  const navigation = useNavigation<NavigationPropType>();
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clear);
  const clearCondition = useConditionStateStore((state) => state.clearAll);

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
        <View className="gap-4">
          <View className="gap-2">
            <Text className="text-sm text-gray-500">이메일</Text>
            <Text className="text-base text-gray-900">{user?.email ?? '-'}</Text>
          </View>
          <View className="gap-2">
            <Text className="text-sm text-gray-500">역할</Text>
            <Text className="text-base text-gray-900">{user?.role ?? '-'}</Text>
          </View>
          <View className="gap-2">
            <Text className="text-sm text-gray-500">로그인 방식</Text>
            <Text className="text-base text-gray-900">{user?.provider ?? '-'}</Text>
          </View>
        </View>
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

export default withAuthorization(withLayout(MyPage));
