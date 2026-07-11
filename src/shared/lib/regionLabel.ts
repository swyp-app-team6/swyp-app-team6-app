import { Region } from '@/shared/enums';

/**
 * Region enum 값 → 한글 라벨 매핑
 * - Region enum의 모든 값을 한국어 라벨로 변환하기 위한 매핑 테이블
 * - SEOUL → '서울', SEOUL_GANGNAM → '서울 강남구' 형태
 */
const REGION_LABEL_MAP: Record<Region, string> = {
  // ── 서울특별시 ──
  [Region.SEOUL]: '서울',
  [Region.SEOUL_GANGNAM]: '서울 강남구',
  [Region.SEOUL_GANGDONG]: '서울 강동구',
  [Region.SEOUL_GANGBUK]: '서울 강북구',
  [Region.SEOUL_GANGSEO]: '서울 강서구',
  [Region.SEOUL_GWANAK]: '서울 관악구',
  [Region.SEOUL_GWANGJIN]: '서울 광진구',
  [Region.SEOUL_GURO]: '서울 구로구',
  [Region.SEOUL_GEUMCHEON]: '서울 금천구',
  [Region.SEOUL_NOWON]: '서울 노원구',
  [Region.SEOUL_DOBONG]: '서울 도봉구',
  [Region.SEOUL_DONGDAEMUN]: '서울 동대문구',
  [Region.SEOUL_DONGJAK]: '서울 동작구',
  [Region.SEOUL_MAPO]: '서울 마포구',
  [Region.SEOUL_SEODAEMUN]: '서울 서대문구',
  [Region.SEOUL_SEOCHO]: '서울 서초구',
  [Region.SEOUL_SEONGDONG]: '서울 성동구',
  [Region.SEOUL_SEONGBUK]: '서울 성북구',
  [Region.SEOUL_SONGPA]: '서울 송파구',
  [Region.SEOUL_YANGCHEON]: '서울 양천구',
  [Region.SEOUL_YEONGDEUNGPO]: '서울 영등포구',
  [Region.SEOUL_YONGSAN]: '서울 용산구',
  [Region.SEOUL_EUNPYEONG]: '서울 은평구',
  [Region.SEOUL_JONGNO]: '서울 종로구',
  [Region.SEOUL_JUNGGU]: '서울 중구',
  [Region.SEOUL_JUNGNANG]: '서울 중랑구',

  // ── 경기도 ──
  [Region.GYEONGGI]: '경기',
  [Region.GYEONGGI_SUWON]: '경기 수원시',
  [Region.GYEONGGI_SEONGNAM]: '경기 성남시',
  [Region.GYEONGGI_GOYANG]: '경기 고양시',
  [Region.GYEONGGI_YONGIN]: '경기 용인시',
  [Region.GYEONGGI_BUCHEON]: '경기 부천시',
  [Region.GYEONGGI_ANSAN]: '경기 안산시',
  [Region.GYEONGGI_ANYANG]: '경기 안양시',
  [Region.GYEONGGI_NAMYANGJU]: '경기 남양주시',
  [Region.GYEONGGI_HWASEONG]: '경기 화성시',
  [Region.GYEONGGI_UIJEONGBU]: '경기 의정부시',
  [Region.GYEONGGI_SIHEUNG]: '경기 시흥시',
  [Region.GYEONGGI_PYEONGTAEK]: '경기 평택시',
  [Region.GYEONGGI_GWANGMYEONG]: '경기 광명시',
  [Region.GYEONGGI_PAJU]: '경기 파주시',
  [Region.GYEONGGI_GUNPO]: '경기 군포시',
  [Region.GYEONGGI_GWANGJU]: '경기 광주시',
  [Region.GYEONGGI_GIMPO]: '경기 김포시',
  [Region.GYEONGGI_ICHEON]: '경기 이천시',
  [Region.GYEONGGI_YANGJU]: '경기 양주시',
  [Region.GYEONGGI_GURI]: '경기 구리시',
  [Region.GYEONGGI_OSAN]: '경기 오산시',
  [Region.GYEONGGI_ANSEONG]: '경기 안성시',
  [Region.GYEONGGI_UIWANG]: '경기 의왕시',
  [Region.GYEONGGI_HANAM]: '경기 하남시',
  [Region.GYEONGGI_POCHEON]: '경기 포천시',
  [Region.GYEONGGI_DONGDUCHEON]: '경기 동두천시',
  [Region.GYEONGGI_GWACHEON]: '경기 과천시',
  [Region.GYEONGGI_YEOJU]: '경기 여주시',
  [Region.GYEONGGI_YANGPYEONG]: '경기 양평군',
  [Region.GYEONGGI_GAPYEONG]: '경기 가평군',
  [Region.GYEONGGI_YEONCHEON]: '경기 연천군',

  // ── 인천광역시 ──
  [Region.INCHEON]: '인천',
  [Region.INCHEON_JUNGGU]: '인천 중구',
  [Region.INCHEON_DONGGU]: '인천 동구',
  [Region.INCHEON_MIHCHUHOL]: '인천 미추홀구',
  [Region.INCHEON_YEONSU]: '인천 연수구',
  [Region.INCHEON_NAMDONG]: '인천 남동구',
  [Region.INCHEON_BUPYEONG]: '인천 부평구',
  [Region.INCHEON_GYEYANG]: '인천 계양구',
  [Region.INCHEON_SEOGU]: '인천 서구',
  [Region.INCHEON_GANGHWA]: '인천 강화군',
  [Region.INCHEON_ONGJIN]: '인천 옹진군',

  // ── 강원특별자치도 ──
  [Region.GANGWON]: '강원',
  [Region.GANGWON_CHUNCHEON]: '강원 춘천시',
  [Region.GANGWON_INJE]: '강원 인제군',
  [Region.GANGWON_YANGGU]: '강원 양구군',
  [Region.GANGWON_GOSEONG]: '강원 고성군',
  [Region.GANGWON_YANGYANG]: '강원 양양군',
  [Region.GANGWON_GANGNEUNG]: '강원 강릉시',
  [Region.GANGWON_SOKCHO]: '강원 속초시',
  [Region.GANGWON_SAMCHEOK]: '강원 삼척시',
  [Region.GANGWON_JEONGSEON]: '강원 정선군',
  [Region.GANGWON_PYEONGCHANG]: '강원 평창군',
  [Region.GANGWON_YEONGWOL]: '강원 영월군',
  [Region.GANGWON_WONJU]: '강원 원주시',
  [Region.GANGWON_HOENGSEONG]: '강원 횡성군',
  [Region.GANGWON_HONGCHEON]: '강원 홍천군',
  [Region.GANGWON_HWACHEON]: '강원 화천군',
  [Region.GANGWON_CHEORWON]: '강원 철원군',
  [Region.GANGWON_DONGHAE]: '강원 동해시',
  [Region.GANGWON_TAEBAEK]: '강원 태백시',

  // ── 충청북도 ──
  [Region.CHUNGBUK]: '충북',
  [Region.CHUNGBUK_CHEONGJU]: '충북 청주시',
  [Region.CHUNGBUK_CHUNGJU]: '충북 충주시',
  [Region.CHUNGBUK_JECHON]: '충북 제천시',
  [Region.CHUNGBUK_BOEUN]: '충북 보은군',
  [Region.CHUNGBUK_OKCHEON]: '충북 옥천군',
  [Region.CHUNGBUK_YEONGDONG]: '충북 영동군',
  [Region.CHUNGBUK_JEUNGPYEONG]: '충북 증평군',
  [Region.CHUNGBUK_JINCHEON]: '충북 진천군',
  [Region.CHUNGBUK_GOESAN]: '충북 괴산군',
  [Region.CHUNGBUK_EUMSEONG]: '충북 음성군',
  [Region.CHUNGBUK_DANYANG]: '충북 단양군',

  // ── 충청남도 ──
  [Region.CHUNGNAM]: '충남',
  [Region.CHUNGNAM_CHEONAN]: '충남 천안시',
  [Region.CHUNGNAM_GONGJU]: '충남 공주시',
  [Region.CHUNGNAM_BORYEONG]: '충남 보령시',
  [Region.CHUNGNAM_ASAN]: '충남 아산시',
  [Region.CHUNGNAM_SEOSAN]: '충남 서산시',
  [Region.CHUNGNAM_NONSAN]: '충남 논산시',
  [Region.CHUNGNAM_GYERYONG]: '충남 계룡시',
  [Region.CHUNGNAM_DANGJIN]: '충남 당진시',
  [Region.CHUNGNAM_GEUMSAN]: '충남 금산군',
  [Region.CHUNGNAM_BUYEO]: '충남 부여군',
  [Region.CHUNGNAM_SEOCHEON]: '충남 서천군',
  [Region.CHUNGNAM_CHEONGYANG]: '충남 청양군',
  [Region.CHUNGNAM_HONGSEONG]: '충남 홍성군',
  [Region.CHUNGNAM_YESAN]: '충남 예산군',
  [Region.CHUNGNAM_TAEAN]: '충남 태안군',

  // ── 세종특별자치시 ──
  [Region.SEJONG]: '세종',
  [Region.SEJONG_JOCHEON]: '세종 조천읍',
  [Region.SEJONG_YEONGI]: '세종 연기면',
  [Region.SEJONG_YEONDONG]: '세종 연동면',
  [Region.SEJONG_BUGANG]: '세종 부강면',
  [Region.SEJONG_GEUMNAM]: '세종 금남면',
  [Region.SEJONG_JANGGUN]: '세종 장군면',
  [Region.SEJONG_YEONSEO]: '세종 연서면',
  [Region.SEJONG_JEONUI]: '세종 전의면',
  [Region.SEJONG_JEONDONG]: '세종 전동면',
  [Region.SEJONG_SOJEONG]: '세종 소정면',
  [Region.SEJONG_HANSOL]: '세종 한솔동',
  [Region.SEJONG_SAEROM]: '세종 새롬동',
  [Region.SEJONG_DODAM]: '세종 도담동',
  [Region.SEJONG_AREUM]: '세종 아름동',
  [Region.SEJONG_JONGCHON]: '세종 종촌동',
  [Region.SEJONG_GOUN]: '세종 고운동',
  [Region.SEJONG_SODAM]: '세종 소담동',
  [Region.SEJONG_BORAEM]: '세종 보람동',
  [Region.SEJONG_DAEPYEONG]: '세종 대평동',
  [Region.SEJONG_DAJUNG]: '세종 다정동',
  [Region.SEJONG_HAEMIL]: '세종 해밀동',
  [Region.SEJONG_BANGOK]: '세종 반곡동',

  // ── 대전광역시 ──
  [Region.DAEJEON]: '대전',
  [Region.DAEJEON_DONGGU]: '대전 동구',
  [Region.DAEJEON_JUNGGU]: '대전 중구',
  [Region.DAEJEON_SEOGU]: '대전 서구',
  [Region.DAEJEON_YUSEONG]: '대전 유성구',
  [Region.DAEJEON_DAEDEOK]: '대전 대덕구',

  // ── 광주광역시 ──
  [Region.GWANGJU]: '광주',
  [Region.GWANGJU_DONGGU]: '광주 동구',
  [Region.GWANGJU_SEOGU]: '광주 서구',
  [Region.GWANGJU_NAMGU]: '광주 남구',
  [Region.GWANGJU_BUKGU]: '광주 북구',
  [Region.GWANGJU_GWANGSAN]: '광주 광산구',

  // ── 전북특별자치도 ──
  [Region.JEONBUK]: '전북',
  [Region.JEONBUK_JEONJU]: '전북 전주시',
  [Region.JEONBUK_IKSAN]: '전북 익산시',
  [Region.JEONBUK_GUNSAN]: '전북 군산시',
  [Region.JEONBUK_JEONGEUP]: '전북 정읍시',
  [Region.JEONBUK_NAMWON]: '전북 남원시',
  [Region.JEONBUK_GIMJE]: '전북 김제시',
  [Region.JEONBUK_WANJU]: '전북 완주군',
  [Region.JEONBUK_GOCHANG]: '전북 고창군',
  [Region.JEONBUK_BUAN]: '전북 부안군',
  [Region.JEONBUK_IMSIL]: '전북 임실군',
  [Region.JEONBUK_SUNCHANG]: '전북 순창군',
  [Region.JEONBUK_JINAN]: '전북 진안군',
  [Region.JEONBUK_MUJU]: '전북 무주군',
  [Region.JEONBUK_JANGSU]: '전북 장수군',

  // ── 전라남도 ──
  [Region.JEONNAM]: '전남',
  [Region.JEONNAM_MOKPO]: '전남 목포시',
  [Region.JEONNAM_YEOSU]: '전남 여수시',
  [Region.JEONNAM_SUNCHEON]: '전남 순천시',
  [Region.JEONNAM_NAJU]: '전남 나주시',
  [Region.JEONNAM_GWANGYANG]: '전남 광양시',
  [Region.JEONNAM_DAMYANG]: '전남 담양군',
  [Region.JEONNAM_GOKSEONG]: '전남 곡성군',
  [Region.JEONNAM_GURYE]: '전남 구례군',
  [Region.JEONNAM_GOHEUNG]: '전남 고흥군',
  [Region.JEONNAM_BOSEONG]: '전남 보성군',
  [Region.JEONNAM_HWASUN]: '전남 화순군',
  [Region.JEONNAM_JANGHEUNG]: '전남 장흥군',
  [Region.JEONNAM_GANGJIN]: '전남 강진군',
  [Region.JEONNAM_HAENAM]: '전남 해남군',
  [Region.JEONNAM_YEONGAM]: '전남 영암군',
  [Region.JEONNAM_MUAN]: '전남 무안군',
  [Region.JEONNAM_HAMPYEONG]: '전남 함평군',
  [Region.JEONNAM_YEONGGWANG]: '전남 영광군',
  [Region.JEONNAM_JANGSEONG]: '전남 장성군',
  [Region.JEONNAM_WANDO]: '전남 완도군',
  [Region.JEONNAM_JINDO]: '전남 진도군',
  [Region.JEONNAM_SINAN]: '전남 신안군',

  // ── 경상북도 ──
  [Region.GYEONGBUK]: '경북',
  [Region.GYEONGBUK_POHANG]: '경북 포항시',
  [Region.GYEONGBUK_GYEONGJU]: '경북 경주시',
  [Region.GYEONGBUK_GIMCHEON]: '경북 김천시',
  [Region.GYEONGBUK_ANDONG]: '경북 안동시',
  [Region.GYEONGBUK_GUMI]: '경북 구미시',
  [Region.GYEONGBUK_YEONGJU]: '경북 영주시',
  [Region.GYEONGBUK_YEONGCHEON]: '경북 영천시',
  [Region.GYEONGBUK_SANGJU]: '경북 상주시',
  [Region.GYEONGBUK_MUNGYEONG]: '경북 문경시',
  [Region.GYEONGBUK_GYEONGSAN]: '경북 경산시',
  [Region.GYEONGBUK_GUNWI]: '경북 군위군',
  [Region.GYEONGBUK_UISUNG]: '경북 의성군',
  [Region.GYEONGBUK_CHEONGSONG]: '경북 청송군',
  [Region.GYEONGBUK_YEONGYANG]: '경북 영양군',
  [Region.GYEONGBUK_YEONGDEOK]: '경북 영덕군',
  [Region.GYEONGBUK_CHEONGDO]: '경북 청도군',
  [Region.GYEONGBUK_GORYEONG]: '경북 고령군',
  [Region.GYEONGBUK_SEONGJU]: '경북 성주군',
  [Region.GYEONGBUK_CHILGOK]: '경북 칠곡군',
  [Region.GYEONGBUK_YECHON]: '경북 예천군',
  [Region.GYEONGBUK_BONGHWA]: '경북 봉화군',
  [Region.GYEONGBUK_ULJIN]: '경북 울진군',
  [Region.GYEONGBUK_ULLEUNG]: '경북 울릉군',

  // ── 대구광역시 ──
  [Region.DAEGU]: '대구',
  [Region.DAEGU_JUNGGU]: '대구 중구',
  [Region.DAEGU_DONGGU]: '대구 동구',
  [Region.DAEGU_SEOGU]: '대구 서구',
  [Region.DAEGU_NAMGU]: '대구 남구',
  [Region.DAEGU_BUKGU]: '대구 북구',
  [Region.DAEGU_SUSEONG]: '대구 수성구',
  [Region.DAEGU_DALSEO]: '대구 달서구',
  [Region.DAEGU_DALSEONG]: '대구 달성군',

  // ── 울산광역시 ──
  [Region.ULSAN]: '울산',
  [Region.ULSAN_JUNGGU]: '울산 중구',
  [Region.ULSAN_NAMGU]: '울산 남구',
  [Region.ULSAN_DONGGU]: '울산 동구',
  [Region.ULSAN_BUKGU]: '울산 북구',
  [Region.ULSAN_ULJU]: '울산 울주군',

  // ── 경상남도 ──
  [Region.GYEONGNAM]: '경남',
  [Region.GYEONGNAM_CHANGWON]: '경남 창원시',
  [Region.GYEONGNAM_GIMHAE]: '경남 김해시',
  [Region.GYEONGNAM_YANGSAN]: '경남 양산시',
  [Region.GYEONGNAM_JINJU]: '경남 진주시',
  [Region.GYEONGNAM_GEOJE]: '경남 거제시',
  [Region.GYEONGNAM_TONGYEONG]: '경남 통영시',
  [Region.GYEONGNAM_SACHEON]: '경남 사천시',
  [Region.GYEONGNAM_MILYANG]: '경남 밀양시',
  [Region.GYEONGNAM_HAMAN]: '경남 함안군',
  [Region.GYEONGNAM_GEOCHANG]: '경남 거창군',
  [Region.GYEONGNAM_CHANGNYEONG]: '경남 창녕군',
  [Region.GYEONGNAM_GOSEONG]: '경남 고성군',
  [Region.GYEONGNAM_HADONG]: '경남 하동군',
  [Region.GYEONGNAM_HAPCHEON]: '경남 합천군',
  [Region.GYEONGNAM_NAMHAE]: '경남 남해군',
  [Region.GYEONGNAM_HAMYANG]: '경남 함양군',
  [Region.GYEONGNAM_SANCHEONG]: '경남 산청군',
  [Region.GYEONGNAM_UIRYEONG]: '경남 의령군',

  // ── 부산광역시 ──
  [Region.BUSAN]: '부산',
  [Region.BUSAN_JUNGGU]: '부산 중구',
  [Region.BUSAN_SEOGU]: '부산 서구',
  [Region.BUSAN_DONGGU]: '부산 동구',
  [Region.BUSAN_YEONGDO]: '부산 영도구',
  [Region.BUSAN_BUSANJIN]: '부산 부산진구',
  [Region.BUSAN_DONGNAE]: '부산 동래구',
  [Region.BUSAN_NAMGU]: '부산 남구',
  [Region.BUSAN_BUKGU]: '부산 북구',
  [Region.BUSAN_GANGSEO]: '부산 강서구',
  [Region.BUSAN_HAEUNDAE]: '부산 해운대구',
  [Region.BUSAN_SAHA]: '부산 사하구',
  [Region.BUSAN_GEUMJEONG]: '부산 금정구',
  [Region.BUSAN_YEONJE]: '부산 연제구',
  [Region.BUSAN_SUYEONG]: '부산 수영구',
  [Region.BUSAN_SASANG]: '부산 사상구',
  [Region.BUSAN_GIJANG]: '부산 기장군',

  // ── 제주특별자치도 ──
  [Region.JEJU]: '제주',
  [Region.JEJU_HALLIM]: '제주 한림읍',
  [Region.JEJU_AYEWOL]: '제주 애월읍',
  [Region.JEJU_GUJWA]: '제주 구좌읍',
  [Region.JEJU_JOCHON]: '제주 조천읍',
  [Region.JEJU_HANGYEONG]: '제주 한경면',
  [Region.JEJU_CHUJA]: '제주 추자면',
  [Region.JEJU_UDO]: '제주 우도면',
  [Region.JEJU_SEOGWIPO]: '제주 서귀포시',
  [Region.JEJU_DAEJEONG]: '제주 대정읍',
  [Region.JEJU_NAMWON]: '제주 남원읍',
  [Region.JEJU_SEONGSAN]: '제주 성산읍',
  [Region.JEJU_ANDUK]: '제주 안덕면',
  [Region.JEJU_PYOSEON]: '제주 표선면',
};

/**
 * # getRegionLabel
 * ---
 * - 간단설명: Region enum 값을 한국어 라벨로 변환
 * - 제약사항 및 특이사항:
 *   - 매핑에 없는 값은 원본 문자열을 그대로 반환
 * ---
 * @param value Region enum 값 또는 문자열
 * @example
 * getRegionLabel(Region.SEOUL)          // '서울'
 * getRegionLabel('BUSAN_JUNGGU')        // '부산 중구'
 * getRegionLabel(Region.GYEONGGI_SUWON) // '경기 수원시'
 */
export function getRegionLabel(value: unknown): string {
  if (typeof value !== 'string') return '';
  return REGION_LABEL_MAP[value as Region] ?? value;
}

/**
 * 한글 subArea를 Region enum 값으로 변환하기 위한 역방향 매핑
 * - key: "시/도 라벨|하위지역 라벨" (예: "서울|강남구")
 * - value: Region enum 값 (예: "SEOUL_GANGNAM")
 */
const SUB_AREA_TO_REGION: Record<string, Region> = {};

for (const [enumValue, label] of Object.entries(REGION_LABEL_MAP)) {
  const parts = label.split(' ');
  if (parts.length === 2) {
    SUB_AREA_TO_REGION[`${parts[0]}|${parts[1]}`] = enumValue as Region;
  }
}

/**
 * # resolveRegionEnum
 * ---
 * - 간단설명: 시/도 코드 + 한글 subArea를 Region enum 값으로 변환
 * - 제약사항 및 특이사항:
 *   - subArea가 없거나 "~전체"이면 시/도 코드를 그대로 반환
 *   - 매핑을 찾지 못하면 시/도 코드를 반환
 * ---
 * @param regionCode 시/도 코드 (예: 'SEOUL')
 * @param subArea 하위 지역 한글 라벨 (예: '강남구')
 * @example
 * resolveRegionEnum('SEOUL', '강남구')     // 'SEOUL_GANGNAM'
 * resolveRegionEnum('SEOUL', '서울 전체')  // 'SEOUL'
 * resolveRegionEnum('BUSAN', '')           // 'BUSAN'
 */
export function resolveRegionEnum(regionCode: string, subArea: string): string {
  if (!subArea || subArea.endsWith('전체')) {
    return regionCode;
  }

  const provinceLabel = getRegionLabel(regionCode);
  const key = `${provinceLabel}|${subArea}`;
  return SUB_AREA_TO_REGION[key] ?? regionCode;
}
