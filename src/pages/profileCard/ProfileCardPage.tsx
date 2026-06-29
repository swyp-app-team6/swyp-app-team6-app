import React from 'react';
import { View } from 'react-native';
import { Header, Layout } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';
import withUserProfileRequired from '../../shared/hoc/withUserProfileRequired';

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
        <View />
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withUserProfileRequired(withLayout(ProfileCardPage)));
