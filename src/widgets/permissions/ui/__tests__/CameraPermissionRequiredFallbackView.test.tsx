import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import CameraPermissionRequiredFallbackView from '../CameraPermissionRequiredFallbackView';

describe('CameraPermissionRequiredFallbackView', () => {
  it('카메라 권한 필요 안내 문구를 렌더링한다', async () => {
    await act(async () => {
      render(<CameraPermissionRequiredFallbackView onRequestPermission={jest.fn()} />);
    });
    expect(screen.getByText('QR코드 인식을 위해서 카메라 권한이 필요합니다')).toBeTruthy();
  });

  it('권한 허용 버튼을 렌더링한다', async () => {
    await act(async () => {
      render(<CameraPermissionRequiredFallbackView onRequestPermission={jest.fn()} />);
    });
    expect(screen.getByText('권한 허용하기')).toBeTruthy();
  });

  it('버튼 클릭 시 onRequestPermission을 호출한다', async () => {
    const onRequestPermission = jest.fn();
    await act(async () => {
      render(<CameraPermissionRequiredFallbackView onRequestPermission={onRequestPermission} />);
    });
    fireEvent.press(screen.getByText('권한 허용하기'));
    expect(onRequestPermission).toHaveBeenCalledTimes(1);
  });
});
