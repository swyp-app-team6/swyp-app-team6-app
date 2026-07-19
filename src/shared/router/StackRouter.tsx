import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { navigationRef } from './navigationRef';
import OnboardingPage from '@/pages/onboarding/OnboardingPage';
import LoginPage from '@/pages/login/LoginPage';
import ProfileStep1Page from '@/pages/profileStep/ProfileStep1Page';
import ProfileStep2Page from '@/pages/profileStep/ProfileStep2Page';
import ProfileStep3Page from '@/pages/profileStep/ProfileStep3Page';
import ProfileStep4Page from '@/pages/profileStep/ProfileStep4Page';
import ProfileStep5Page from '@/pages/profileStep/ProfileStep5Page';
import ProfileStep6Page from '@/pages/profileStep/ProfileStep6Page';
import ProfileCompletePage from '@/pages/profileStep/ProfileCompletePage';
import HomePage from '@/pages/home/HomePage';
import ProfileCardPage from '@/pages/profileCard/ProfileCardPage';
import MyPage from '@/pages/mypage/MyPage';
import AppSettingPage from '@/pages/appSetting/AppSettingPage';
import AccountEditPage from '@/pages/accountEdit/AccountEditPage';
import WithdrawalReasonPage from '@/pages/withdrawal/WithdrawalReasonPage';
import WithdrawalConfirmPage from '@/pages/withdrawal/WithdrawalConfirmPage';
import DefaultLoginPage from '@/pages/login/DefaultLoginPage';
import QRPage from '@/pages/qr/QRPage';
import StoragePage from '@/pages/storage/StoragePage';
import StorageAllPage from '@/pages/storage/StorageAllPage';
import ExchangedProfileDetailPage from '@/pages/storage/ExchangedProfileDetailPage';
import WriteReviewPage from '@/pages/storage/WriteReviewPage';
import ProfileDetailPage from '@/pages/profileDetail/ProfileDetailPage';
import CosmicTestPage from '@/pages/cosmicTest/CosmicTestPage';
import ExchangeResultPage from '@/pages/exchangeResult/ExchangeResultPage';
import { NavigatorType } from '../types';
import ComponentPlaygroundPage from '../../pages/playground/ComponentPlaygroundPage';
import ApiLogPage from '../../pages/playground/ApiLogPage';
import SafeAreaTestPage from '../../pages/playground/SafeAreaTestPage';

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
        <Stack.Screen name='login' component={LoginPage} options={{ gestureEnabled: false }} />
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
        <Stack.Screen name='profileStep1' component={ProfileStep1Page} />
        <Stack.Screen name='profileStep2' component={ProfileStep2Page} />
        <Stack.Screen name='profileStep3' component={ProfileStep3Page} />
        <Stack.Screen name='profileStep4' component={ProfileStep4Page} />
        <Stack.Screen name='profileStep5' component={ProfileStep5Page} />
        <Stack.Screen name='profileStep6' component={ProfileStep6Page} />
        <Stack.Screen name='profileComplete' component={ProfileCompletePage} />
        <Stack.Screen name='cosmicTest' component={CosmicTestPage} />
        <Stack.Screen name='appSetting' component={AppSettingPage} />
        <Stack.Screen name='accountEdit' component={AccountEditPage} />
        <Stack.Screen name='withdrawalReason' component={WithdrawalReasonPage} />
        <Stack.Screen name='withdrawalConfirm' component={WithdrawalConfirmPage} />
        {
          __DEV__ && (
            <>
              <Stack.Screen name='playground' component={ComponentPlaygroundPage} />
              <Stack.Screen name='apiLog' component={ApiLogPage} />
              <Stack.Screen name='safeAreaTest' component={SafeAreaTestPage} />
            </>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
