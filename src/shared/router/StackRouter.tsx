import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { navigationRef } from './navigationRef';
import OnboardingPage from '@/pages/onboarding/OnboardingPage';
import LoginPage from '@/pages/login/LoginPage';
import RegisterPage from '@/pages/register/RegisterPage';
import HomePage from '@/pages/home/HomePage';
import ProfileCardPage from '@/pages/profileCard/ProfileCardPage';
import MyPage from '@/pages/mypage/MyPage';
import WithdrawalPage from '@/pages/withdrawal/WithdrawalPage';
import DefaultLoginPage from '@/pages/login/DefaultLoginPage';
import QRPage from '@/pages/qr/QRPage';
import StoragePage from '@/pages/storage/StoragePage';
import StorageAllPage from '@/pages/storage/StorageAllPage';
import ExchangedProfileDetailPage from '@/pages/storage/ExchangedProfileDetailPage';
import WriteReviewPage from '@/pages/storage/WriteReviewPage';
import ProfileDetailPage from '@/pages/profileDetail/ProfileDetailPage';
import CosmicTestPage from '@/pages/cosmicTest/CosmicTestPage';
import ExchangeResultPage from '@/pages/exchangeResult/ExchangeResultPage';
import EditProfilePage from '@/pages/editProfile/EditProfilePage';
import { NavigatorType } from '../types';
import ComponentPlaygroundPage from '../../pages/playground/ComponentPlaygroundPage';
import Config from 'react-native-config';

const Stack = createNativeStackNavigator<NavigatorType>();

interface StackRouterProps {
  /** 스플래시 이후 최초 표시할 화면 이름 */
  initialRouteName?: keyof NavigatorType;
}

/**
 * # StackRouter
 * ---
 * - 간단설명: 앱 전체 네비게이션 스택 라우터
 * - 제약사항 및 특이사항:
 *   - initialRouteName으로 스플래시 후 진입 화면 결정
 *   - 온보딩/로그인: 미인증 플로우
 *   - home, profileCard, mypage: 인증 후 하단 탭 네비게이션
 * ---
 * @param initialRouteName 최초 표시할 화면 (기본값: 'home')
 */
export default function StackRouter({ initialRouteName = 'home' }: StackRouterProps) {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false }}>
        <Stack.Screen name='onboarding' component={OnboardingPage} />
        <Stack.Screen name='login' component={LoginPage} />
        <Stack.Screen name='defaultLogin' component={DefaultLoginPage} />
        <Stack.Screen name='home' component={HomePage} options={{ animation: 'none' }} />
        <Stack.Screen name='profileCard' component={ProfileCardPage} options={{ animation: 'none' }} />
        <Stack.Screen name='mypage' component={MyPage} options={{ animation: 'none' }} />
        <Stack.Screen name='qr' component={QRPage} options={{ animation: 'none' }} />
        <Stack.Screen name='storage' component={StoragePage} options={{ animation: 'none' }} />
        <Stack.Screen name='storageAll' component={StorageAllPage} />
        <Stack.Screen name='exchangeResult' component={ExchangeResultPage} />
        <Stack.Screen name='exchangedProfileDetail' component={ExchangedProfileDetailPage} />
        <Stack.Screen name='writeReview' component={WriteReviewPage} />
        <Stack.Screen name='profileDetail' component={ProfileDetailPage} />
        <Stack.Screen name='registerProfile' component={RegisterPage} />
        <Stack.Screen name='cosmicTest' component={CosmicTestPage} />
        <Stack.Screen name='editProfile' component={EditProfilePage} />
        <Stack.Screen name='withdrawal' component={WithdrawalPage} />
        {
          Config.PROJECT_ENV === 'local' && (
            <Stack.Screen name='playground' component={ComponentPlaygroundPage} />
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
