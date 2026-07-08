import React from 'react';
import { Header, Layout } from '@/shared/ui';
import DefaultLoginView from '@/features/login/defaultLogin/ui/DefaultLoginView';
import { useNavigation } from '@react-navigation/native';
import type { NavigationPropType } from '@/shared/types';

/**
 * # DefaultLoginPage
 * ---
 * - 간단설명: 운영팀 안내받은 계정으로 ID/비밀번호 로그인하는 페이지
 * - 제약사항 및 특이사항:
 *   - LoginPage의 "로그인에 문제가 있나요?" 바텀시트에서 진입
 *   - 로그인 성공 시 home으로 이동
 * ---
 * @example
 * <DefaultLoginPage />
 */
function DefaultLoginPage() {
  const navigation = useNavigation<NavigationPropType>();

  const handleLoginSuccess = () => {
    navigation.reset({ index: 0, routes: [{ name: 'home' }] });
  };

  return (
    <Layout>
      <Header title="안내받은 계정 로그인" showBack />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        <DefaultLoginView onLoginSuccess={handleLoginSuccess} />
      </Layout.Body>
    </Layout>
  );
}

export default DefaultLoginPage;
