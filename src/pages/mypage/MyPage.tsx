import React from 'react';
import { View } from 'react-native';
import { Header, Layout } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';

/**
 * # MyPage
 * ---
 * - 간단설명: 마이페이지 화면
 * ---
 */
function MyPage() {
  return (
    <>
      <Header title="마이페이지" />
      <Layout.Body styleClass={{ root: 'px-6 pt-10' }}>
        <View />
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(MyPage));
