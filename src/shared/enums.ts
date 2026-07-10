/**
 * 관심사 목록
 * - 프로필 등록: 관심사 선택 시 선택할수있는 관심사 유형
 * - TRAVEL = 여행
 * - SPORTS = 운동
 * - MUSIC = 음악
 * - VIDEO = 유튜브
 * - RESTAURANT = 맛집탐방
 * - CAFE = 카페투어
 * - CULTURE = 문화생활
 * - READING = 독서
 * - GAME = 게임
 * - SELF_DEVELOPMENT = 자기계발
 * - INVESTING = 재테크
 * - MOVIE = 영화감상
 */
export enum INTEREST {
  /** 여행 */
  TRAVEL = 'TRAVEL',
  /** 운동 */
  SPORTS = 'SPORTS',
  /** 음악 */
  MUSIC = 'MUSIC',
  /** 유튜브 */
  VIDEO = 'VIDEO',
  /** 맛집탐방 */
  RESTAURANT = 'RESTAURANT',
  /** 카페투어 */
  CAFE = 'CAFE',
  /** 문화생활 */
  CULTURE = 'CULTURE',
  /** 독서 */
  READING = 'READING',
  /** 게임 */
  GAME = 'GAME',
  /** 자기계발 */
  SELF_DEVELOPMENT = 'SELF_DEVELOPMENT',
  /** 재테크 */
  INVESTING = 'INVESTING',
  /** 영화감상 */
  MOVIE = 'MOVIE',
}

/**
 * 코스믹 유형
 * - 코스믹 유형테스트 결과로 나온 사용자의 유형
 * - GALAXY = 갤럭시 형
 * - SHOOTING_STAR = 슈팅스타 형
 * - LUNA = 루나 형
 * - SOLA = 솔라 형
 */
export enum CosmicType {
  /** 갤럭시 형 */
  GALAXY = 'GALAXY',
  /** 슈팅스타 형 */
  SHOOTING_STAR = 'SHOOTING_STAR',
  /** 루나 형 */
  LUNA = 'LUNA',
  /** 솔라 형 */
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
  /** 양자택일 */
  BINARY = 'BINARY',
  /** 빈칸 채우기 */
  BLANK = 'BLANK',
  /** 커플논쟁 */
  DISCUSSION = 'DISCUSSION',
  /** 밸런스 게임 */
  BALANCE_GAME = 'BALANCE_GAME',
}

/**
 * 교환 플로우 단계
 * - IDLE = 스캔 대기
 * - CONFIRM = 교환 확인 모달
 * - PREVIEW = 내 프로필 미리보기
 * - LOADING = 교환 대기 중 (long-polling)
 * - RESULT = 공통 관심사 결과
 * - TIMEOUT = 타임아웃
 * - DECLINED = 상대방 거절
 */
export enum ExchangeFlowStep {
  /** 스캔 대기 */
  IDLE = 'idle',
  /** 교환 확인 모달 */
  CONFIRM = 'confirm',
  /** 내 프로필 미리보기 */
  PREVIEW = 'preview',
  /** 교환 대기 중 (long-polling) */
  LOADING = 'loading',
  /** 공통 관심사 결과 */
  RESULT = 'result',
  /** 타임아웃 */
  TIMEOUT = 'timeout',
  /** 상대방 거절 */
  DECLINED = 'declined',
}

/**
 * 지역 목록
 * - 프로필 등록: 사용자의 거주 지역 선택 시 사용
 * - 광역시/도 단위 및 하위 시/군/구 단위로 구성
 * - SEOUL = 서울, GYEONGGI = 경기, INCHEON = 인천, GANGWON = 강원
 * - CHUNGBUK = 충북, CHUNGNAM = 충남, SEJONG = 세종, DAEJEON = 대전
 * - GWANGJU = 광주, JEONBUK = 전북, JEONNAM = 전남
 * - GYEONGBUK = 경북, DAEGU = 대구, GYEONGNAM = 경남
 * - ULSAN = 울산, BUSAN = 부산, JEJU = 제주
 */
export enum Region {
  // ── 서울특별시 ──
  /** 서울 */
  SEOUL = 'SEOUL',
  /** 서울 강남구 */
  SEOUL_GANGNAM = 'SEOUL_GANGNAM',
  /** 서울 강동구 */
  SEOUL_GANGDONG = 'SEOUL_GANGDONG',
  /** 서울 강북구 */
  SEOUL_GANGBUK = 'SEOUL_GANGBUK',
  /** 서울 강서구 */
  SEOUL_GANGSEO = 'SEOUL_GANGSEO',
  /** 서울 관악구 */
  SEOUL_GWANAK = 'SEOUL_GWANAK',
  /** 서울 광진구 */
  SEOUL_GWANGJIN = 'SEOUL_GWANGJIN',
  /** 서울 구로구 */
  SEOUL_GURO = 'SEOUL_GURO',
  /** 서울 금천구 */
  SEOUL_GEUMCHEON = 'SEOUL_GEUMCHEON',
  /** 서울 노원구 */
  SEOUL_NOWON = 'SEOUL_NOWON',
  /** 서울 도봉구 */
  SEOUL_DOBONG = 'SEOUL_DOBONG',
  /** 서울 동대문구 */
  SEOUL_DONGDAEMUN = 'SEOUL_DONGDAEMUN',
  /** 서울 동작구 */
  SEOUL_DONGJAK = 'SEOUL_DONGJAK',
  /** 서울 마포구 */
  SEOUL_MAPO = 'SEOUL_MAPO',
  /** 서울 서대문구 */
  SEOUL_SEODAEMUN = 'SEOUL_SEODAEMUN',
  /** 서울 서초구 */
  SEOUL_SEOCHO = 'SEOUL_SEOCHO',
  /** 서울 성동구 */
  SEOUL_SEONGDONG = 'SEOUL_SEONGDONG',
  /** 서울 성북구 */
  SEOUL_SEONGBUK = 'SEOUL_SEONGBUK',
  /** 서울 송파구 */
  SEOUL_SONGPA = 'SEOUL_SONGPA',
  /** 서울 양천구 */
  SEOUL_YANGCHEON = 'SEOUL_YANGCHEON',
  /** 서울 영등포구 */
  SEOUL_YEONGDEUNGPO = 'SEOUL_YEONGDEUNGPO',
  /** 서울 용산구 */
  SEOUL_YONGSAN = 'SEOUL_YONGSAN',
  /** 서울 은평구 */
  SEOUL_EUNPYEONG = 'SEOUL_EUNPYEONG',
  /** 서울 종로구 */
  SEOUL_JONGNO = 'SEOUL_JONGNO',
  /** 서울 중구 */
  SEOUL_JUNGGU = 'SEOUL_JUNGGU',
  /** 서울 중랑구 */
  SEOUL_JUNGNANG = 'SEOUL_JUNGNANG',

  // ── 경기도 ──
  /** 경기 */
  GYEONGGI = 'GYEONGGI',
  /** 경기 수원시 */
  GYEONGGI_SUWON = 'GYEONGGI_SUWON',
  /** 경기 성남시 */
  GYEONGGI_SEONGNAM = 'GYEONGGI_SEONGNAM',
  /** 경기 고양시 */
  GYEONGGI_GOYANG = 'GYEONGGI_GOYANG',
  /** 경기 용인시 */
  GYEONGGI_YONGIN = 'GYEONGGI_YONGIN',
  /** 경기 부천시 */
  GYEONGGI_BUCHEON = 'GYEONGGI_BUCHEON',
  /** 경기 안산시 */
  GYEONGGI_ANSAN = 'GYEONGGI_ANSAN',
  /** 경기 안양시 */
  GYEONGGI_ANYANG = 'GYEONGGI_ANYANG',
  /** 경기 남양주시 */
  GYEONGGI_NAMYANGJU = 'GYEONGGI_NAMYANGJU',
  /** 경기 화성시 */
  GYEONGGI_HWASEONG = 'GYEONGGI_HWASEONG',
  /** 경기 의정부시 */
  GYEONGGI_UIJEONGBU = 'GYEONGGI_UIJEONGBU',
  /** 경기 시흥시 */
  GYEONGGI_SIHEUNG = 'GYEONGGI_SIHEUNG',
  /** 경기 평택시 */
  GYEONGGI_PYEONGTAEK = 'GYEONGGI_PYEONGTAEK',
  /** 경기 광명시 */
  GYEONGGI_GWANGMYEONG = 'GYEONGGI_GWANGMYEONG',
  /** 경기 파주시 */
  GYEONGGI_PAJU = 'GYEONGGI_PAJU',
  /** 경기 군포시 */
  GYEONGGI_GUNPO = 'GYEONGGI_GUNPO',
  /** 경기 광주시 */
  GYEONGGI_GWANGJU = 'GYEONGGI_GWANGJU',
  /** 경기 김포시 */
  GYEONGGI_GIMPO = 'GYEONGGI_GIMPO',
  /** 경기 이천시 */
  GYEONGGI_ICHEON = 'GYEONGGI_ICHEON',
  /** 경기 양주시 */
  GYEONGGI_YANGJU = 'GYEONGGI_YANGJU',
  /** 경기 구리시 */
  GYEONGGI_GURI = 'GYEONGGI_GURI',
  /** 경기 오산시 */
  GYEONGGI_OSAN = 'GYEONGGI_OSAN',
  /** 경기 안성시 */
  GYEONGGI_ANSEONG = 'GYEONGGI_ANSEONG',
  /** 경기 의왕시 */
  GYEONGGI_UIWANG = 'GYEONGGI_UIWANG',
  /** 경기 하남시 */
  GYEONGGI_HANAM = 'GYEONGGI_HANAM',
  /** 경기 포천시 */
  GYEONGGI_POCHEON = 'GYEONGGI_POCHEON',
  /** 경기 동두천시 */
  GYEONGGI_DONGDUCHEON = 'GYEONGGI_DONGDUCHEON',
  /** 경기 과천시 */
  GYEONGGI_GWACHEON = 'GYEONGGI_GWACHEON',
  /** 경기 여주시 */
  GYEONGGI_YEOJU = 'GYEONGGI_YEOJU',
  /** 경기 양평군 */
  GYEONGGI_YANGPYEONG = 'GYEONGGI_YANGPYEONG',
  /** 경기 가평군 */
  GYEONGGI_GAPYEONG = 'GYEONGGI_GAPYEONG',
  /** 경기 연천군 */
  GYEONGGI_YEONCHEON = 'GYEONGGI_YEONCHEON',

  // ── 인천광역시 ──
  /** 인천 */
  INCHEON = 'INCHEON',
  /** 인천 중구 */
  INCHEON_JUNGGU = 'INCHEON_JUNGGU',
  /** 인천 동구 */
  INCHEON_DONGGU = 'INCHEON_DONGGU',
  /** 인천 미추홀구 */
  INCHEON_MIHCHUHOL = 'INCHEON_MIHCHUHOL',
  /** 인천 연수구 */
  INCHEON_YEONSU = 'INCHEON_YEONSU',
  /** 인천 남동구 */
  INCHEON_NAMDONG = 'INCHEON_NAMDONG',
  /** 인천 부평구 */
  INCHEON_BUPYEONG = 'INCHEON_BUPYEONG',
  /** 인천 계양구 */
  INCHEON_GYEYANG = 'INCHEON_GYEYANG',
  /** 인천 서구 */
  INCHEON_SEOGU = 'INCHEON_SEOGU',
  /** 인천 강화군 */
  INCHEON_GANGHWA = 'INCHEON_GANGHWA',
  /** 인천 옹진군 */
  INCHEON_ONGJIN = 'INCHEON_ONGJIN',

  // ── 강원특별자치도 ──
  /** 강원 */
  GANGWON = 'GANGWON',
  /** 강원 춘천시 */
  GANGWON_CHUNCHEON = 'GANGWON_CHUNCHEON',
  /** 강원 인제군 */
  GANGWON_INJE = 'GANGWON_INJE',
  /** 강원 양구군 */
  GANGWON_YANGGU = 'GANGWON_YANGGU',
  /** 강원 고성군 */
  GANGWON_GOSEONG = 'GANGWON_GOSEONG',
  /** 강원 양양군 */
  GANGWON_YANGYANG = 'GANGWON_YANGYANG',
  /** 강원 강릉시 */
  GANGWON_GANGNEUNG = 'GANGWON_GANGNEUNG',
  /** 강원 속초시 */
  GANGWON_SOKCHO = 'GANGWON_SOKCHO',
  /** 강원 삼척시 */
  GANGWON_SAMCHEOK = 'GANGWON_SAMCHEOK',
  /** 강원 정선군 */
  GANGWON_JEONGSEON = 'GANGWON_JEONGSEON',
  /** 강원 평창군 */
  GANGWON_PYEONGCHANG = 'GANGWON_PYEONGCHANG',
  /** 강원 영월군 */
  GANGWON_YEONGWOL = 'GANGWON_YEONGWOL',
  /** 강원 원주시 */
  GANGWON_WONJU = 'GANGWON_WONJU',
  /** 강원 횡성군 */
  GANGWON_HOENGSEONG = 'GANGWON_HOENGSEONG',
  /** 강원 홍천군 */
  GANGWON_HONGCHEON = 'GANGWON_HONGCHEON',
  /** 강원 화천군 */
  GANGWON_HWACHEON = 'GANGWON_HWACHEON',
  /** 강원 철원군 */
  GANGWON_CHEORWON = 'GANGWON_CHEORWON',
  /** 강원 동해시 */
  GANGWON_DONGHAE = 'GANGWON_DONGHAE',
  /** 강원 태백시 */
  GANGWON_TAEBAEK = 'GANGWON_TAEBAEK',

  // ── 충청북도 ──
  /** 충북 */
  CHUNGBUK = 'CHUNGBUK',
  /** 충북 청주시 */
  CHUNGBUK_CHEONGJU = 'CHUNGBUK_CHEONGJU',
  /** 충북 충주시 */
  CHUNGBUK_CHUNGJU = 'CHUNGBUK_CHUNGJU',
  /** 충북 제천시 */
  CHUNGBUK_JECHON = 'CHUNGBUK_JECHON',
  /** 충북 보은군 */
  CHUNGBUK_BOEUN = 'CHUNGBUK_BOEUN',
  /** 충북 옥천군 */
  CHUNGBUK_OKCHEON = 'CHUNGBUK_OKCHEON',
  /** 충북 영동군 */
  CHUNGBUK_YEONGDONG = 'CHUNGBUK_YEONGDONG',
  /** 충북 증평군 */
  CHUNGBUK_JEUNGPYEONG = 'CHUNGBUK_JEUNGPYEONG',
  /** 충북 진천군 */
  CHUNGBUK_JINCHEON = 'CHUNGBUK_JINCHEON',
  /** 충북 괴산군 */
  CHUNGBUK_GOESAN = 'CHUNGBUK_GOESAN',
  /** 충북 음성군 */
  CHUNGBUK_EUMSEONG = 'CHUNGBUK_EUMSEONG',
  /** 충북 단양군 */
  CHUNGBUK_DANYANG = 'CHUNGBUK_DANYANG',

  // ── 충청남도 ──
  /** 충남 */
  CHUNGNAM = 'CHUNGNAM',
  /** 충남 천안시 */
  CHUNGNAM_CHEONAN = 'CHUNGNAM_CHEONAN',
  /** 충남 공주시 */
  CHUNGNAM_GONGJU = 'CHUNGNAM_GONGJU',
  /** 충남 보령시 */
  CHUNGNAM_BORYEONG = 'CHUNGNAM_BORYEONG',
  /** 충남 아산시 */
  CHUNGNAM_ASAN = 'CHUNGNAM_ASAN',
  /** 충남 서산시 */
  CHUNGNAM_SEOSAN = 'CHUNGNAM_SEOSAN',
  /** 충남 논산시 */
  CHUNGNAM_NONSAN = 'CHUNGNAM_NONSAN',
  /** 충남 계룡시 */
  CHUNGNAM_GYERYONG = 'CHUNGNAM_GYERYONG',
  /** 충남 당진시 */
  CHUNGNAM_DANGJIN = 'CHUNGNAM_DANGJIN',
  /** 충남 금산군 */
  CHUNGNAM_GEUMSAN = 'CHUNGNAM_GEUMSAN',
  /** 충남 부여군 */
  CHUNGNAM_BUYEO = 'CHUNGNAM_BUYEO',
  /** 충남 서천군 */
  CHUNGNAM_SEOCHEON = 'CHUNGNAM_SEOCHEON',
  /** 충남 청양군 */
  CHUNGNAM_CHEONGYANG = 'CHUNGNAM_CHEONGYANG',
  /** 충남 홍성군 */
  CHUNGNAM_HONGSEONG = 'CHUNGNAM_HONGSEONG',
  /** 충남 예산군 */
  CHUNGNAM_YESAN = 'CHUNGNAM_YESAN',
  /** 충남 태안군 */
  CHUNGNAM_TAEAN = 'CHUNGNAM_TAEAN',

  // ── 세종특별자치시 ──
  /** 세종 */
  SEJONG = 'SEJONG',
  /** 세종 조천읍 */
  SEJONG_JOCHEON = 'SEJONG_JOCHEON',
  /** 세종 연기면 */
  SEJONG_YEONGI = 'SEJONG_YEONGI',
  /** 세종 연동면 */
  SEJONG_YEONDONG = 'SEJONG_YEONDONG',
  /** 세종 부강면 */
  SEJONG_BUGANG = 'SEJONG_BUGANG',
  /** 세종 금남면 */
  SEJONG_GEUMNAM = 'SEJONG_GEUMNAM',
  /** 세종 장군면 */
  SEJONG_JANGGUN = 'SEJONG_JANGGUN',
  /** 세종 연서면 */
  SEJONG_YEONSEO = 'SEJONG_YEONSEO',
  /** 세종 전의면 */
  SEJONG_JEONUI = 'SEJONG_JEONUI',
  /** 세종 전동면 */
  SEJONG_JEONDONG = 'SEJONG_JEONDONG',
  /** 세종 소정면 */
  SEJONG_SOJEONG = 'SEJONG_SOJEONG',
  /** 세종 한솔동 */
  SEJONG_HANSOL = 'SEJONG_HANSOL',
  /** 세종 새롬동 */
  SEJONG_SAEROM = 'SEJONG_SAEROM',
  /** 세종 도담동 */
  SEJONG_DODAM = 'SEJONG_DODAM',
  /** 세종 아름동 */
  SEJONG_AREUM = 'SEJONG_AREUM',
  /** 세종 종촌동 */
  SEJONG_JONGCHON = 'SEJONG_JONGCHON',
  /** 세종 고운동 */
  SEJONG_GOUN = 'SEJONG_GOUN',
  /** 세종 소담동 */
  SEJONG_SODAM = 'SEJONG_SODAM',
  /** 세종 보람동 */
  SEJONG_BORAEM = 'SEJONG_BORAEM',
  /** 세종 대평동 */
  SEJONG_DAEPYEONG = 'SEJONG_DAEPYEONG',
  /** 세종 다정동 */
  SEJONG_DAJUNG = 'SEJONG_DAJUNG',
  /** 세종 해밀동 */
  SEJONG_HAEMIL = 'SEJONG_HAEMIL',
  /** 세종 반곡동 */
  SEJONG_BANGOK = 'SEJONG_BANGOK',

  // ── 대전광역시 ──
  /** 대전 */
  DAEJEON = 'DAEJEON',
  /** 대전 동구 */
  DAEJEON_DONGGU = 'DAEJEON_DONGGU',
  /** 대전 중구 */
  DAEJEON_JUNGGU = 'DAEJEON_JUNGGU',
  /** 대전 서구 */
  DAEJEON_SEOGU = 'DAEJEON_SEOGU',
  /** 대전 유성구 */
  DAEJEON_YUSEONG = 'DAEJEON_YUSEONG',
  /** 대전 대덕구 */
  DAEJEON_DAEDEOK = 'DAEJEON_DAEDEOK',

  // ── 광주광역시 ──
  /** 광주 */
  GWANGJU = 'GWANGJU',
  /** 광주 동구 */
  GWANGJU_DONGGU = 'GWANGJU_DONGGU',
  /** 광주 서구 */
  GWANGJU_SEOGU = 'GWANGJU_SEOGU',
  /** 광주 남구 */
  GWANGJU_NAMGU = 'GWANGJU_NAMGU',
  /** 광주 북구 */
  GWANGJU_BUKGU = 'GWANGJU_BUKGU',
  /** 광주 광산구 */
  GWANGJU_GWANGSAN = 'GWANGJU_GWANGSAN',

  // ── 전북특별자치도 ──
  /** 전북 */
  JEONBUK = 'JEONBUK',
  /** 전북 전주시 */
  JEONBUK_JEONJU = 'JEONBUK_JEONJU',
  /** 전북 익산시 */
  JEONBUK_IKSAN = 'JEONBUK_IKSAN',
  /** 전북 군산시 */
  JEONBUK_GUNSAN = 'JEONBUK_GUNSAN',
  /** 전북 정읍시 */
  JEONBUK_JEONGEUP = 'JEONBUK_JEONGEUP',
  /** 전북 남원시 */
  JEONBUK_NAMWON = 'JEONBUK_NAMWON',
  /** 전북 김제시 */
  JEONBUK_GIMJE = 'JEONBUK_GIMJE',
  /** 전북 완주군 */
  JEONBUK_WANJU = 'JEONBUK_WANJU',
  /** 전북 고창군 */
  JEONBUK_GOCHANG = 'JEONBUK_GOCHANG',
  /** 전북 부안군 */
  JEONBUK_BUAN = 'JEONBUK_BUAN',
  /** 전북 임실군 */
  JEONBUK_IMSIL = 'JEONBUK_IMSIL',
  /** 전북 순창군 */
  JEONBUK_SUNCHANG = 'JEONBUK_SUNCHANG',
  /** 전북 진안군 */
  JEONBUK_JINAN = 'JEONBUK_JINAN',
  /** 전북 무주군 */
  JEONBUK_MUJU = 'JEONBUK_MUJU',
  /** 전북 장수군 */
  JEONBUK_JANGSU = 'JEONBUK_JANGSU',

  // ── 전라남도 ──
  /** 전남 */
  JEONNAM = 'JEONNAM',
  /** 전남 목포시 */
  JEONNAM_MOKPO = 'JEONNAM_MOKPO',
  /** 전남 여수시 */
  JEONNAM_YEOSU = 'JEONNAM_YEOSU',
  /** 전남 순천시 */
  JEONNAM_SUNCHEON = 'JEONNAM_SUNCHEON',
  /** 전남 나주시 */
  JEONNAM_NAJU = 'JEONNAM_NAJU',
  /** 전남 광양시 */
  JEONNAM_GWANGYANG = 'JEONNAM_GWANGYANG',
  /** 전남 담양군 */
  JEONNAM_DAMYANG = 'JEONNAM_DAMYANG',
  /** 전남 곡성군 */
  JEONNAM_GOKSEONG = 'JEONNAM_GOKSEONG',
  /** 전남 구례군 */
  JEONNAM_GURYE = 'JEONNAM_GURYE',
  /** 전남 고흥군 */
  JEONNAM_GOHEUNG = 'JEONNAM_GOHEUNG',
  /** 전남 보성군 */
  JEONNAM_BOSEONG = 'JEONNAM_BOSEONG',
  /** 전남 화순군 */
  JEONNAM_HWASUN = 'JEONNAM_HWASUN',
  /** 전남 장흥군 */
  JEONNAM_JANGHEUNG = 'JEONNAM_JANGHEUNG',
  /** 전남 강진군 */
  JEONNAM_GANGJIN = 'JEONNAM_GANGJIN',
  /** 전남 해남군 */
  JEONNAM_HAENAM = 'JEONNAM_HAENAM',
  /** 전남 영암군 */
  JEONNAM_YEONGAM = 'JEONNAM_YEONGAM',
  /** 전남 무안군 */
  JEONNAM_MUAN = 'JEONNAM_MUAN',
  /** 전남 함평군 */
  JEONNAM_HAMPYEONG = 'JEONNAM_HAMPYEONG',
  /** 전남 영광군 */
  JEONNAM_YEONGGWANG = 'JEONNAM_YEONGGWANG',
  /** 전남 장성군 */
  JEONNAM_JANGSEONG = 'JEONNAM_JANGSEONG',
  /** 전남 완도군 */
  JEONNAM_WANDO = 'JEONNAM_WANDO',
  /** 전남 진도군 */
  JEONNAM_JINDO = 'JEONNAM_JINDO',
  /** 전남 신안군 */
  JEONNAM_SINAN = 'JEONNAM_SINAN',

  // ── 경상북도 ──
  /** 경북 */
  GYEONGBUK = 'GYEONGBUK',
  /** 경북 포항시 */
  GYEONGBUK_POHANG = 'GYEONGBUK_POHANG',
  /** 경북 경주시 */
  GYEONGBUK_GYEONGJU = 'GYEONGBUK_GYEONGJU',
  /** 경북 김천시 */
  GYEONGBUK_GIMCHEON = 'GYEONGBUK_GIMCHEON',
  /** 경북 안동시 */
  GYEONGBUK_ANDONG = 'GYEONGBUK_ANDONG',
  /** 경북 구미시 */
  GYEONGBUK_GUMI = 'GYEONGBUK_GUMI',
  /** 경북 영주시 */
  GYEONGBUK_YEONGJU = 'GYEONGBUK_YEONGJU',
  /** 경북 영천시 */
  GYEONGBUK_YEONGCHEON = 'GYEONGBUK_YEONGCHEON',
  /** 경북 상주시 */
  GYEONGBUK_SANGJU = 'GYEONGBUK_SANGJU',
  /** 경북 문경시 */
  GYEONGBUK_MUNGYEONG = 'GYEONGBUK_MUNGYEONG',
  /** 경북 경산시 */
  GYEONGBUK_GYEONGSAN = 'GYEONGBUK_GYEONGSAN',
  /** 경북 군위군 */
  GYEONGBUK_GUNWI = 'GYEONGBUK_GUNWI',
  /** 경북 의성군 */
  GYEONGBUK_UISUNG = 'GYEONGBUK_UISUNG',
  /** 경북 청송군 */
  GYEONGBUK_CHEONGSONG = 'GYEONGBUK_CHEONGSONG',
  /** 경북 영양군 */
  GYEONGBUK_YEONGYANG = 'GYEONGBUK_YEONGYANG',
  /** 경북 영덕군 */
  GYEONGBUK_YEONGDEOK = 'GYEONGBUK_YEONGDEOK',
  /** 경북 청도군 */
  GYEONGBUK_CHEONGDO = 'GYEONGBUK_CHEONGDO',
  /** 경북 고령군 */
  GYEONGBUK_GORYEONG = 'GYEONGBUK_GORYEONG',
  /** 경북 성주군 */
  GYEONGBUK_SEONGJU = 'GYEONGBUK_SEONGJU',
  /** 경북 칠곡군 */
  GYEONGBUK_CHILGOK = 'GYEONGBUK_CHILGOK',
  /** 경북 예천군 */
  GYEONGBUK_YECHON = 'GYEONGBUK_YECHON',
  /** 경북 봉화군 */
  GYEONGBUK_BONGHWA = 'GYEONGBUK_BONGHWA',
  /** 경북 울진군 */
  GYEONGBUK_ULJIN = 'GYEONGBUK_ULJIN',
  /** 경북 울릉군 */
  GYEONGBUK_ULLEUNG = 'GYEONGBUK_ULLEUNG',

  // ── 대구광역시 ──
  /** 대구 */
  DAEGU = 'DAEGU',
  /** 대구 중구 */
  DAEGU_JUNGGU = 'DAEGU_JUNGGU',
  /** 대구 동구 */
  DAEGU_DONGGU = 'DAEGU_DONGGU',
  /** 대구 서구 */
  DAEGU_SEOGU = 'DAEGU_SEOGU',
  /** 대구 남구 */
  DAEGU_NAMGU = 'DAEGU_NAMGU',
  /** 대구 북구 */
  DAEGU_BUKGU = 'DAEGU_BUKGU',
  /** 대구 수성구 */
  DAEGU_SUSEONG = 'DAEGU_SUSEONG',
  /** 대구 달서구 */
  DAEGU_DALSEO = 'DAEGU_DALSEO',
  /** 대구 달성군 */
  DAEGU_DALSEONG = 'DAEGU_DALSEONG',

  // ── 울산광역시 ──
  /** 울산 */
  ULSAN = 'ULSAN',
  /** 울산 중구 */
  ULSAN_JUNGGU = 'ULSAN_JUNGGU',
  /** 울산 남구 */
  ULSAN_NAMGU = 'ULSAN_NAMGU',
  /** 울산 동구 */
  ULSAN_DONGGU = 'ULSAN_DONGGU',
  /** 울산 북구 */
  ULSAN_BUKGU = 'ULSAN_BUKGU',
  /** 울산 울주군 */
  ULSAN_ULJU = 'ULSAN_ULJU',

  // ── 경상남도 ──
  /** 경남 */
  GYEONGNAM = 'GYEONGNAM',
  /** 경남 창원시 */
  GYEONGNAM_CHANGWON = 'GYEONGNAM_CHANGWON',
  /** 경남 김해시 */
  GYEONGNAM_GIMHAE = 'GYEONGNAM_GIMHAE',
  /** 경남 양산시 */
  GYEONGNAM_YANGSAN = 'GYEONGNAM_YANGSAN',
  /** 경남 진주시 */
  GYEONGNAM_JINJU = 'GYEONGNAM_JINJU',
  /** 경남 거제시 */
  GYEONGNAM_GEOJE = 'GYEONGNAM_GEOJE',
  /** 경남 통영시 */
  GYEONGNAM_TONGYEONG = 'GYEONGNAM_TONGYEONG',
  /** 경남 사천시 */
  GYEONGNAM_SACHEON = 'GYEONGNAM_SACHEON',
  /** 경남 밀양시 */
  GYEONGNAM_MILYANG = 'GYEONGNAM_MILYANG',
  /** 경남 함안군 */
  GYEONGNAM_HAMAN = 'GYEONGNAM_HAMAN',
  /** 경남 거창군 */
  GYEONGNAM_GEOCHANG = 'GYEONGNAM_GEOCHANG',
  /** 경남 창녕군 */
  GYEONGNAM_CHANGNYEONG = 'GYEONGNAM_CHANGNYEONG',
  /** 경남 고성군 */
  GYEONGNAM_GOSEONG = 'GYEONGNAM_GOSEONG',
  /** 경남 하동군 */
  GYEONGNAM_HADONG = 'GYEONGNAM_HADONG',
  /** 경남 합천군 */
  GYEONGNAM_HAPCHEON = 'GYEONGNAM_HAPCHEON',
  /** 경남 남해군 */
  GYEONGNAM_NAMHAE = 'GYEONGNAM_NAMHAE',
  /** 경남 함양군 */
  GYEONGNAM_HAMYANG = 'GYEONGNAM_HAMYANG',
  /** 경남 산청군 */
  GYEONGNAM_SANCHEONG = 'GYEONGNAM_SANCHEONG',
  /** 경남 의령군 */
  GYEONGNAM_UIRYEONG = 'GYEONGNAM_UIRYEONG',

  // ── 부산광역시 ──
  /** 부산 */
  BUSAN = 'BUSAN',
  /** 부산 중구 */
  BUSAN_JUNGGU = 'BUSAN_JUNGGU',
  /** 부산 서구 */
  BUSAN_SEOGU = 'BUSAN_SEOGU',
  /** 부산 동구 */
  BUSAN_DONGGU = 'BUSAN_DONGGU',
  /** 부산 영도구 */
  BUSAN_YEONGDO = 'BUSAN_YEONGDO',
  /** 부산 부산진구 */
  BUSAN_BUSANJIN = 'BUSAN_BUSANJIN',
  /** 부산 동래구 */
  BUSAN_DONGNAE = 'BUSAN_DONGNAE',
  /** 부산 남구 */
  BUSAN_NAMGU = 'BUSAN_NAMGU',
  /** 부산 북구 */
  BUSAN_BUKGU = 'BUSAN_BUKGU',
  /** 부산 강서구 */
  BUSAN_GANGSEO = 'BUSAN_GANGSEO',
  /** 부산 해운대구 */
  BUSAN_HAEUNDAE = 'BUSAN_HAEUNDAE',
  /** 부산 사하구 */
  BUSAN_SAHA = 'BUSAN_SAHA',
  /** 부산 금정구 */
  BUSAN_GEUMJEONG = 'BUSAN_GEUMJEONG',
  /** 부산 연제구 */
  BUSAN_YEONJE = 'BUSAN_YEONJE',
  /** 부산 수영구 */
  BUSAN_SUYEONG = 'BUSAN_SUYEONG',
  /** 부산 사상구 */
  BUSAN_SASANG = 'BUSAN_SASANG',
  /** 부산 기장군 */
  BUSAN_GIJANG = 'BUSAN_GIJANG',

  // ── 제주특별자치도 ──
  /** 제주 */
  JEJU = 'JEJU',
  /** 제주 한림읍 */
  JEJU_HALLIM = 'JEJU_HALLIM',
  /** 제주 애월읍 */
  JEJU_AYEWOL = 'JEJU_AYEWOL',
  /** 제주 구좌읍 */
  JEJU_GUJWA = 'JEJU_GUJWA',
  /** 제주 조천읍 */
  JEJU_JOCHON = 'JEJU_JOCHON',
  /** 제주 한경면 */
  JEJU_HANGYEONG = 'JEJU_HANGYEONG',
  /** 제주 추자면 */
  JEJU_CHUJA = 'JEJU_CHUJA',
  /** 제주 우도면 */
  JEJU_UDO = 'JEJU_UDO',
  /** 제주 서귀포시 */
  JEJU_SEOGWIPO = 'JEJU_SEOGWIPO',
  /** 제주 대정읍 */
  JEJU_DAEJEONG = 'JEJU_DAEJEONG',
  /** 제주 남원읍 */
  JEJU_NAMWON = 'JEJU_NAMWON',
  /** 제주 성산읍 */
  JEJU_SEONGSAN = 'JEJU_SEONGSAN',
  /** 제주 안덕면 */
  JEJU_ANDUK = 'JEJU_ANDUK',
  /** 제주 표선면 */
  JEJU_PYOSEON = 'JEJU_PYOSEON',
}
