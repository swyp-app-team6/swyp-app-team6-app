import '../../global.css';
import React from 'react';
import * as Sentry from '@sentry/react-native';
import StackRouter from '@/shared/router/StackRouter';
import AppProviders from '@/app/providers/AppProviders';
import Toast from 'react-native-toast-message';
import { setupInterceptors } from '../shared/api';

/**
 * navigation 화면 타입
 */
export type HomeStackParamList = {
  Home: undefined;
  Detail: { id: string };
};

setupInterceptors();

/**
 * App.tsx
 */
function App() {
  return (
    <AppProviders>
      <StackRouter />
      <Toast />
    </AppProviders>
  );
}

export default Sentry.wrap(App);
