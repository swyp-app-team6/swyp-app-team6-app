import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EditProfilePage from '../EditProfilePage';
import useAuthStore from '@/entities/user/model/authStore';

const mockGoBack = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
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

describe('EditProfilePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      user: {
        id: 1,
        email: 'test@example.com',
        role: 'USER',
        provider: 'GOOGLE',
      },
    });
  });

  it('닉네임 입력 필드를 렌더링한다', async () => {
    await act(async () => {
      render(<EditProfilePage />, { wrapper: safeAreaWrapper });
    });
    const input = screen.getByPlaceholderText('닉네임을 입력해주세요');
    expect(input).toBeTruthy();
  });

  it('프로필 사진 변경 버튼을 렌더링한다', async () => {
    await act(async () => {
      render(<EditProfilePage />, { wrapper: safeAreaWrapper });
    });
    expect(screen.getByText('프로필 사진 변경')).toBeTruthy();
  });

  it('저장 버튼을 렌더링한다', async () => {
    await act(async () => {
      render(<EditProfilePage />, { wrapper: safeAreaWrapper });
    });
    expect(screen.getByText('저장')).toBeTruthy();
  });

  it('저장 버튼 클릭 시 뒤로 이동한다', async () => {
    await act(async () => {
      render(<EditProfilePage />, { wrapper: safeAreaWrapper });
    });

    await act(async () => {
      fireEvent.press(screen.getByText('저장'));
    });

    expect(mockGoBack).toHaveBeenCalled();
  });
});
