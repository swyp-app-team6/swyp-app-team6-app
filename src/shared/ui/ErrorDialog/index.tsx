import { openDialog, closeDialog } from '@/shared/ui/Dialog';
import type { IDialogParams } from '@/shared/ui/Dialog';

/**
 * ErrorDialog 파라미터
 * - title = 에러 제목
 * - message = 에러 메시지
 * - buttonLabel = 버튼 텍스트
 * - onRetry = 버튼 클릭 시 콜백
 */
export interface IErrorDialogParams {
  /** 에러 제목 */
  title?: string;
  /** 에러 메시지 */
  message?: string;
  /** 버튼 텍스트 */
  buttonLabel?: string;
  /** 버튼 클릭 시 실행 함수 */
  onRetry?: () => void;
}

/**
 * # openErrorDialog
 * ---
 * - 간단설명: 전역 에러 다이얼로그를 여는 함수 (Dialog 기반)
 * - 제약사항 및 특이사항:
 *   - 내부적으로 Dialog의 openDialog를 호출
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
export const openErrorDialog = (params?: IErrorDialogParams) => {
  const {
    title = '',
    message = '다시 시도 해주세요',
    buttonLabel = '다시 시도하기',
    onRetry,
  } = params ?? {};

  const dialogParams: Partial<IDialogParams> = {
    type: 'alert',
    title: title || '',
    message: message,
    okLabel: buttonLabel,
    okFn: onRetry,
  };

  openDialog(dialogParams);
};

/**
 * # closeErrorDialog
 * ---
 * - 간단설명: 전역 에러 다이얼로그를 닫는 함수 (Dialog 기반)
 * ---
 * @example
 * ```tsx
 * closeErrorDialog();
 * ```
 */
export const closeErrorDialog = () => {
  closeDialog();
};
