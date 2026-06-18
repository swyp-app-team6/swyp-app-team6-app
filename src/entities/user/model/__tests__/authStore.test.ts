import useAuthStore from '../authStore';

// EncryptedStorage mock
jest.mock('react-native-encrypted-storage', () => ({
  setItem: jest.fn().mockResolvedValue(undefined),
  getItem: jest.fn().mockResolvedValue(null),
  removeItem: jest.fn().mockResolvedValue(undefined),
}));

// getMe mock
jest.mock('../../api/authApi', () => ({
  getMe: jest.fn(),
}));

import EncryptedStorage from 'react-native-encrypted-storage';
import { getMe } from '../../api/authApi';

const mockedGetMe = getMe as jest.MockedFunction<typeof getMe>;

describe('authStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      accessToken: null,
      refreshToken: null,
      user: null,
    });
    jest.clearAllMocks();
  });

  it('setTokens로 토큰 저장 시 상태와 EncryptedStorage 모두 업데이트', () => {
    useAuthStore.getState().setTokens({
      access_token: 'at_123',
      refresh_token: 'rt_456',
    });

    const state = useAuthStore.getState();
    expect(state.accessToken).toBe('at_123');
    expect(state.refreshToken).toBe('rt_456');
    expect(EncryptedStorage.setItem).toHaveBeenCalledWith('accessToken', 'at_123');
    expect(EncryptedStorage.setItem).toHaveBeenCalledWith('refreshToken', 'rt_456');
  });

  it('clear 호출 시 상태와 EncryptedStorage 모두 초기화', () => {
    useAuthStore.getState().setTokens({
      access_token: 'at_123',
      refresh_token: 'rt_456',
    });
    useAuthStore.getState().clear();

    const state = useAuthStore.getState();
    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.user).toBeNull();
    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith('accessToken');
    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith('refreshToken');
  });

  it('fetchAndSetMe 호출 시 /users/me 응답으로 user 상태 설정', async () => {
    const mockUser = { id: 1, email: 'test@example.com', role: 'USER' as const, provider: 'GOOGLE' as const };
    mockedGetMe.mockResolvedValue({ data: mockUser } as any);

    await useAuthStore.getState().fetchAndSetMe();

    expect(mockedGetMe).toHaveBeenCalled();
    expect(useAuthStore.getState().user).toEqual(mockUser);
  });

  it('fetchAndSetMe 실패 시 user는 null 유지', async () => {
    mockedGetMe.mockRejectedValue(new Error('401'));

    await expect(useAuthStore.getState().fetchAndSetMe()).rejects.toThrow('401');
    expect(useAuthStore.getState().user).toBeNull();
  });
});
