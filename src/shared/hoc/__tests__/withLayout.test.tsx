import React from 'react';
import { Text } from 'react-native';
import { act, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import withLayout from '../withLayout';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: jest.fn() }),
  useRoute: () => ({ name: 'profile' }),
}));

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: { PROJECT_ENV: 'production' },
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

function DummyPage() {
  return <Text>페이지 내용</Text>;
}

const WrappedPage = withLayout(DummyPage);

describe('withLayout', () => {
  it('하단 탭에 로그인 항목이 표시된다', async () => {
    await act(async () => {
      render(<WrappedPage />, { wrapper: safeAreaWrapper });
    });
    expect(screen.getByText('로그인')).toBeTruthy();
  });
});
