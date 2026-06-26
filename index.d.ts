// Config
declare module 'react-native-config' {
  /**
   * 프로젝트 env
   * prod: 배포 환경
   * local: 로컬 환경
   * dev: 개발 환경
   */
  export const PROJECT_ENV: 'prod' | 'local' | 'dev';

  /**
   * MSW mock 서버 활성화 플래그
   * - 'true': mock 서버 실행
   */
  export const MSW_ENABLED: string | undefined;
}