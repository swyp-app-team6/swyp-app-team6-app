import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RegisterPage from '../RegisterPage';

const mockReset = jest.fn();
const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    reset: mockReset,
    goBack: mockGoBack,
  }),
}));

jest.mock('@/widgets/permissions', () => ({
  usePermissionStore: () => ({
    galleryStatus: 'granted',
    requestGalleryPermission: jest.fn(),
  }),
}));

jest.mock('react-native-image-picker', () => ({
  launchImageLibrary: jest.fn(),
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

describe('RegisterPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('닉네임 입력 필드를 렌더링한다', async () => {
    await act(async () => {
      render(<RegisterPage />, { wrapper: safeAreaWrapper });
    });
    expect(screen.getByPlaceholderText('닉네임을 입력해주세요')).toBeTruthy();
  });

  it('프로필 사진 선택 버튼을 렌더링한다', async () => {
    await act(async () => {
      render(<RegisterPage />, { wrapper: safeAreaWrapper });
    });
    expect(screen.getByText('프로필 사진 선택')).toBeTruthy();
  });

  it('가입 완료 버튼을 렌더링한다', async () => {
    await act(async () => {
      render(<RegisterPage />, { wrapper: safeAreaWrapper });
    });
    expect(screen.getByText('가입 완료')).toBeTruthy();
  });

  it('로그인으로 돌아가기 버튼 클릭 시 goBack을 호출한다', async () => {
    await act(async () => {
      render(<RegisterPage />, { wrapper: safeAreaWrapper });
    });
    fireEvent.press(screen.getByText('로그인으로 돌아가기'));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
