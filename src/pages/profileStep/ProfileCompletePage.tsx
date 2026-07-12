import React from 'react';
import { Header, Layout } from '@/shared/ui';
import { useRoute, type RouteProp } from '@react-navigation/native';
import RegisterCompleteView from '@/features/register/ui/RegisterCompleteView';
import type { NavigatorType } from '@/shared/types';

/**
 * # ProfileCompletePage
 * ---
 * - 간단설명: 프로필 등록/수정 완료 축하 페이지
 * - 제약사항 및 특이사항:
 *   - 하드웨어 백버튼으로 돌아가지 않도록 RegisterCompleteView 내부에서 navigation.reset 사용
 * ---
 * @example
 * navigation.navigate('profileComplete', { mode: 'register' })
 */
export default function ProfileCompletePage() {
  const route = useRoute<RouteProp<NavigatorType, 'profileComplete'>>();
  const { mode } = route.params;

  return (
    <>
      <Header title="" />
      <Layout.Body styleClass={{ root: 'bg-white' }}>
        <RegisterCompleteView mode={mode} />
      </Layout.Body>
    </>
  );
}
