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

/**
 * # Toast.Provider
 * ---
 * - 간단설명: 토스트 알림을 사용하기 위한 프로바이더 컴포넌트
 * - 제약사항 및 특이사항:
 *   - react-native-toast-message 기반
 *   - 앱 최상위에 감싸서 사용
 *   - 토스트 표시는 `RNToast.show()` 호출로 사용
 * ---
 * @param children 앱 컴포넌트 트리
 * ---
 * @example
 * ```tsx
 * <Toast.Provider>
 *   <App />
 * </Toast.Provider>
 * ```
 */
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
