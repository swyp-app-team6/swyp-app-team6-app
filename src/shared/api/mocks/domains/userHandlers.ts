/**
 * # userHandlers
 * ---
 * - 간단설명: 사용자/프로필 관련 MSW mock 핸들러
 * ---
 */
import { http, HttpResponse } from 'msw';
import Config from 'react-native-config';
import type { User, MyProfileResponse, ProfileRegisterRequest } from '@/entities/user/model/types';

const BASE_URL = Config.API_URL;

/** mock 사용자 정보 */
const mockUser: User = {
  id: 1,
  email: 'mock@example.com',
  role: 'USER',
  provider: 'GOOGLE',
};

export const userHandlers = [
  /**
   * 내 정보 조회 — GET /user
   */
  http.get(`${BASE_URL}/user`, () => {
    return HttpResponse.json(mockUser);
  }),

  /**
   * 프로필 등록 — POST /profile/register
   */
  http.post(`${BASE_URL}/profile/register`, async ({ request }) => {
    const body = (await request.json()) as ProfileRegisterRequest;

    const response: MyProfileResponse = {
      id: 1,
      nickname: body.nickname,
      image_key: body.image_key,
      gender: body.gender,
      bio: body.bio,
      keyword: body.keyword,
      topic: body.topic,
      interests: body.interests,
    };

    return HttpResponse.json(response, { status: 201 });
  }),
];
