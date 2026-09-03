/**
 * # NativeBridge
 * ---
 * - 간단설명: Native ↔ Web 브릿지 코어 클래스. window.onLocationUpdate 수신 및 이벤트 분기 처리
 * - 제약사항 및 특이사항:
 *   - 생성자에서 window.onLocationUpdate를 등록하여 네이티브 injectJavaScript 호출 수신
 *   - positionUpdate, degreeUpdate 이벤트로 분기하여 리스너에 전달
 *   - call() 메서드로 ReactNativeWebView.postMessage()를 통해 네이티브에 메시지 전송
 * ---
 * @example
 * const bridge = new NativeBridge();
 * bridge.on('positionUpdate', ({ lat, lng }) => console.log(lat, lng));
 * bridge.call('onStartSendLocation', {});
 */

type EventHandler = (data: unknown) => void;

declare global {
  interface Window {
    onLocationUpdate?: (lat: number, lng: number, degree: number, isEnabled: boolean) => void;
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export class NativeBridge {
  private listeners = new Map<string, Set<EventHandler>>();

  constructor() {
    window.onLocationUpdate = (lat: number, lng: number, degree: number, isEnabled: boolean) => {
      this.emit('positionUpdate', { lat, lng, isEnabled });
      this.emit('degreeUpdate', { degree });
    };
  }

  /**
   * # on
   * ---
   * - 간단설명: 이벤트 구독. 구독 해제 함수를 반환
   * ---
   * @param event 이벤트명
   * @param handler 이벤트 핸들러
   * @returns 구독 해제 함수
   */
  on(event: string, handler: EventHandler): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(handler);
    return () => {
      this.listeners.get(event)?.delete(handler);
    };
  }

  /**
   * # call
   * ---
   * - 간단설명: 네이티브에 RPC 메시지 전송
   * ---
   * @param method 호출할 메서드명
   * @param payload 전달할 데이터
   */
  call(method: string, payload?: unknown) {
    window.ReactNativeWebView?.postMessage(
      JSON.stringify({ type: method, payload })
    );
  }

  private emit(event: string, data: unknown) {
    this.listeners.get(event)?.forEach((handler) => handler(data));
  }
}
