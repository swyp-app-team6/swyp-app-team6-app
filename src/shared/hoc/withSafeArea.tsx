import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

/**
 * # withSafeArea
 * ---
 * - 간단설명: 화면 전체를 SafeAreaView로 감싸 노치/홈 인디케이터 영역을 자동 처리하는 HOC
 * - 제약사항 및 특이사항:
 *   - edges top/bottom 모두 처리 (좌우는 일반적으로 불필요)
 *   - withLayout 바깥에서 감쌀 것: withSafeArea(withLayout(Page))
 * ---
 * @param WrappedComponent SafeArea를 적용할 페이지 컴포넌트
 * @example
 * export default withSafeArea(withAuthorization(withLayout(HomePage)));
 */
export default function withSafeArea<P extends object>(WrappedComponent: React.ComponentType<P>) {
  function WithSafeArea(props: P) {
    return (
      <SafeAreaView edges={['top', 'bottom']} style={{ flex: 1, backgroundColor: 'white' }}>
        <WrappedComponent {...props} />
      </SafeAreaView>
    );
  }
  WithSafeArea.displayName = `withSafeArea(${WrappedComponent.displayName ?? WrappedComponent.name})`;
  return WithSafeArea;
}
