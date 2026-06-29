import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/shared/lib/storageKeys';

/**
 * 조건별 화면 노출 상태
 * - hasSeenOnboarding: 온보딩 완료 여부 (true = 완료, 온보딩 스킵)
 * - isProfileCreated: 프로필 생성 필요 여부 (true = 미등록, 프로필 생성 페이지 진입)
 * - isAgreedToTerms: 이용약관 노출 여부 (true = 미동의, 이용약관 UI 노출)
 * - isPermissionAllowed: 접근권한 노출 여부 (true = 미완료, 접근권한 안내 UI 노출)
 */
interface ConditionState {
  hasSeenOnboarding: boolean;
  isProfileCreated: boolean;
  isAgreedToTerms: boolean;
  isPermissionAllowed: boolean;
}

/**
 * 조건별 화면 노출 액션
 * - setHasSeenOnboarding: 온보딩 완료 여부 설정
 * - setIsProfileCreated: 프로필 생성 필요 여부 설정
 * - setIsAgreedToTerms: 이용약관 노출 여부 설정
 * - setIsPermissionAllowed: 접근권한 노출 여부 설정
 * - initFromStorage: AsyncStorage에서 모든 플래그 복원
 * - clearAll: 모든 플래그 초기화 및 AsyncStorage 삭제
 */
interface ConditionActions {
  setHasSeenOnboarding: (value: boolean) => void;
  setIsProfileCreated: (value: boolean) => void;
  setIsAgreedToTerms: (value: boolean) => void;
  setIsPermissionAllowed: (value: boolean) => void;
  initFromStorage: () => Promise<void>;
  clearAll: () => Promise<void>;
}

/**
 * # useConditionStateStore
 * ---
 * - 간단설명: 화면 노출 조건 플래그를 관리하는 전역 스토어
 * - 제약사항 및 특이사항:
 *   - 모든 플래그는 AsyncStorage에 영속화
 *   - 앱 시작 시 initFromStorage() 호출 필요
 *   - 로그아웃/탈퇴 시 clearAll() 호출하여 초기화
 * TODO: 현재 테스트용으로 모두 true로 강제지정, 추후 storage 값에 따라 판별할 것
 * ---
 * @example
 * const { hasSeenOnboarding, isAgreedToTerms, setIsAgreedToTerms } = useConditionStateStore();
 */
const useConditionStateStore = create<ConditionState & ConditionActions>()(
  immer((set) => ({
    hasSeenOnboarding: true,
    isProfileCreated: true,
    isAgreedToTerms: true,
    isPermissionAllowed: true,

    /**
     * 온보딩 완료 여부 설정 (true = 온보딩 완료, 이후 스킵)
     * @param value 설정할 값
     */
    setHasSeenOnboarding: async (value: boolean) => {
      set((state) => {
        state.hasSeenOnboarding = true;
      });
      // await AsyncStorage.setItem(STORAGE_KEYS.HAS_SEEN_ONBOARDING, String(value));
    },

    /**
     * 프로필 생성 필요 여부 설정 (true = 프로필 미등록, 생성 페이지 진입)
     * TODO: 나중에 api상태로 변경 필요
     * @param value 설정할 값
     */
    setIsProfileCreated: async (value: boolean) => {
      set((state) => {
        state.isProfileCreated = true;
      });
      // await AsyncStorage.setItem(STORAGE_KEYS.IS_PROFILE_CREATED, String(value));
    },

    /**
     * 이용약관 노출 여부 설정 (true = 미동의, 이용약관 UI 노출)
     * TODO: 나중에 api상태로 변경 필요
     * @param value 설정할 값
     */
    setIsAgreedToTerms: async (value: boolean) => {
      set((state) => {
        state.isAgreedToTerms = true;
      });
      // await AsyncStorage.setItem(STORAGE_KEYS.IS_AGREED_TO_TERMS, String(value));
    },

    /**
     * 접근권한 노출 여부 설정 (true = 미완료, 접근권한 안내 UI 노출)
     * @param value 설정할 값
     */
    setIsPermissionAllowed: async (value: boolean) => {
      set((state) => {
        state.isPermissionAllowed = true;
      });
      // await AsyncStorage.setItem(STORAGE_KEYS.IS_PERMISSION_ALLOWED, String(value));
    },

    /**
     * AsyncStorage에서 모든 조건 플래그를 복원
     */
    initFromStorage: async () => {
      const [
        storedOnboarding,
        storedProfileCreated,
        storedAgreedToTerms,
        storedPermissionAllowed,
      ] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.HAS_SEEN_ONBOARDING),
        AsyncStorage.getItem(STORAGE_KEYS.IS_PROFILE_CREATED),
        AsyncStorage.getItem(STORAGE_KEYS.IS_AGREED_TO_TERMS),
        AsyncStorage.getItem(STORAGE_KEYS.IS_PERMISSION_ALLOWED),
      ]);

      set((state) => {
        state.hasSeenOnboarding = storedOnboarding === 'true';
        state.isProfileCreated = storedProfileCreated === 'true';
        state.isAgreedToTerms = storedAgreedToTerms === 'true';
        state.isPermissionAllowed = storedPermissionAllowed === 'true';
      });
    },

    /**
     * 모든 조건 플래그 초기화 및 AsyncStorage 삭제
     */
    clearAll: async () => {
      set((state) => {
        state.hasSeenOnboarding = false;
        state.isProfileCreated = false;
        state.isAgreedToTerms = false;
        state.isPermissionAllowed = false;
      });
      await Promise.all(
        Object.values(STORAGE_KEYS).map((key) => AsyncStorage.removeItem(key)),
      );
    },
  })),
);

export default useConditionStateStore;
