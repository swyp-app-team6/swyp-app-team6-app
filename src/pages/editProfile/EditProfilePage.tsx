import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Header, Layout } from '@/shared/ui';
import { EditProfileFormView } from '@/features/editProfile';

/**
 * # EditProfilePage
 * ---
 * - 간단설명: 회원정보 수정 화면 - 닉네임, 프로필 사진 변경
 * - 제약사항 및 특이사항:
 *   - authStore에서 현재 유저 정보를 로드하여 표시
 *   - 저장 시 authStore.updateUser()로 부분 업데이트
 * ---
 * @example
 * <EditProfilePage />
 */
function EditProfilePage() {
  const navigation = useNavigation();

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <>
      <Header title="회원정보 수정" showBack />
      <Layout.Body styleClass={{ root: 'px-6 pt-10' }}>
        <EditProfileFormView onSave={handleSave} />
      </Layout.Body>
    </>
  );
}

export default EditProfilePage;
