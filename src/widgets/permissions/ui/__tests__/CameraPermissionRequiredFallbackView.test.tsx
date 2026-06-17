import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import CameraPermissionRequiredFallbackView from '../CameraPermissionRequiredFallbackView';

describe('CameraPermissionRequiredFallbackView', () => {
  it('카메라 권한 필요 안내 문구를 렌더링한다', async () => {
    await act(async () => {
      render(<CameraPermissionRequiredFallbackView />);
    });
    expect(screen.getByText('QR코드 인식을 위해서 카메라 권한이 필요합니다')).toBeTruthy();
  });

  it('권한 허용 버튼을 렌더링한다', async () => {
    await act(async () => {
      render(<CameraPermissionRequiredFallbackView />);
    });
    expect(screen.getByText('권한 허용하기')).toBeTruthy();
  });

  it('버튼 클릭 시 requestCameraPermission을 호출한다', async () => {
    const mockRequestCameraPermission = jest.fn();
    jest.mock('../../model/usePermissionStore', () => ({
      __esModule: true,
      default: () => ({
        cameraStatus: 'denied',
        requestCameraPermission: mockRequestCameraPermission,
      }),
    }));
    await act(async () => {
      render(<CameraPermissionRequiredFallbackView />);
    });
    fireEvent.press(screen.getByText('권한 허용하기'));
    expect(mockRequestCameraPermission).toHaveBeenCalledTimes(1);
  });
});
