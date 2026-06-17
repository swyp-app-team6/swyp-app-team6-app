import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import QRScanView from '../QRScanView';
import { usePermissionStore } from '../../../permissions';

const mockRequestCameraPermission = jest.fn();

jest.mock('../../../permissions', () => ({
  usePermissionStore: jest.fn(),
}));

jest.mock('react-native-vision-camera-barcode-scanner', () => ({
  CodeScanner: () => {
    const { View } = require('react-native');
    return <View testID='code-scanner' />;
  },
}));

describe('QRScanView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (usePermissionStore as unknown as jest.Mock).mockReturnValue({
      cameraStatus: 'granted',
      requestCameraPermission: mockRequestCameraPermission,
    });
  });

  it('진입 시 카메라 권한을 요청한다', async () => {
    await act(async () => {
      render(<QRScanView isActive={true} onScanned={jest.fn()} onError={jest.fn()} />);
    });
    expect(mockRequestCameraPermission).toHaveBeenCalledTimes(1);
  });

  it('cameraStatus가 granted일 때 CodeScanner를 렌더링한다', async () => {
    await act(async () => {
      render(<QRScanView isActive={true} onScanned={jest.fn()} onError={jest.fn()} />);
    });
    expect(screen.getByTestId('code-scanner')).toBeTruthy();
  });

  it('cameraStatus가 denied일 때 권한 안내 fallback을 렌더링한다', async () => {
    (usePermissionStore as unknown as jest.Mock).mockReturnValue({
      cameraStatus: 'denied',
      requestCameraPermission: mockRequestCameraPermission,
    });
    await act(async () => {
      render(<QRScanView isActive={false} onScanned={jest.fn()} onError={jest.fn()} />);
    });
    expect(screen.getByText('QR코드 인식을 위해서 카메라 권한이 필요합니다')).toBeTruthy();
  });

  it('cameraStatus가 blocked일 때 권한 안내 fallback을 렌더링한다', async () => {
    (usePermissionStore as unknown as jest.Mock).mockReturnValue({
      cameraStatus: 'blocked',
      requestCameraPermission: mockRequestCameraPermission,
    });
    await act(async () => {
      render(<QRScanView isActive={false} onScanned={jest.fn()} onError={jest.fn()} />);
    });
    expect(screen.getByText('QR코드 인식을 위해서 카메라 권한이 필요합니다')).toBeTruthy();
  });

  it('denied 상태에서 권한 요청 버튼 클릭 시 requestCameraPermission을 호출한다', async () => {
    (usePermissionStore as unknown as jest.Mock).mockReturnValue({
      cameraStatus: 'denied',
      requestCameraPermission: mockRequestCameraPermission,
    });
    await act(async () => {
      render(<QRScanView isActive={false} onScanned={jest.fn()} onError={jest.fn()} />);
    });
    fireEvent.press(screen.getByText('권한 허용하기'));
    expect(mockRequestCameraPermission).toHaveBeenCalledTimes(2); // 1 from useEffect, 1 from button
  });
});
