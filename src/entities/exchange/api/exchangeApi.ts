import { API } from '@/shared/api';
import type { ExchangeResponse } from '../model/types';

/** long-polling 요청 타임아웃 (90초) */
const LONG_POLL_TIMEOUT = 90_000;

/**
 * # ExchangeAPI
 * ---
 * - 간단설명: 프로필 교환 관련 API를 정적 메서드로 관리하는 클래스
 * - 제약사항 및 특이사항:
 *   - start, wait는 long-polling으로 timeout 90초 설정
 *   - AbortSignal을 통한 요청 취소 지원
 * ---
 * @example
 * const { data } = await ExchangeAPI.start('uuid-string', controller.signal);
 */
export class ExchangeAPI {
  /**
   * # start
   * ---
   * - 간단설명: 스캔자가 교환을 시작하고 상대방 수락을 대기하는 long-polling 요청
   * - 제약사항 및 특이사항: 상대방이 응답할 때까지 대기, 408 타임아웃 가능
   * ---
   * @param uuid QR 스캔으로 획득한 상대방 UUID
   * @param signal AbortSignal (취소용)
   */
  static start(uuid: string, signal?: AbortSignal) {
    return API.get<ExchangeResponse>(`/exchange/start/${uuid}`, {
      signal,
      timeout: LONG_POLL_TIMEOUT,
    });
  }

  /**
   * # wait
   * ---
   * - 간단설명: 대기자가 교환 대기 상태로 진입하는 long-polling 요청 (후속 작업)
   * ---
   * @param signal AbortSignal (취소용)
   */
  static wait(signal?: AbortSignal) {
    return API.get('/exchange/wait', {
      signal,
      timeout: LONG_POLL_TIMEOUT,
    });
  }

  /**
   * # accept
   * ---
   * - 간단설명: 대기자가 교환을 수락 (후속 작업)
   * ---
   * @param profileId 미리보기 프로필 ID
   */
  static accept(profileId: number) {
    return API.get<ExchangeResponse>(`/exchange/accept/${profileId}`);
  }

  /**
   * # decline
   * ---
   * - 간단설명: 대기자가 교환을 거절 (후속 작업)
   * ---
   * @param profileId 미리보기 프로필 ID
   */
  static decline(profileId: number) {
    return API.get<void>(`/exchange/decline/${profileId}`);
  }

  /**
   * # cancel
   * ---
   * - 간단설명: 대기자가 교환 대기를 취소 (후속 작업)
   * ---
   */
  static cancel() {
    return API.get<void>('/exchange/cancel');
  }

  /**
   * # cancelStart
   * ---
   * - 간단설명: 스캔자가 교환 시작을 취소
   * ---
   * @param profileId 미리보기 프로필 ID
   */
  static cancelStart(profileId: number) {
    return API.get<void>(`/exchange/cancel/${profileId}`);
  }
}
