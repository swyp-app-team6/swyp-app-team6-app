import { create } from 'zustand';
import type { QRTabStore } from './types';

/**
 * # useQRTabStore
 * ---
 * - 간단설명: QR 페이지의 활성 탭 상태를 관리하는 Zustand 스토어
 * ---
 * @example
 * const { activeTab, setTab } = useQRTabStore();
 */
const useQRTabStore = create<QRTabStore>((set) => ({
  activeTab: 'generate',
  setTab: (tab) => set({ activeTab: tab }),
}));

export default useQRTabStore;
