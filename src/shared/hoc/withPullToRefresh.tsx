import React, { useState } from 'react';
import { RefreshControl } from 'react-native';

/**
 * # withPullToRefresh
 * ---
 * - 간단설명: refreshControl prop을 지원하는 컴포넌트에 pull-to-refresh 기능을 주입하는 HOC
 * - 제약사항 및 특이사항: WrappedComponent는 반드시 `refreshControl` prop을 받아야 함 (예: FlatList, ScrollView)
 * ---
 * @param WrappedComponent refreshControl prop을 지원하는 컴포넌트
 * @example
 * const RefreshableFlatList = withPullToRefresh(FlatList);
 * <RefreshableFlatList onRefetch={refetch} data={...} />
 */
export default function withPullToRefresh<P extends { refreshControl?: React.ReactElement }>(
  WrappedComponent: React.ComponentType<P>,
) {
  function WithPullToRefresh({
    onRefetch,
    ...props
  }: Omit<P, 'refreshControl'> & { onRefetch: () => Promise<void> }) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
      setRefreshing(true);
      await onRefetch();
      setRefreshing(false);
    };

    return (
      <WrappedComponent
        {...(props as P)}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    );
  }

  WithPullToRefresh.displayName = `withPullToRefresh(${WrappedComponent.displayName ?? WrappedComponent.name})`;
  return WithPullToRefresh;
}
