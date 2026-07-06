import { createNavigationContainerRef } from '@react-navigation/native';
import type { NavigatorType } from '@/shared/types';

/**
 * # navigationRef
 * ---
 * - 간단설명: React 컴포넌트 외부에서 네비게이션을 수행하기 위한 글로벌 ref
 * - 제약사항 및 특이사항:
 *   - StackRouter의 NavigationContainer에 반드시 연결해야 함
 *   - 인터셉터 등 컴포넌트 외부에서 navigation.reset() 대신 사용
 * ---
 * @example
 * import { navigationRef } from '@/shared/router/navigationRef';
 * navigationRef.resetRoot({ index: 0, routes: [{ name: 'login' }] });
 */
export const navigationRef = createNavigationContainerRef<NavigatorType>();
