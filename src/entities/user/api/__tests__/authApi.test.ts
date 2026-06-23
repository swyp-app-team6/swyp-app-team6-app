import { API } from '@/shared/api';
import { UserAPI } from '../userApi';

jest.mock('@/shared/api', () => ({
  API: {
    post: jest.fn(),
    get: jest.fn(),
  },
}));

describe('UserAPI.googleLogin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('/auth/google/app 엔드포인트로 idToken을 POST 한다', async () => {
    (API.post as jest.Mock).mockResolvedValueOnce({
      data: { access_token: 'access', refresh_token: 'refresh' },
    });

    await UserAPI.googleLogin('test-id-token');

    expect(API.post).toHaveBeenCalledWith(
      '/auth/google/app',
      { idToken: 'test-id-token' },
      { skipAuth: true },
    );
  });

  it('응답으로 access_token과 refresh_token을 반환한다', async () => {
    (API.post as jest.Mock).mockResolvedValueOnce({
      data: { access_token: 'my-access', refresh_token: 'my-refresh' },
    });

    const result = await UserAPI.googleLogin('token');

    expect(result.data).toEqual({ access_token: 'my-access', refresh_token: 'my-refresh' });
  });
});
