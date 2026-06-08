import React from 'react';
import { Header, Layout } from '@/shared/ui';
import ProfileCard from '@/widgets/profile/ProfileCard';
import withLayout from '@/shared/hoc/withLayout';

/**
 * # ProfilePage
 * ---
 * - 간단설명: 프로필 화면 - 사용자 정보 및 프로필 이미지 확인/수정
 * ---
 * @example
 * <ProfilePage />
 */
function ProfilePage() {
  return (
    <>
      <Header title="프로필" />
      <Layout.Body styleClass={{ root: 'bg-gray-50 items-center justify-center px-6' }}>
        <ProfileCard />
      </Layout.Body>
    </>
  );
}

export default withLayout(ProfilePage);
