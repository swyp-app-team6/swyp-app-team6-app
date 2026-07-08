import React, { ComponentType, useEffect, useMemo, useRef } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useAuthStore from '@/entities/user/model/authStore'
import useConditionStateStore from '@/shared/model/conditionStateStore'
import { Button } from '@/shared/ui'
import type { NavigationPropType } from '@/shared/types'

/**
 * # withAuthorization
 * ---
 * - 간단설명: accessToken이 없을 경우 로그인 안내 화면을 표시하는 HOC
 * - 제약사항:
 *   - NavigationContainer 내부에서 사용해야 함
 *   - accessToken 없는 경우 로그인 안내 뷰 + 로그인 CTA 표시
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
    const navigation = useNavigation<NavigationPropType>()
    const accessToken = useAuthStore((state) => state.accessToken)
    const user = useAuthStore((state) => state.user)
    const fetchUserInfo = useAuthStore((state) => state.fetchUserInfo)
    const hasVisitedFirstPage = useConditionStateStore((state) => state.hasVisitedFirstPage)
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

    /** 첫 방문 + 미인증 시 로그인 페이지로 즉시 리다이렉트 */
    useEffect(() => {
      if (hasVisitedFirstPage && !isAuthorized) {
        navigation.navigate('login');
      }
    }, [hasVisitedFirstPage, isAuthorized, navigation]);

    if (!isAuthorized && hasVisitedFirstPage) {
      return null;
    }

    if (!isAuthorized) {
      return (
        <View className="flex-1 items-center justify-center bg-white px-8">
          <Text className="text-base font-bold text-text-black text-center leading-[22.4px]">
            로그인 후 사용 가능합니다.
          </Text>
          <View className="w-[260px] mt-6">
            <Button title="로그인" variant="primary" onPress={() => navigation.navigate('login')} />
          </View>
        </View>
      )
    }

    return <WrappedComponent {...props} />
  }
}
