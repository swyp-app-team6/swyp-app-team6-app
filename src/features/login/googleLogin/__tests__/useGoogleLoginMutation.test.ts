import InAppBrowser from 'react-native-inappbrowser-reborn';

jest.mock('react-native-inappbrowser-reborn');
jest.mock('react-native-config', () => ({
  API_URL: 'http://localhost:8080',
}));
jest.mock('react-native-encrypted-storage', () => ({
  setItem: jest.fn().mockResolvedValue(undefined),
  getItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn().mockResolvedValue(undefined),
}));
jest.mock('@/entities/user/api/authApi', () => ({
  getMe: jest.fn(),
}));

import { getMe } from '@/entities/user/api/authApi';
import useAuthStore from '@/entities/user/model/authStore';
import { performGoogleLogin } from '../api/useGoogleLoginMutation';

const mockedInAppBrowser = InAppBrowser as jest.Mocked<typeof InAppBrowser>;
const mockedGetMe = getMe as jest.MockedFunction<typeof getMe>;

describe('performGoogleLogin', () => {
  beforeEach(() => {
    useAuthStore.setState({
      accessToken: null,
      refreshToken: null,
      user: null,
    });
    jest.clearAllMocks();
  });

  it('InAppBrowser 성공 시 토큰 저장 및 유저 정보 조회', async () => {
    mockedInAppBrowser.openAuth.mockResolvedValue({
      type: 'success',
      url: 'swyp://oauth/callback?access_token=at_123&refresh_token=rt_456',
    });
    mockedGetMe.mockResolvedValue({
      data: { id: 1, email: 'test@example.com', role: 'USER', provider: 'GOOGLE' },
    } as any);

    await performGoogleLogin();

    const state = useAuthStore.getState();
    expect(state.accessToken).toBe('at_123');
    expect(state.refreshToken).toBe('rt_456');
    expect(state.user).toEqual({
      id: 1,
      email: 'test@example.com',
      role: 'USER',
      provider: 'GOOGLE',
    });
  });

  it('사용자가 브라우저를 닫으면 에러 없이 종료', async () => {
    mockedInAppBrowser.openAuth.mockResolvedValue({
      type: 'cancel',
      url: '',
    });

    await expect(performGoogleLogin()).resolves.toBeUndefined();

    const state = useAuthStore.getState();
    expect(state.accessToken).toBeNull();
  });

  it('토큰 파싱 실패 시 에러 throw', async () => {
    mockedInAppBrowser.openAuth.mockResolvedValue({
      type: 'success',
      url: 'swyp://oauth/callback',
    });

    await expect(performGoogleLogin()).rejects.toThrow();
  });
});
