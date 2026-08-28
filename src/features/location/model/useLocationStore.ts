import { create } from 'zustand';
import type { LocationStore } from './types';

const initialState = {
  lat: 0,
  lng: 0,
  degree: 0,
  isEnabled: false,
  isServiceRunning: false,
};

/**
 * # useLocationStore
 * ---
 * - 간단설명: 위치 데이터를 관리하는 Zustand 스토어
 * - 제약사항 및 특이사항:
 *   - useForegroundLocationService 훅에서 업데이트
 *   - AppWebView에서 구독하여 WebView로 전달
 * ---
 * @example
 * const { lat, lng, isEnabled } = useLocationStore();
 */
const useLocationStore = create<LocationStore>((set) => ({
  ...initialState,

  updatePosition: (lat, lng, isEnabled) => set({ lat, lng, isEnabled }),

  updateDegree: (degree) => set({ degree }),

  setServiceRunning: (isServiceRunning) => set({ isServiceRunning }),

  reset: () => set(initialState),
}));

export default useLocationStore;
