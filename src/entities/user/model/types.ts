export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  localProfileImage?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}
