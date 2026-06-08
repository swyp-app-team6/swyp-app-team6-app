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
import { NAV_NAME } from '../enums';

const Stack = createNativeStackNavigator();

export default function StackRouter() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={NAV_NAME.LOGIN} component={LoginPage} />
        <Stack.Screen name={NAV_NAME.REGISTER} component={RegisterPage} />
        <Stack.Screen name={NAV_NAME.GALLERY} component={GalleryPage} />
        <Stack.Screen name={NAV_NAME.PLAYGROUND} component={ComponentPlaygroundPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
