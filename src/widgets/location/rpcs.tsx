// rpcs.tsx
import { Alert } from 'react-native';
import { useAuthStore } from '../../entities/user';
export const rpcs = {
  async alert(title: string, body: string) {
    Alert.alert(title, body);
    return 'ok';
  },
  /**
   * webview 로드 완료시 초기값 전달
   */
  onWebviewLoadEnd() {
    const { accessToken } = useAuthStore.getState();
    return {
      accessToken,
    };
  },
  /**
   * 위치전송 시작
   */
  onStartSendLocation() {},
  /**
   * 위치전송 종료
   */
  onStopSendLocation() {},
  /**
   * 각 값들 webview에 전달
   */
  onSendLocation() {},
};

export function useRpc() {}

export type WebViewRpcs = typeof rpcs;
