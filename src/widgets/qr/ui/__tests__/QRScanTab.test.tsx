import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import QRScanTab from '../QRScanTab';

const mockRequestPermission = jest.fn();

jest.mock('react-native-vision-camera', () => ({
  useCameraPermission: jest.fn(() => ({
    hasPermission: false,
    requestPermission: mockRequestPermission,
  })),
  useCameraDevice: jest.fn(() => ({ id: 'back' })),
  useCodeScanner: jest.fn(() => ({})),
  Camera: ({ testID }: { testID?: string }) => {
    const { View } = require('react-native');
    return <View testID={testID ?? 'camera'} />;
  },
}));

describe('QRScanTab', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const { useCameraPermission } = require('react-native-vision-camera');
    (useCameraPermission as jest.Mock).mockReturnValue({
      hasPermission: false,
      requestPermission: mockRequestPermission,
    });
  });

  it('권한 없을 때 안내 문구를 표시한다', async () => {
    await render(<QRScanTab />);
    expect(screen.getByText('카메라 권한이 필요합니다')).toBeTruthy();
  });

  it('권한 없을 때 권한 요청 버튼을 표시한다', async () => {
    await render(<QRScanTab />);
    expect(screen.getByText('권한 요청')).toBeTruthy();
  });

  it('권한 요청 버튼 클릭 시 requestPermission을 호출한다', async () => {
    await render(<QRScanTab />);
    await fireEvent.press(screen.getByText('권한 요청'));
    expect(mockRequestPermission).toHaveBeenCalledTimes(1);
  });

  it('권한 있을 때 Camera 컴포넌트를 렌더링한다', async () => {
    const { useCameraPermission } = require('react-native-vision-camera');
    (useCameraPermission as jest.Mock).mockReturnValue({
      hasPermission: true,
      requestPermission: mockRequestPermission,
    });
    await render(<QRScanTab />);
    expect(screen.getByTestId('camera')).toBeTruthy();
  });
});
