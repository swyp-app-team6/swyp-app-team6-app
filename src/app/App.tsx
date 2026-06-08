import '../../global.css';
import React, { useState } from 'react';
import StackRouter from '@/shared/router/StackRouter';
import AppProviders from '@/app/providers/AppProviders';
import Toast from 'react-native-toast-message';

/**
 * navigation 화면 타입
 */
export type HomeStackParamList = {
  Home: undefined;
  Detail: { id: string };
};


function App() {
  return (
    <AppProviders>
      <StackRouter />
      <Toast />
    </AppProviders>
  );
}

export default App;
