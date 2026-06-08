import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import TodoPage from '@/pages/todo/TodoPage';
import NotiScreen from '@/pages/todo/NotiScreen';
import LoginPage from '@/pages/login/LoginPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import ComponentPlaygroundPage from '@/pages/playground/ComponentPlaygroundPage';
import GalleryPage from '@/pages/gallery/GalleryPage';

const Stack = createNativeStackNavigator();

export default function StackRouter() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Todo123" component={TodoPage} />
        <Stack.Screen name="login" component={LoginPage} />
        <Stack.Screen name="Noti" component={NotiScreen} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="Gallery" component={GalleryPage} />
        <Stack.Screen name="Playground" component={ComponentPlaygroundPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
