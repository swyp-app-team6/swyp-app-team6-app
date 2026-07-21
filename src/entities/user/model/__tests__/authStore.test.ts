import { act, renderHook } from '@testing-library/react-native';
import useAuthStore from '../authStore';

const MOCK_USER = {
  id: 1,
  email: 'test@example.com',
  role: 'USER' as const,
  provider: 'GOOGLE' as const,
  profile_registered: false,
  profile_exchanged: false,
  review_registered: false,
};

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      accessToken: null,
      refreshToken: null,
      user: null,
    });
  });

  it('setUser는 유저 정보를 저장한다', async () => {
    const { result } = await renderHook(() => useAuthStore());

    await act(async () => {
      result.current.setUser(MOCK_USER);
    });

    expect(result.current.user).toEqual(MOCK_USER);
  });

  it('setTokens는 토큰을 저장한다', async () => {
    const { result } = await renderHook(() => useAuthStore());

    await act(async () => {
      result.current.setTokens({
        accessToken: 'test-access',
        refreshToken: 'test-refresh',
      });
    });

    expect(result.current.accessToken).toBe('test-access');
    expect(result.current.refreshToken).toBe('test-refresh');
  });

  it('clear는 모든 상태를 초기화한다', async () => {
    useAuthStore.setState({
      accessToken: 'token',
      refreshToken: 'refresh',
      user: MOCK_USER,
    });

    const { result } = await renderHook(() => useAuthStore());

    await act(async () => {
      result.current.clear();
    });

    expect(result.current.accessToken).toBeNull();
    expect(result.current.refreshToken).toBeNull();
    expect(result.current.user).toBeNull();
  });
});
