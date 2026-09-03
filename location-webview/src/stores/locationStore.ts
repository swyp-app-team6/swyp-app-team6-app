/**
 * # locationStore
 * ---
 * - 간단설명: 위치 상태 관리 Zustand 스토어
 * - 제약사항 및 특이사항:
 *   - setPosition, setDegree에서 NaN 방어 처리
 *   - reset()으로 초기값 복원
 * ---
 * @example
 * const { lat, lng, degree } = useLocationStore();
 */

import { create } from 'zustand';

interface LocationState {
  lat: number;
  lng: number;
  degree: number;
  enabled: boolean;
  setPosition: (lat: number, lng: number) => void;
  setDegree: (degree: number) => void;
  setEnabled: (enabled: boolean) => void;
  reset: () => void;
}

const initialState = {
  lat: 0,
  lng: 0,
  degree: 0,
  enabled: false,
};

export const useLocationStore = create<LocationState>((set) => ({
  ...initialState,
  setPosition: (lat, lng) =>
    set({ lat: Number.isNaN(lat) ? 0 : lat, lng: Number.isNaN(lng) ? 0 : lng }),
  setDegree: (degree) =>
    set({ degree: Number.isNaN(degree) ? 0 : degree }),
  setEnabled: (enabled) => set({ enabled }),
  reset: () => set(initialState),
}));
