import React from 'react';
import { Header, Layout } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';
import { StorageWidget } from '@/widgets/storage';

/**
 * # StoragePage
 * ---
 * - 간단설명: 보관함 화면 — 저장된 프로필 카드 목록을 2열 그리드로 표시
 * - 제약사항 및 특이사항:
 *   - withLayout + withAuthorization HOC 적용
 *   - 비즈니스 로직은 StorageWidget에 위임
 * ---
 */
function StoragePage() {
  return (
    <>
      <Header title="보관함" />
      <Layout.Body styleClass={{ root: 'px-5 pt-6 bg-white' }}>
        <StorageWidget />
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(StoragePage));
