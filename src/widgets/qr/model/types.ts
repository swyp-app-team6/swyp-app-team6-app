/** QR 페이지 탭 종류 */
export type QRTab = 'generate' | 'scan';

/**
 * QR 탭 스토어 인터페이스
 * - activeTab: 현재 활성 탭
 * - setTab: 탭 전환 함수
 */
export interface QRTabStore {
  /** 현재 활성 탭 */
  activeTab: QRTab;
  /** 탭 전환 함수 */
  setTab: (tab: QRTab) => void;
}
