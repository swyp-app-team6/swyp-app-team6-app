import 'axios';

/**
 * Axios 요청 설정 확장
 * - skipAuth: 인증 헤더 자동 첨부 생략 여부
 * - _retry: 토큰 갱신 재시도 플래그 (내부 사용)
 */
declare module 'axios' {
  export interface AxiosRequestConfig {
    /** true로 설정하면 Authorization 헤더를 자동 첨부하지 않음 */
    skipAuth?: boolean;
    /** 토큰 갱신 재시도 플래그 (내부 사용) */
    _retry?: boolean;
  }

  export interface InternalAxiosRequestConfig {
    /** true로 설정하면 Authorization 헤더를 자동 첨부하지 않음 */
    skipAuth?: boolean;
    /** 토큰 갱신 재시도 플래그 (내부 사용) */
    _retry?: boolean;
  }
}
