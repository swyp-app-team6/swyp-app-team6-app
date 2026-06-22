import { act, renderHook } from '@testing-library/react-native';
import useAuthStore from '../authStore';

const MOCK_USER = {
  id: '1',
  email: 'test@example.com',
  name: '테스트 유저',
  picture: 'https://example.com/pic.jpg',
  provider: 'google' as const,
};

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      accessToken: null,
      refreshToken: null,
      user: null,
      localProfileImage: null,
    });
  });

  it('updateUser는 유저 정보를 부분적으로 업데이트한다', async () => {
    useAuthStore.setState({ user: { ...MOCK_USER } });

    const { result } = await renderHook(() => useAuthStore());

    await act(async () => {
      result.current.updateUser({ name: '변경된 이름' });
    });

    expect(result.current.user?.name).toBe('변경된 이름');
    expect(result.current.user?.email).toBe('test@example.com');
  });

  it('updateUser는 user가 null이면 아무 동작도 하지 않는다', async () => {
    const { result } = await renderHook(() => useAuthStore());

    await act(async () => {
      result.current.updateUser({ name: '변경된 이름' });
    });

    expect(result.current.user).toBeNull();
  });

  it('updateUser로 프로필 이미지를 변경할 수 있다', async () => {
    useAuthStore.setState({ user: { ...MOCK_USER } });

    const { result } = await renderHook(() => useAuthStore());

    await act(async () => {
      result.current.updateUser({ picture: 'https://example.com/new-pic.jpg' });
    });

    expect(result.current.user?.picture).toBe('https://example.com/new-pic.jpg');
    expect(result.current.user?.name).toBe('테스트 유저');
  });
});
