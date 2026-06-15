import { create } from 'zustand';

/** QR 페이지 탭 종류 */
export type QRTab = 'generate' | 'scan';

/**
 * # useQRTabStore
 * ---
 * - 간단설명: QR 페이지의 활성 탭 상태를 관리하는 Zustand 스토어
 * ---
 * @example
 * const { activeTab, setTab } = useQRTabStore();
 */
interface QRTabStore {
  /** 현재 활성 탭 */
  activeTab: QRTab;
  /** 탭 전환 함수 */
  setTab: (tab: QRTab) => void;
}

const useQRTabStore = create<QRTabStore>((set) => ({
  activeTab: 'generate',
  setTab: (tab) => set({ activeTab: tab }),
}));

export default useQRTabStore;
