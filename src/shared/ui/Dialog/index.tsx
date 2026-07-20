import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';
import { Modal } from '@/shared/ui/Modal';
import { Button, type ButtonVariant } from '@/shared/ui/Button';
import { cn } from '@/shared/lib/cn';

/**
 * Dialog 모달 파라미터
 * - isOpenDialog = dialog 열림 여부
 * - type = alert(확인만) / confirm(확인+취소)
 * - title = 제목
 * - message = 본문 (ReactNode)
 * - okLabel = 확인 버튼 텍스트
 * - cancelLabel = 취소 버튼 텍스트
 * - okVariant = 확인 버튼 variant
 * - okFn = 확인 클릭 시 콜백 (지정 시 closeDialog 수동 호출 필요할 수 있음)
 * - cancelFn = 취소 클릭 시 콜백
 * - autoClose = 버튼 클릭 시 자동 닫힘 여부 (기본 true)
 */
export interface IDialogParams {
  /** dialog 열림 여부 */
  isOpenDialog: boolean;
  /** alert: 확인 버튼만, confirm: 확인+취소 버튼 표시 */
  type: 'alert' | 'confirm';
  /** dialog 제목 */
  title: string;
  /** dialog 내용 */
  message: React.ReactNode;
  /** 확인 버튼 텍스트 */
  okLabel?: string;
  /** 취소 버튼 텍스트 */
  cancelLabel?: string;
  /** 확인 버튼 variant */
  okVariant?: ButtonVariant;
  /** 확인 버튼 클릭 시 실행 함수 */
  okFn?: () => void;
  /** 취소 버튼 클릭 시 실행 함수 */
  cancelFn?: () => void;
  /** 확인/취소 클릭 시 다이얼로그 자동 닫힘 여부 (기본 true) */
  autoClose: boolean;
}

interface DialogStore extends IDialogParams {
  openDialog: (params: Partial<IDialogParams>) => void;
  closeDialog: () => void;
  reset: () => void;
}

const initialState: Omit<DialogStore, 'openDialog' | 'closeDialog' | 'reset'> = {
  isOpenDialog: false,
  type: 'alert',
  title: '',
  message: '',
  okLabel: '확인',
  cancelLabel: '취소',
  autoClose: true,
  okFn: undefined,
  cancelFn: undefined,
  okVariant: undefined,
};

export const dialogStore = createStore<DialogStore>((set) => ({
  ...initialState,
  openDialog: (params) => set({ ...params, isOpenDialog: true }),
  closeDialog: () => set({ isOpenDialog: false }),
  reset: () => set(initialState),
}));

/**
 * # openDialog
 * ---
 * - 간단설명: 전역 Dialog를 여는 함수
 * - 제약사항 및 특이사항:
 *   - 컴포넌트 외부에서도 호출 가능 (vanilla store 기반)
 *   - 기본값: type='alert', okLabel='확인', cancelLabel='취소'
 * ---
 * @param params 다이얼로그에 전달할 파라미터 (IDialogParams의 일부)
 * ---
 * @example
 * ```tsx
 * openDialog({ title: '알림', message: '저장되었습니다.' });
 * openDialog({ type: 'confirm', title: '삭제', message: '정말 삭제하시겠습니까?', okFn: handleDelete });
 * ```
 */
export const openDialog = (params: Partial<IDialogParams>) => {
  const merged = {
    type: 'alert' as const,
    title: '',
    message: '' as React.ReactNode,
    okLabel: '확인',
    cancelLabel: '취소',
    ...params,
  };

  /** title, message 중 하나만 있으면 message로 취급 */
  const hasTitle = !!merged.title;
  const hasMessage = !!merged.message;
  if (hasTitle !== hasMessage) {
    merged.message = merged.title || merged.message;
    merged.title = '';
  }

  dialogStore.getState().openDialog(merged);
};

/**
 * # closeDialog
 * ---
 * - 간단설명: 전역 Dialog를 닫는 함수
 * ---
 * @example
 * ```tsx
 * closeDialog();
 * ```
 */
export const closeDialog = () => {
  dialogStore.getState().closeDialog();
};

/**
 * # Dialog
 * ---
 * - 간단설명: 전역 alert/confirm 다이얼로그 컴포넌트
 * - 제약사항 및 특이사항:
 *   - zustand vanilla store 기반으로 컴포넌트 외부에서 openDialog/closeDialog 호출 가능
 *   - App 루트에 한 번만 렌더링하면 전역에서 사용 가능
 *   - alert: 확인 버튼만, confirm: 확인+취소 버튼 표시
 *   - autoClose=false 시 okFn/cancelFn 내에서 closeDialog() 수동 호출 필요
 * ---
 * @example
 * ```tsx
 * // App 루트에 배치
 * <Dialog />
 *
 * // 어디서든 호출
 * openDialog({ title: '알림', message: '완료되었습니다.' });
 * openDialog({
 *   type: 'confirm',
 *   title: '삭제',
 *   message: '정말 삭제하시겠습니까?',
 *   okVariant: 'secondary',
 *   okFn: () => { handleDelete(); },
 * });
 * ```
 */
export default function Dialog() {
  const {
    isOpenDialog,
    type,
    title,
    message,
    okLabel,
    cancelLabel,
    autoClose,
    okFn,
    okVariant,
    cancelFn,
    closeDialog: storeCloseDialog,
  } = useStore(dialogStore);

  const handleOk = useCallback(() => {
    if (okFn) {
      okFn();
      if (autoClose) {
        storeCloseDialog();
      }
    } else {
      storeCloseDialog();
    }
    dialogStore.getState().reset();
  }, [okFn, autoClose, storeCloseDialog]);

  const handleCancel = useCallback(() => {
    if (cancelFn) {
      cancelFn();
      if (autoClose) {
        storeCloseDialog();
      }
    } else {
      storeCloseDialog();
    }
    dialogStore.getState().reset();
  }, [cancelFn, autoClose, storeCloseDialog]);

  return (
    <Modal visible={isOpenDialog} onClose={handleCancel} title={title}>
      {message ? (
        typeof message === 'string' ? (
          <Text
            className={
              !title
                ? 'text-base font-medium text-text-black leading-[22.4px] text-center'
                : 'text-sm text-text-gray3 leading-5 text-center'
            }
          >
            {message}
          </Text>
        ) : (
          <View>{message}</View>
        )
      ) : (
        <View className="pt-2" />
      )}
      <View className={cn("flex-row items-center gap-3", title ? "mt-4" : "mt-6")}>
        {type === 'confirm' && (
          <Button
            title={cancelLabel || '취소'}
            variant="cancel"
            onPress={handleCancel}
            className="flex-1"
          />
        )}
        <Button
          title={okLabel || '확인'}
          variant={okVariant || 'primary'}
          onPress={handleOk}
          className="flex-1 rounded-lg"
        />
      </View>
    </Modal>
  );
}
