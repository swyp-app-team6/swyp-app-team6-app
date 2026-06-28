/**
 * # uploadHandlers
 * ---
 * - 간단설명: 파일 업로드(Presigned URL) MSW mock 핸들러
 * ---
 */
import { http, HttpResponse } from 'msw';
import Config from 'react-native-config';
import type { PresignResponse } from '@/entities/user/model/types';

const BASE_URL = Config.API_URL;

export const uploadHandlers = [
  /**
   * Presigned URL 발급 — POST /api/uploads/presign
   */
  http.post(`${BASE_URL}/api/uploads/presign`, () => {
    const response: PresignResponse = {
      uploadUrl: 'https://mock-s3.example.com/upload?presigned=true',
      imageKey: `mock-image-${Date.now()}.jpg`,
    };

    return HttpResponse.json(response);
  }),
];
