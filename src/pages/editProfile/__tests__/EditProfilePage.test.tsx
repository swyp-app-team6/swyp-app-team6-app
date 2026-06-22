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
        id: '1',
        email: 'test@example.com',
        name: '기존 닉네임',
        picture: 'https://example.com/pic.jpg',
        provider: 'google',
      },
    });
  });

  it('현재 닉네임을 입력 필드에 표시한다', async () => {
    await act(async () => {
      render(<EditProfilePage />, { wrapper: safeAreaWrapper });
    });
    const input = screen.getByDisplayValue('기존 닉네임');
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

  it('닉네임 수정 후 저장하면 authStore가 업데이트된다', async () => {
    await act(async () => {
      render(<EditProfilePage />, { wrapper: safeAreaWrapper });
    });

    const input = screen.getByDisplayValue('기존 닉네임');
    await act(async () => {
      fireEvent.changeText(input, '새 닉네임');
    });
    await act(async () => {
      fireEvent.press(screen.getByText('저장'));
    });

    expect(useAuthStore.getState().user?.name).toBe('새 닉네임');
  });
});
