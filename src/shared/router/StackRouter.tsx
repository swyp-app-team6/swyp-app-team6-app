import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import OnboardingPage from '@/pages/onboarding/OnboardingPage';
import LoginPage from '@/pages/login/LoginPage';
import RegisterPage from '@/pages/register/RegisterPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import EditProfilePage from '@/pages/editProfile/EditProfilePage';
import WithdrawalPage from '@/pages/withdrawal/WithdrawalPage';
import ComponentPlaygroundPage from '@/pages/playground/ComponentPlaygroundPage';
import GalleryPage from '@/pages/gallery/GalleryPage';
import QRPage from '@/pages/qr/QRPage';
import { NavigatorType } from '../types';
import Config from 'react-native-config';

const Stack = createNativeStackNavigator<NavigatorType>();

/**
 * StackNavigator, 새 view 추가는 여기서
 */
export default function StackRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='onboarding' component={OnboardingPage} />
        <Stack.Screen name='login' component={LoginPage} />
        <Stack.Screen name='register' component={RegisterPage} />
        <Stack.Screen name='qr' component={QRPage} />
        <Stack.Screen name='profile' component={ProfilePage} />
        <Stack.Screen name='gallery' component={GalleryPage} />
        <Stack.Screen name='editProfile' component={EditProfilePage} />
        <Stack.Screen name='withdrawal' component={WithdrawalPage} />
        {
          Config.PROJECT_ENV === 'local' && <Stack.Screen name='playground' component={ComponentPlaygroundPage} />
        }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
