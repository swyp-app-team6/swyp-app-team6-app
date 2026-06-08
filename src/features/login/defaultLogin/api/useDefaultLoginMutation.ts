import { useMutation } from '@tanstack/react-query'
import React from 'react'
import { refreshTokens, useAuthStore } from '../../../../entities/user';

export default function useDefaultLoginMutation() {
  const { setTokens, setUser } = useAuthStore();
  return useMutation({
    mutationFn: async () => {
      // TODO: API 형식에 맞춰 로그인 작성
      return {
        accessToken: '',
        refreshToken: '',
        user: null,
      }
    },
    onSuccess: ({ accessToken, refreshToken, user }) => {
      setTokens({ accessToken, refreshToken });
      setUser(user);
    },
  })
}
