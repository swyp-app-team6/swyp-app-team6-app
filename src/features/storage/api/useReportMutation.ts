import { useMutation } from '@tanstack/react-query';
import { ExchangeArchiveAPI } from '@/entities/storage';
import type { ReportReasonCode } from '@/entities/storage';

interface ReportMutationParams {
  /** 교환 프로필 ID */
  profileExchangeId: number;
  /** 신고 사유 코드 배열 */
  reasonCodes: ReportReasonCode[];
  /** 기타 사유 상세 */
  etcDetail?: string;
}

/**
 * # useReportMutation
 * ---
 * - 간단설명: 교환 프로필 신고 요청 뮤테이션 훅
 * - 제약사항 및 특이사항:
 *   - reason_codes 최소 1개 필수
 *   - ETC 선택 시 etc_detail 필수 (최대 300자)
 * ---
 * @example
 * ```tsx
 * const { mutate: report } = useReportMutation();
 * report({ profileExchangeId: 1, reasonCodes: ['FAKE_PROFILE'] });
 * ```
 */
export default function useReportMutation() {
  return useMutation({
    mutationFn: ({ profileExchangeId, reasonCodes, etcDetail }: ReportMutationParams) =>
      ExchangeArchiveAPI.reportProfile({
        profile_exchange_id: profileExchangeId,
        reason_codes: reasonCodes,
        etc_detail: etcDetail,
      }),
  });
}
