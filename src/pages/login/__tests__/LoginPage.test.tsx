import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginPage from '../LoginPage';

const mockNavigate = jest.fn();
const mockReset = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
    reset: mockReset,
  }),
}));

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {},
}));

const mockGoogleLoginMutateAsync = jest.fn().mockResolvedValue(null);
jest.mock('@/features/login/googleLogin/api/useGoogleLoginMutation', () => ({
  __esModule: true,
  default: () => ({
    mutateAsync: mockGoogleLoginMutateAsync,
    isPending: false,
  }),
}));

const safeAreaWrapper = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaProvider
    initialMetrics={{
      frame: { x: 0, y: 0, width: 375, height: 812 },
      insets: { top: 44, left: 0, right: 0, bottom: 34 },
    }}>
    {children}
  </SafeAreaProvider>
);

describe('LoginPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Google 로그인 버튼을 렌더링한다', async () => {
    await act(async () => {
      render(<LoginPage />, { wrapper: safeAreaWrapper });
    });
    expect(screen.getByText('Google로 로그인')).toBeTruthy();
  });

  it('Apple 로그인 버튼을 렌더링한다', async () => {
    await act(async () => {
      render(<LoginPage />, { wrapper: safeAreaWrapper });
    });
    expect(screen.getByText('Apple로 로그인')).toBeTruthy();
  });

  it('더미 로그인 버튼을 렌더링한다', async () => {
    await act(async () => {
      render(<LoginPage />, { wrapper: safeAreaWrapper });
    });
    expect(screen.getByText('개발용 로그인')).toBeTruthy();
  });

  it('회원가입 버튼 클릭 시 register 화면으로 이동한다', async () => {
    await act(async () => {
      render(<LoginPage />, { wrapper: safeAreaWrapper });
    });
    fireEvent.press(screen.getByText('회원가입'));
    expect(mockNavigate).toHaveBeenCalledWith('register');
  });

  it('Google 로그인 버튼 클릭 시 googleLogin mutation이 호출된다', async () => {
    await act(async () => {
      render(<LoginPage />, { wrapper: safeAreaWrapper });
    });
    await act(async () => {
      fireEvent.press(screen.getByText('Google로 로그인'));
    });
    expect(mockGoogleLoginMutateAsync).toHaveBeenCalled();
  });
});
