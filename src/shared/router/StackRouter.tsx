import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import RegisterPage from '@/pages/register/RegisterPage';
import HomePage from '@/pages/home/HomePage';
import ProfileCardPage from '@/pages/profileCard/ProfileCardPage';
import MyPage from '@/pages/mypage/MyPage';
import WithdrawalPage from '@/pages/withdrawal/WithdrawalPage';
import { NavigatorType } from '../types';
import ComponentPlaygroundPage from '../../pages/playground/ComponentPlaygroundPage';
import Config from 'react-native-config';

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
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='home' component={HomePage} options={{ animation: 'none' }} />
        <Stack.Screen name='profileCard' component={ProfileCardPage} options={{ animation: 'none' }} />
        <Stack.Screen name='mypage' component={MyPage} options={{ animation: 'none' }} />
        <Stack.Screen name='register' component={RegisterPage} />
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
