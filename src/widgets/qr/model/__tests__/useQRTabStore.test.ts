import { act, renderHook } from '@testing-library/react-native';
import useQRTabStore from '../useQRTabStore';

describe('useQRTabStore', () => {
  beforeEach(() => {
    useQRTabStore.setState({ activeTab: 'generate' });
  });

  it('초기 탭은 generate이다', async () => {
    const { result } = await renderHook(() => useQRTabStore());
    expect(result.current.activeTab).toBe('generate');
  });

  it('setTab("scan") 호출 시 activeTab이 scan으로 변경된다', async () => {
    const { result } = await renderHook(() => useQRTabStore());
    await act(async () => {
      result.current.setTab('scan');
    });
    expect(result.current.activeTab).toBe('scan');
  });

  it('setTab("generate") 호출 시 activeTab이 generate로 변경된다', async () => {
    const { result } = await renderHook(() => useQRTabStore());
    await act(async () => {
      result.current.setTab('scan');
    });
    await act(async () => {
      result.current.setTab('generate');
    });
    expect(result.current.activeTab).toBe('generate');
  });
});
