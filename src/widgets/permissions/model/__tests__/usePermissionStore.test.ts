import { act, renderHook } from '@testing-library/react-native';
import { RESULTS, check, request } from 'react-native-permissions';
import usePermissionStore from '../usePermissionStore';

describe('usePermissionStore', () => {
  beforeEach(() => {
    usePermissionStore.setState({ cameraStatus: 'unavailable' });
    jest.clearAllMocks();
  });

  it('초기 cameraStatus는 unavailable이다', async () => {
    const { result } = await renderHook(() => usePermissionStore());
    expect(result.current.cameraStatus).toBe('unavailable');
  });

  it('checkCameraPermission 호출 시 check()를 호출하고 cameraStatus를 갱신한다', async () => {
    (check as jest.Mock).mockResolvedValue(RESULTS.GRANTED);
    const { result } = await renderHook(() => usePermissionStore());
    await act(async () => {
      await result.current.checkCameraPermission();
    });
    expect(check).toHaveBeenCalledTimes(1);
    expect(result.current.cameraStatus).toBe('granted');
  });

  it('checkCameraPermission 호출 시 denied 결과를 cameraStatus에 반영한다', async () => {
    (check as jest.Mock).mockResolvedValue(RESULTS.DENIED);
    const { result } = await renderHook(() => usePermissionStore());
    await act(async () => {
      await result.current.checkCameraPermission();
    });
    expect(result.current.cameraStatus).toBe('denied');
  });

  it('checkCameraPermission 호출 시 limited 결과를 cameraStatus에 반영한다', async () => {
    (check as jest.Mock).mockResolvedValue(RESULTS.LIMITED);
    const { result } = await renderHook(() => usePermissionStore());
    await act(async () => {
      await result.current.checkCameraPermission();
    });
    expect(result.current.cameraStatus).toBe('limited');
  });

  it('requestCameraPermission 호출 시 request()를 호출하고 cameraStatus를 갱신한다', async () => {
    (request as jest.Mock).mockResolvedValue(RESULTS.GRANTED);
    const { result } = await renderHook(() => usePermissionStore());
    await act(async () => {
      await result.current.requestCameraPermission();
    });
    expect(request).toHaveBeenCalledTimes(1);
    expect(result.current.cameraStatus).toBe('granted');
  });

  it('requestCameraPermission 호출 시 blocked 결과를 cameraStatus에 반영한다', async () => {
    (request as jest.Mock).mockResolvedValue(RESULTS.BLOCKED);
    const { result } = await renderHook(() => usePermissionStore());
    await act(async () => {
      await result.current.requestCameraPermission();
    });
    expect(result.current.cameraStatus).toBe('blocked');
  });
});
