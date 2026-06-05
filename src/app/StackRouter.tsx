import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import TodoPage from '@/pages/todo/TodoPage';
import NotiScreen from '@/pages/todo/NotiScreen';
import LoginPage from '@/pages/login/LoginPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import ComponentPlaygroundPage from '@/pages/playground/ComponentPlaygroundPage';
import GalleryPage from '@/pages/gallery/GalleryPage';
import useAuthStore from '@/entities/user/model/authStore';

const Stack = createNativeStackNavigator();

export default function StackRouter() {
  // TODO: 로그인 기능 활성화 시 아래 주석 해제
  // const accessToken = useAuthStore((state) => state.accessToken);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {accessToken ? ( */}
          <>
            <Stack.Screen name="Todo123" component={TodoPage} />
            <Stack.Screen name="Noti" component={NotiScreen} />
            <Stack.Screen name="Profile" component={ProfilePage} />
            <Stack.Screen name="Gallery" component={GalleryPage} />
            <Stack.Screen name="Playground" component={ComponentPlaygroundPage} />
          </>
        {/* ) : (
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
