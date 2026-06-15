import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import QRGenerateTab from '../QRGenerateTab';

jest.mock('react-native-qrcode-svg', () => {
  const React = require('react');
  const { View } = require('react-native');
  return ({ testID }: { testID?: string }) => <View testID={testID ?? 'qr-code'} />;
});

describe('QRGenerateTab', () => {
  it('입력값 없을 때 안내 문구를 표시한다', async () => {
    await render(<QRGenerateTab />);
    expect(screen.getByText('문구를 입력하세요')).toBeTruthy();
  });

  it('입력값 없을 때 QRCode를 렌더링하지 않는다', async () => {
    await render(<QRGenerateTab />);
    expect(screen.queryByTestId('qr-code')).toBeNull();
  });

  it('텍스트 입력 시 QRCode를 렌더링한다', async () => {
    await render(<QRGenerateTab />);
    await fireEvent.changeText(screen.getByPlaceholderText('QR로 만들 문구 입력'), 'hello');
    expect(screen.getByTestId('qr-code')).toBeTruthy();
  });

  it('텍스트 입력 시 안내 문구가 사라진다', async () => {
    await render(<QRGenerateTab />);
    await fireEvent.changeText(screen.getByPlaceholderText('QR로 만들 문구 입력'), 'hello');
    expect(screen.queryByText('문구를 입력하세요')).toBeNull();
  });
});
