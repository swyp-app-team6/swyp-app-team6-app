import { renderHook, act } from '@testing-library/react-native';
import React from 'react';
import { Alert } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useGoogleLoginMutation from '../useGoogleLoginMutation';
import { UserAPI } from '@/entities/user';

const mockSetTokens = jest.fn();

jest.mock('@/entities/user/model/authStore', () => ({
  __esModule: true,
  default: () => ({
    setTokens: mockSetTokens,
  }),
}));

jest.spyOn(Alert, 'alert').mockImplementation(() => {});

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {
    configure: jest.fn(),
    hasPlayServices: jest.fn().mockResolvedValue(true),
    signIn: jest.fn().mockResolvedValue({
      type: 'success',
      data: { idToken: 'google-id-token' },
    }),
  },
  isErrorWithCode: jest.fn().mockReturnValue(false),
  isSuccessResponse: jest.fn().mockReturnValue(true),
  statusCodes: { IN_PROGRESS: 'IN_PROGRESS', PLAY_SERVICES_NOT_AVAILABLE: 'PLAY_SERVICES_NOT_AVAILABLE' },
}));

jest.mock('react-native-config', () => ({
  __esModule: true,
  default: {},
}));

jest.mock('@/entities/user', () => ({
  UserAPI: {
    googleLogin: jest.fn(),
  },
  useAuthStore: () => ({
    setTokens: mockSetTokens,
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return ({ children }: { children: React.ReactNode }) =>
    React.createElement(QueryClientProvider, { client: queryClient }, children);
};

describe('useGoogleLoginMutation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('성공 시 access_token과 refresh_token을 camelCase로 변환해 setTokens를 호출한다', async () => {
    (UserAPI.googleLogin as jest.Mock).mockResolvedValueOnce({
      data: { access_token: 'my-access', refresh_token: 'my-refresh' },
    });

    const { result } = await renderHook(() => useGoogleLoginMutation(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(undefined);
    });

    expect(mockSetTokens).toHaveBeenCalledWith({
      accessToken: 'my-access',
      refreshToken: 'my-refresh',
    });
  });

  it('signIn이 실패 응답을 반환하면 setTokens를 호출하지 않는다', async () => {
    const { isSuccessResponse } = require('@react-native-google-signin/google-signin');
    (isSuccessResponse as jest.Mock).mockReturnValueOnce(false);

    const { result } = await renderHook(() => useGoogleLoginMutation(), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      result.current.mutate(undefined);
    });

    expect(mockSetTokens).not.toHaveBeenCalled();
  });
});
