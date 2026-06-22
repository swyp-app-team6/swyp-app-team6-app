import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WithdrawalPage from '../WithdrawalPage';
import useAuthStore from '@/entities/user/model/authStore';

const mockReset = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    reset: mockReset,
  }),
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

describe('WithdrawalPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      accessToken: 'test-token',
      refreshToken: 'test-refresh',
      user: {
        id: 1,
        email: 'test@example.com',
        role: 'USER',
        provider: 'GOOGLE',
      },
    });
  });

  it('1단계: 탈퇴 안내 문구를 렌더링한다', async () => {
    await act(async () => {
      render(<WithdrawalPage />, { wrapper: safeAreaWrapper });
    });
    expect(screen.getByText(/삭제되는 데이터/)).toBeTruthy();
    expect(screen.getByText('다음')).toBeTruthy();
  });

  it('2단계: 다음 클릭 시 탈퇴 사유 선택 화면으로 전환된다', async () => {
    await act(async () => {
      render(<WithdrawalPage />, { wrapper: safeAreaWrapper });
    });
    await act(async () => {
      fireEvent.press(screen.getByText('다음'));
    });
    expect(screen.getByText('사용 빈도가 낮아서')).toBeTruthy();
  });

  it('3단계: 사유 선택 후 다음 클릭 시 최종 확인 화면으로 전환된다', async () => {
    await act(async () => {
      render(<WithdrawalPage />, { wrapper: safeAreaWrapper });
    });
    // 1단계 → 2단계
    await act(async () => {
      fireEvent.press(screen.getByText('다음'));
    });
    // 사유 선택
    await act(async () => {
      fireEvent.press(screen.getByText('사용 빈도가 낮아서'));
    });
    // 2단계 → 3단계
    await act(async () => {
      fireEvent.press(screen.getByText('다음'));
    });
    expect(screen.getByText(/확인했습니다/)).toBeTruthy();
  });

  it('4단계: 체크박스 체크 후 탈퇴 버튼 클릭 시 authStore가 초기화되고 온보딩으로 이동한다', async () => {
    await act(async () => {
      render(<WithdrawalPage />, { wrapper: safeAreaWrapper });
    });
    // 1단계 → 2단계
    await act(async () => {
      fireEvent.press(screen.getByText('다음'));
    });
    // 사유 선택
    await act(async () => {
      fireEvent.press(screen.getByText('사용 빈도가 낮아서'));
    });
    // 2단계 → 3단계
    await act(async () => {
      fireEvent.press(screen.getByText('다음'));
    });
    // 체크박스 체크
    await act(async () => {
      fireEvent.press(screen.getByText(/확인했습니다/));
    });
    // 탈퇴 버튼 클릭
    await act(async () => {
      fireEvent.press(screen.getByText('탈퇴하기'));
    });

    expect(useAuthStore.getState().accessToken).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: 'onboarding' }],
    });
  });
});
