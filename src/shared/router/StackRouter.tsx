import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import BootSplash from 'react-native-bootsplash';
import LoginPage from '@/pages/login/LoginPage';
import RegisterPage from '@/pages/register/RegisterPage';
import HomePage from '@/pages/home/HomePage';
import ProfileCardPage from '@/pages/profileCard/ProfileCardPage';
import MyPage from '@/pages/mypage/MyPage';
import WithdrawalPage from '@/pages/withdrawal/WithdrawalPage';
import { NavigatorType } from '../types';

const Stack = createNativeStackNavigator<NavigatorType>();

/**
 * # StackRouter
 * ---
 * - 간단설명: 앱 전체 네비게이션 스택 라우터
 * - 제약사항 및 특이사항:
 *   - 로그인 전: login → register
 *   - 로그인 후: home, profileCard, mypage (하단 탭 네비게이션)
 * ---
 */
export default function StackRouter() {
  return (
    <NavigationContainer onReady={() => BootSplash.hide({ fade: true })}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='login' component={LoginPage} />
        <Stack.Screen name='register' component={RegisterPage} />
        <Stack.Screen name='home' component={HomePage} options={{ animation: 'none' }} />
        <Stack.Screen name='profileCard' component={ProfileCardPage} options={{ animation: 'none' }} />
        <Stack.Screen name='mypage' component={MyPage} options={{ animation: 'none' }} />
        <Stack.Screen name='withdrawal' component={WithdrawalPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
