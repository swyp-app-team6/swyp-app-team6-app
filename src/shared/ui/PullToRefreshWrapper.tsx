import React, { useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

interface Props {
  /** 새로고침 시 호출되는 비동기 함수 */
  onRefetch: () => Promise<void>;
  children: React.ReactNode;
}

/**
 * # PullToRefreshWrapper
 * ---
 * - 간단설명: children을 감싸 pull-to-refresh 기능을 제공하는 래퍼 컴포넌트
 * - 제약사항 및 특이사항: ScrollView 기반으로 동작하므로 내부에 별도 ScrollView 중첩 주의
 * ---
 * @param onRefetch 새로고침 시 실행할 비동기 함수
 * @param children 감쌀 자식 요소
 * ---
 * @example
 * <PullToRefreshWrapper onRefetch={refetch}>
 *   <MyContent />
 * </PullToRefreshWrapper>
 */
export default function PullToRefreshWrapper({ onRefetch, children }: Props) {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await onRefetch();
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {children}
    </ScrollView>
  );
}
