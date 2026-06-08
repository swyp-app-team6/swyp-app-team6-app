import React, { ComponentType, useEffect, useMemo } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuthStore from '@/entities/user/model/authStore'
import LoginPage from '../../pages/login/LoginPage';

/**
 * # withAuthorization
 * ---
 * - 간단설명: accessToken이 없을 경우 login 화면으로 리다이렉트하는 HOC
 * - 제약사항:
 *   - NavigationContainer 내부에서 사용해야 함
 *   - accessToken 없는 경우 null 반환 (빈 화면)
 * ---
 * @param WrappedComponent 인증이 필요한 컴포넌트
 * ---
 * @example
 * const ProtectedPage = withAuthorization(MyPage)
 */
export default function withAuthorization<P extends object>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> {
  return function AuthorizedComponent(props: P) {
    const accessToken = useAuthStore((state) => state.accessToken)
    // TODO: 로그인 여부 추가로직 작성
    const isAuthorized = useMemo(() => {
      return accessToken;
    }, [accessToken])

    if (!isAuthorized) {
      return <LoginPage />
    }

    return <WrappedComponent {...props} />
  }
}
