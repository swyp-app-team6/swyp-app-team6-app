import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import TodoPage from '@/pages/todo/TodoPage';
import NotiScreen from '@/pages/todo/NotiScreen';
import LoginPage from '@/pages/login/LoginPage';
import RegisterPage from '@/pages/register/RegisterPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import ComponentPlaygroundPage from '@/pages/playground/ComponentPlaygroundPage';
import GalleryPage from '@/pages/gallery/GalleryPage';
import withLayout from '../hoc/withLayout';
import { NavigatorType } from '../types';

const Stack = createNativeStackNavigator<NavigatorType>();

export default function StackRouter() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='gallery' component={GalleryPage} />
        <Stack.Screen name='register' component={RegisterPage} />
        <Stack.Screen name='playground' component={ComponentPlaygroundPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
