import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import { Modal } from '@/shared/ui/Modal';
import { Button } from '@/shared/ui/Button';

/**
 * ErrorDialog 파라미터
 * - isOpen = 에러 다이얼로그 열림 여부
 * - title = 에러 제목
 * - message = 에러 메시지
 * - buttonLabel = 버튼 텍스트
 * - onRetry = 버튼 클릭 시 콜백
 */
export interface IErrorDialogParams {
  /** 에러 다이얼로그 열림 여부 */
  isOpen: boolean;
  /** 에러 제목 */
  title: string;
  /** 에러 메시지 */
  message: string;
  /** 버튼 텍스트 */
  buttonLabel: string;
  /** 버튼 클릭 시 실행 함수 */
  onRetry?: () => void;
}

interface ErrorDialogStore extends IErrorDialogParams {
  openErrorDialog: (params: Partial<IErrorDialogParams>) => void;
  closeErrorDialog: () => void;
}
// TODO: 재시도인지 확인필요, 만약 재시도면 추후 구현 후 문구 "확인으로 변경"
const initialState: Omit<ErrorDialogStore, 'openErrorDialog' | 'closeErrorDialog'> = {
  isOpen: false,
  title: '',
  message: '다시 시도 해주세요',
  buttonLabel: '다시 시도하기',
  onRetry: undefined,
};

export const errorDialogStore = createStore<ErrorDialogStore>((set) => ({
  ...initialState,
  openErrorDialog: (params) => set({ ...initialState, ...params, isOpen: true }),
  closeErrorDialog: () => set({ isOpen: false }),
}));

/**
 * # openErrorDialog
 * ---
 * - 간단설명: 전역 에러 다이얼로그를 여는 함수
 * - 제약사항 및 특이사항:
 *   - 컴포넌트 외부에서도 호출 가능 (vanilla store 기반)
 *   - 기본값: title='일시적인 오류가 발생했어요', message='다시 시도 해주세요', buttonLabel='다시 시도하기'
 * ---
 * @param params 에러 다이얼로그에 전달할 파라미터 (IErrorDialogParams의 일부)
 * ---
 * @example
 * ```tsx
 * openErrorDialog({ onRetry: () => refetch() });
 * openErrorDialog({ title: '네트워크 오류', message: '인터넷 연결을 확인해주세요', onRetry: handleRetry });
 * ```
 */
export const openErrorDialog = (params?: Partial<IErrorDialogParams>) => {
  errorDialogStore.getState().openErrorDialog(params ?? {});
};

/**
 * # closeErrorDialog
 * ---
 * - 간단설명: 전역 에러 다이얼로그를 닫는 함수
 * ---
 * @example
 * ```tsx
 * closeErrorDialog();
 * ```
 */
export const closeErrorDialog = () => {
  errorDialogStore.getState().closeErrorDialog();
};

/**
 * # ErrorDialog
 * ---
 * - 간단설명: 에러 발생 시 표시되는 전역 다이얼로그 컴포넌트
 * - 제약사항 및 특이사항:
 *   - zustand vanilla store 기반으로 컴포넌트 외부에서 openErrorDialog/closeErrorDialog 호출 가능
 *   - App 루트에 한 번만 렌더링하면 전역에서 사용 가능
 *   - 에러 아이콘 + 제목 + 메시지 + 재시도 버튼 구성
 * ---
 * @example
 * ```tsx
 * // App 루트에 배치
 * <ErrorDialog />
 *
 * // 어디서든 호출
 * openErrorDialog({ onRetry: () => refetch() });
 * openErrorDialog({
 *   title: '네트워크 오류',
 *   message: '인터넷 연결을 확인해주세요',
 *   buttonLabel: '재시도',
 *   onRetry: handleRetry,
 * });
 * ```
 */
export default function ErrorDialog() {
  const {
    isOpen,
    title,
    message,
    buttonLabel,
    onRetry,
    closeErrorDialog: storeClose,
  } = useStore(errorDialogStore);

  const handleRetry = useCallback(() => {
    onRetry?.();
    storeClose();
  }, [onRetry, storeClose]);

  const handleClose = useCallback(() => {
    storeClose();
  }, [storeClose]);

  return (
    <Modal visible={isOpen} onClose={handleClose} title={title}>
      {title ? (
        <View className="items-center gap-4 w-full">
          <Text className="text-center text-sm font-medium leading-[19.6px]" style={{ color: '#888888' }}>
            {message}
          </Text>
          <View className="w-full">
            <Button
              title={buttonLabel}
              variant="primary"
              onPress={handleRetry}
            />
          </View>
        </View>
      ) : (
        <View className="items-center">
          <Text className="text-center text-base font-medium leading-[22.4px]" style={{ color: '#1A1A1A' }}>
            {message}
          </Text>
          <View className="mt-10 w-full">
            <Button
              title={buttonLabel}
              variant="primary"
              onPress={handleRetry}
            />
          </View>
        </View>
      )}
    </Modal>
  );
}
