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
 * - 간단설명: 로그아웃 및 회원탈퇴 진입을 제공하는 마이페이지 화면
 * - 제약사항 및 특이사항:
 *   - 로그아웃 시 토큰 및 조건 플래그 초기화 후 로그인 화면 이동
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
    try {
      await clearAuth();
      await clearCondition();
      navigation.reset({
        index: 0,
        routes: [{ name: 'home' }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Header title="마이페이지" />
      <Layout.Body styleClass={{ root: 'px-6 pt-10' }}>
        {/* 계정 정보 */}
        <View className="gap-4">
          <InfoRow label="이메일" value={user?.email} />
          <InfoRow label="로그인 방식" value={user?.provider} />
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
