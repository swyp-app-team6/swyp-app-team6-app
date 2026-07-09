import { API } from '@/shared/api';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import type {
  ExchangeArchiveParams,
  ExchangeArchiveResponse,
  ExchangeArchiveDetailResponse,
  ExchangeLikeRequest,
  ExchangeLikeResponse,
  ExchangeDeleteRequest,
  ExchangeDeleteResponse,
  ReportRequest,
  ReportResponse,
  BlockCreateRequest,
  BlockResponse,
  BlockListItem,
  BlockDeleteResponse,
} from '../model/types';

/**
 * # ExchangeArchiveAPI
 * ---
 * - 간단설명: 교환 보관함 관련 API를 정적 메서드로 관리하는 클래스
 * ---
 * @example
 * const { data } = await ExchangeArchiveAPI.fetchList({ size: 4 });
 */
export class ExchangeArchiveAPI {
  /**
   * # fetchList
   * ---
   * - 간단설명: 교환한 프로필 목록을 커서 기반 페이지네이션으로 조회
   * ---
   * @param params 검색/필터/정렬/페이지 파라미터
   */
  static fetchList(params?: ExchangeArchiveParams) {
    return API.get<ExchangeArchiveResponse>('/exchange/archive', { params });
  }

  /**
   * # fetchDetail
   * ---
   * - 간단설명: 교환한 프로필 상세 정보 조회
   * ---
   * @param exchangeId 교환 고유 ID
   */
  static fetchDetail(exchangeId: number) {
    return API.get<ExchangeArchiveDetailResponse>(`/exchange/archive/${exchangeId}`);
  }

  /**
   * # toggleLike
   * ---
   * - 간단설명: 보관함 항목 좋아요 표시 변경
   * ---
   * @param exchangeId 교환 고유 ID
   * @param data 좋아요 요청 데이터
   */
  static toggleLike(exchangeId: number, data: ExchangeLikeRequest) {
    return API.patch<ExchangeLikeResponse>(`/exchange/archive/${exchangeId}/like`, data);
  }

  /**
   * # deleteArchives
   * ---
   * - 간단설명: 교환한 프로필 다건 삭제
   * ---
   * @param data 삭제할 교환 ID 목록
   */
  static deleteArchives(data: ExchangeDeleteRequest) {
    return API.delete<ExchangeDeleteResponse>('/exchange/archive', { data });
  }

  /**
   * # reportProfile
   * ---
   * - 간단설명: 교환 프로필 신고 요청
   * ---
   * @param data 신고 요청 데이터 (profile_exchange_id, reason_codes, etc_detail)
   */
  static reportProfile(data: ReportRequest) {
    return API.post<ReportResponse>('/reports', data);
  }

  /**
   * # blockUser
   * ---
   * - 간단설명: 교환 프로필 유저 차단 요청
   * ---
   * @param data 차단 요청 데이터 (profile_exchange_id)
   */
  static blockUser(data: BlockCreateRequest) {
    return API.post<BlockResponse>('/blocks', data);
  }

  /**
   * # fetchBlockList
   * ---
   * - 간단설명: 차단한 유저 목록 조회
   * ---
   */
  static fetchBlockList() {
    return API.get<BlockListItem[]>('/blocks');
  }

  /**
   * # unblockUser
   * ---
   * - 간단설명: 차단 해제 요청
   * ---
   * @param blockId 차단 ID
   */
  static unblockUser(blockId: number) {
    return API.delete<BlockDeleteResponse>(`/blocks/${blockId}`);
  }

  /** 쿼리 키 팩토리 */
  static query = createQueryKeys('exchangeArchive', {
    list: (params?: Omit<ExchangeArchiveParams, 'cursor'>) => ({
      queryKey: [params ?? {}],
      queryFn: async () => {
        const { data } = await ExchangeArchiveAPI.fetchList(params);
        return data;
      },
    }),
    detail: (exchangeId: number) => ({
      queryKey: [exchangeId],
      queryFn: async () => {
        const { data } = await ExchangeArchiveAPI.fetchDetail(exchangeId);
        return data;
      },
    }),
    blockList: {
      queryKey: ['blockList'],
      queryFn: async () => {
        const { data } = await ExchangeArchiveAPI.fetchBlockList();
        return data;
      },
    },
  });
}
