import React from 'react';
import { Header, Layout } from '@/shared/ui';
import withLayout from '@/shared/hoc/withLayout';
import withAuthorization from '@/shared/hoc/withAuthorization';
import { StorageAllWidget } from '@/widgets/storage';

/**
 * # StorageAllPage
 * ---
 * - 간단설명: 보관함 전체보기 화면 — 전체 프로필 목록 + 검색 + 필터 + 편집 모드
 * - 제약사항 및 특이사항:
 *   - withLayout + withAuthorization HOC 적용
 *   - 비즈니스 로직은 StorageAllWidget에 위임
 *   - StoragePage에서 "전체보기" 클릭 시 Stack 네비게이션으로 진입
 * ---
 */
function StorageAllPage() {
  return (
    <>
      <Header title="보관함" />
      <Layout.Body styleClass={{ root: 'px-5 pt-6 bg-white' }}>
        <StorageAllWidget />
      </Layout.Body>
    </>
  );
}

export default withAuthorization(withLayout(StorageAllPage));
