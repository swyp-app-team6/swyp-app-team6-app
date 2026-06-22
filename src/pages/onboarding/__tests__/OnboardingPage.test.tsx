import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OnboardingPage from '../OnboardingPage';

const mockReset = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    reset: mockReset,
  }),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
}));

const mockRequestCameraPermission = jest.fn(() => Promise.resolve());
const mockRequestGalleryPermission = jest.fn(() => Promise.resolve());
jest.mock('@/widgets/permissions', () => ({
  usePermissionStore: () => ({
    cameraStatus: 'denied',
    galleryStatus: 'denied',
    requestCameraPermission: mockRequestCameraPermission,
    requestGalleryPermission: mockRequestGalleryPermission,
  }),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <SafeAreaProvider
    initialMetrics={{
      frame: { x: 0, y: 0, width: 375, height: 812 },
      insets: { top: 44, left: 0, right: 0, bottom: 34 },
    }}>
    {children}
  </SafeAreaProvider>
);

describe('OnboardingPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('권한 안내 문구를 렌더링한다', async () => {
    await act(async () => {
      render(<OnboardingPage />, { wrapper });
    });
    expect(screen.getByText(/카메라/)).toBeTruthy();
    expect(screen.getByText(/갤러리/)).toBeTruthy();
  });

  it('시작하기 버튼을 렌더링한다', async () => {
    await act(async () => {
      render(<OnboardingPage />, { wrapper });
    });
    expect(screen.getByText('시작하기')).toBeTruthy();
  });

  it('시작하기 버튼 클릭 시 권한을 요청한다', async () => {
    await act(async () => {
      render(<OnboardingPage />, { wrapper });
    });
    await act(async () => {
      fireEvent.press(screen.getByText('시작하기'));
    });
    expect(mockRequestCameraPermission).toHaveBeenCalledTimes(1);
    expect(mockRequestGalleryPermission).toHaveBeenCalledTimes(1);
  });
});
