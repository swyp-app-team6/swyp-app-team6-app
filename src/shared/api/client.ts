import axios from "axios";
import Config from "react-native-config";
import './axios.d';

/**
 * # API
 * ---
 * - 간단설명: 기본 Axios 인스턴스 — 모든 API 호출에 사용
 * - 제약사항 및 특이사항:
 *   - 인터셉터는 setupInterceptors()로 별도 등록 (앱 시작 시 호출 필요)
 *   - skipAuth: true 옵션으로 인증 헤더 생략 가능
 * ---
 * @example
 * API.post('/api/example');
 * API.get('/public/endpoint', { skipAuth: true });
 */
export const API = axios.create({
  baseURL: Config.API_URL,
  headers: { 'Content-Type': 'application/json' },
});
