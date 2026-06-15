import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import QRWidget from '../QRWidget';

jest.mock('../QRGenerateTab', () => {
  const { View, Text } = require('react-native');
  return () => <View><Text>GenerateTab</Text></View>;
});

jest.mock('../QRScanTab', () => {
  const { View, Text } = require('react-native');
  return () => <View><Text>ScanTab</Text></View>;
});

describe('QRWidget', () => {
  it('초기 렌더링 시 생성 탭 내용이 보인다', async () => {
    await render(<QRWidget />);
    expect(screen.getByText('GenerateTab')).toBeTruthy();
  });

  it('초기 렌더링 시 스캔 탭 내용이 보이지 않는다', async () => {
    await render(<QRWidget />);
    expect(screen.queryByText('ScanTab')).toBeNull();
  });

  it('"스캔" 탭 버튼 클릭 시 스캔 탭 내용이 보인다', async () => {
    await render(<QRWidget />);
    await fireEvent.press(screen.getByText('스캔'));
    expect(screen.getByText('ScanTab')).toBeTruthy();
  });

  it('"생성" 탭 버튼 클릭 시 생성 탭으로 돌아온다', async () => {
    await render(<QRWidget />);
    await fireEvent.press(screen.getByText('스캔'));
    await fireEvent.press(screen.getByText('생성'));
    expect(screen.getByText('GenerateTab')).toBeTruthy();
  });
});
