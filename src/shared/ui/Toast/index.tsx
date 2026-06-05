import React from 'react';
import RNToast from 'react-native-toast-message';

interface StyleClass {
  root?: string;
  viewport?: string;
}

interface ProviderProps {
  children: React.ReactNode;
  styleClass?: StyleClass;
}

function Provider({ children }: ProviderProps) {
  return (
    <>
      {children}
      <RNToast />
    </>
  );
}

const Toast = { Provider };

export default Toast;
