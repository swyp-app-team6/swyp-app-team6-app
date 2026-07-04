/**
 * 관심사 목록
 * - TRAVEL = 여행
 * - SPORTS = 스포츠
 * - MUSIC = 음악
 * - VIDEO = 영상
 * - RESTAURANT = 맛집
 * - CAFE = 카페
 * - CULTURE = 문화
 * - READING = 독서
 * - GAME = 게임
 * - SELF_DEVELOPMENT = 자기계발
 * - INVESTING = 투자
 * - MOVIE = 영화
 */
export enum INTEREST {
  /** 여행 */
  TRAVEL = 'TRAVEL',
  /** 스포츠 */
  SPORTS = 'SPORTS',
  /** 음악 */
  MUSIC = 'MUSIC',
  /** 영상 */
  VIDEO = 'VIDEO',
  /** 맛집 */
  RESTAURANT = 'RESTAURANT',
  /** 카페 */
  CAFE = 'CAFE',
  /** 문화 */
  CULTURE = 'CULTURE',
  /** 독서 */
  READING = 'READING',
  /** 게임 */
  GAME = 'GAME',
  /** 자기계발 */
  SELF_DEVELOPMENT = 'SELF_DEVELOPMENT',
  /** 투자 */
  INVESTING = 'INVESTING',
  /** 영화 */
  MOVIE = 'MOVIE',
}

/**
 * 코스믹 유형
 * - 코스믹 유형테스트 결과로 나온 사용자의 성격
 * - GALAXY = 은하
 * - SHOOTING_STAR = 별똥별
 * - LUNA = 루나
 * - SOLA = 솔라
 */
export enum CosmicType {
  /** 은하 */
  GALAXY = 'GALAXY',
  /** 별똥별 */
  SHOOTING_STAR = 'SHOOTING_STAR',
  /** 루나 */
  LUNA = 'LUNA',
  /** 솔라 */
  SOLA = 'SOLA',
}

/**
 * TMI 질문 유형
 * - 프로필 등록 TMI 질문의 질문유형
 * - BINARY = 이분법
 * - BLANK = 빈칸 채우기
 * - DISCUSSION = 토론
 * - BALANCE_GAME = 밸런스 게임
 */
export enum TMIQuestionType {
  /** 이분법 */
  BINARY = 'BINARY',
  /** 빈칸 채우기 */
  BLANK = 'BLANK',
  /** 토론 */
  DISCUSSION = 'DISCUSSION',
  /** 밸런스 게임 */
  BALANCE_GAME = 'BALANCE_GAME',
}
