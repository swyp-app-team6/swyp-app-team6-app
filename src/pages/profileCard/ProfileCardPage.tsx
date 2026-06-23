import React from 'react';
import { Header, Layout } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';

/**
 * # ProfileCardPage
 * ---
 * - 간단설명: 프로필카드 화면
 * ---
 */
function ProfileCardPage() {
  return (
    <>
      <Header title="프로필카드" />
      <Layout.Body styleClass={{ root: 'px-6 pt-10' }}>
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(ProfileCardPage));
