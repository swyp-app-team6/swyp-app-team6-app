import React from 'react';
import { View } from 'react-native';
import { Header, Layout } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';

/**
 * # HomePage
 * ---
 * - 간단설명: 로그인 후 진입하는 홈 화면
 * ---
 */
function HomePage() {
  return (
    <>
      <Header title="홈" />
      <Layout.Body styleClass={{ root: 'px-6 pt-10' }}>
        <View />
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(HomePage));
