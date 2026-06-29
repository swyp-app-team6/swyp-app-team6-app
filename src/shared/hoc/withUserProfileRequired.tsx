import React, { ComponentType, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserAPI } from '@/entities/user/api/userApi'
import { NavigatorType } from '@/shared/types'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ActivityIndicator, View } from 'react-native'
import axios from 'axios'

/**
 * # withUserProfileRequired
 * ---
 * - 간단설명: 유저 프로필이 등록되지 않은 경우 프로필 등록 화면으로 리다이렉트하는 HOC
 * - 제약사항:
 *   - 반드시 withAuthorization 안에서 사용할 것 (인증된 상태에서만 동작)
 *   - NavigationContainer 내부에서 사용해야 함
 *   - fetchProfile 호출 시 404 응답이면 registerProfile 화면으로 리다이렉트
 * ---
 * @param WrappedComponent 프로필이 필요한 컴포넌트
 * ---
 * @example
 * const ProtectedPage = withAuthorization(withUserProfileRequired(MyPage))
 */
export default function withUserProfileRequired<P extends object>(
  WrappedComponent: ComponentType<P>,
): ComponentType<P> {
  return function ProfileRequiredComponent(props: P) {
    const navigation = useNavigation<NativeStackNavigationProp<NavigatorType>>()
    const [isLoading, setIsLoading] = useState(true)
    const [hasProfile, setHasProfile] = useState(false)

    useEffect(() => {
      let cancelled = false

      const checkProfile = async () => {
        try {
          await UserAPI.fetchProfile()
          if (!cancelled) {
            setHasProfile(true)
            setIsLoading(false)
          }
        } catch (error) {
          if (!cancelled) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'registerProfile' }],
              })
            }
            setIsLoading(false)
          }
        }
      }

      checkProfile()

      return () => {
        cancelled = true
      }
    }, [navigation])

    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    if (!hasProfile) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}
