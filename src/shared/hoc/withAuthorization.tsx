import React, { ComponentType, useEffect, useMemo, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import useAuthStore from '@/entities/user/model/authStore'
import LoginPage from '../../pages/login/LoginPage';

/**
 * # withAuthorization
 * ---
 * - 간단설명: accessToken이 없을 경우 login 화면으로 리다이렉트하는 HOC
 * - 제약사항:
 *   - NavigationContainer 내부에서 사용해야 함
 *   - accessToken 없는 경우 LoginPage 표시
 *   - 인증 성공 시 최초 1회 fetchUserInfo 호출하여 userInfo 초기화
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
    const user = useAuthStore((state) => state.user)
    const fetchUserInfo = useAuthStore((state) => state.fetchUserInfo)
    const hasFetched = useRef(false);

    const isAuthorized = useMemo(() => {
      return accessToken;
    }, [accessToken])

    /** 인증 성공 시 최초 1회 userInfo 초기화 */
    useEffect(() => {
      if (isAuthorized && !user && !hasFetched.current) {
        hasFetched.current = true;
        fetchUserInfo();
      }
    }, [isAuthorized, user, fetchUserInfo]);

    if (!isAuthorized) {
      return <LoginPage />
    }

    return <WrappedComponent {...props} />
  }
}
