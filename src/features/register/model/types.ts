import type { Interest } from '@/entities/user';

/**
 * 프로필 등록 폼 상태
 * - nickname: 이름 (2~10자)
 * - profileImageUri: 로컬 이미지 URI (미리보기용)
 * - profileImageKey: S3 업로드 후 발급된 이미지 키
 * - gender: 성별 (M=남성, F=여성)
 * - age: 만 나이
 * - jobField: 직무분야 (직무/직업/직장, 최대 10자)
 * - region: 활동 지역 (시/도 코드)
 * - subArea: 활동 지역 하위 구/군
 * - bio: 한줄 자기소개 (최대 100자)
 * - interests: 관심사 목록 (3~5개)
 * - tmiAnswers: TMI 답변 목록
 */
export interface RegisterFormState {
  nickname: string;
  profileImageUri: string | null;
  profileImageKey: string | null;
  gender: 'M' | 'F' | null;
  age: string;
  jobField: string;
  region: string;
  subArea: string;
  bio: string;
  interests: Interest[];
  tmiAnswers: TMIAnswer[];
}

/**
 * 활동 지역 옵션 목록
 * - value: API에 전송하는 지역 코드
 * - label: 화면에 표시하는 한국어 라벨
 */
export const REGION_OPTIONS: { value: string; label: string }[] = [
  { value: 'SEOUL', label: '서울' },
  { value: 'GYEONGGI', label: '경기' },
  { value: 'INCHEON', label: '인천' },
  { value: 'BUSAN', label: '부산' },
  { value: 'DAEGU', label: '대구' },
  { value: 'DAEJEON', label: '대전' },
  { value: 'GWANGJU', label: '광주' },
  { value: 'ULSAN', label: '울산' },
  { value: 'SEJONG', label: '세종' },
  { value: 'GANGWON', label: '강원' },
  { value: 'CHUNGBUK', label: '충북' },
  { value: 'CHUNGNAM', label: '충남' },
  { value: 'JEONBUK', label: '전북' },
  { value: 'JEONNAM', label: '전남' },
  { value: 'GYEONGBUK', label: '경북' },
  { value: 'GYEONGNAM', label: '경남' },
  { value: 'JEJU', label: '제주' },
];

/**
 * 시/도별 하위 지역(구/군) 매핑
 * - key: 시/도 라벨
 * - value: 해당 시/도의 하위 지역 라벨 목록 (첫 번째는 항상 "전체")
 */
export const REGION_SUB_AREAS: Record<string, string[]> = {
  서울: ['서울 전체', '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
  경기: ['경기 전체', '고양시', '과천시', '광명시', '광주시', '구리시', '군포시', '김포시', '남양주시', '동두천시', '부천시', '성남시', '수원시', '시흥시', '안산시', '안성시', '안양시', '양주시', '양평군', '여주시', '연천군', '오산시', '용인시', '의왕시', '의정부시', '이천시', '파주시', '평택시', '포천시', '하남시', '화성시'],
  인천: ['인천 전체', '계양구', '남동구', '동구', '미추홀구', '부평구', '서구', '연수구', '옹진군', '중구', '강화군'],
  부산: ['부산 전체', '강서구', '금정구', '기장군', '남구', '동구', '동래구', '부산진구', '북구', '사상구', '사하구', '서구', '수영구', '연제구', '영도구', '중구', '해운대구'],
  대구: ['대구 전체', '남구', '달서구', '달성군', '동구', '북구', '서구', '수성구', '중구'],
  대전: ['대전 전체', '대덕구', '동구', '서구', '유성구', '중구'],
  광주: ['광주 전체', '광산구', '남구', '동구', '북구', '서구'],
  울산: ['울산 전체', '남구', '동구', '북구', '울주군', '중구'],
  세종: ['세종 전체'],
  강원: ['강원 전체', '강릉시', '고성군', '동해시', '삼척시', '속초시', '양구군', '양양군', '영월군', '원주시', '인제군', '정선군', '철원군', '춘천시', '태백시', '평창군', '홍천군', '화천군', '횡성군'],
  충북: ['충북 전체', '괴산군', '단양군', '보은군', '영동군', '옥천군', '음성군', '제천시', '증평군', '진천군', '청주시', '충주시'],
  충남: ['충남 전체', '계룡시', '공주시', '금산군', '논산시', '당진시', '보령시', '부여군', '서산시', '서천군', '아산시', '예산군', '천안시', '청양군', '태안군', '홍성군'],
  전북: ['전북 전체', '고창군', '군산시', '김제시', '남원시', '무주군', '부안군', '순창군', '완주군', '익산시', '임실군', '장수군', '전주시', '정읍시', '진안군'],
  전남: ['전남 전체', '강진군', '고흥군', '곡성군', '광양시', '구례군', '나주시', '담양군', '목포시', '무안군', '보성군', '순천시', '신안군', '여수시', '영광군', '영암군', '완도군', '장성군', '장흥군', '진도군', '함평군', '해남군', '화순군'],
  경북: ['경북 전체', '경산시', '경주시', '고령군', '구미시', '군위군', '김천시', '문경시', '봉화군', '상주시', '성주군', '안동시', '영덕군', '영양군', '영주시', '영천시', '예천군', '울릉군', '울진군', '의성군', '청도군', '청송군', '칠곡군', '포항시'],
  경남: ['경남 전체', '거제시', '거창군', '고성군', '김해시', '남해군', '밀양시', '사천시', '산청군', '양산시', '의령군', '진주시', '창녕군', '창원시', '통영시', '하동군', '함안군', '함양군', '합천군'],
  제주: ['제주 전체', '제주시', '서귀포시'],
};

/**
 * TMI 카테고리
 * - ALL = 전체
 * - EITHER_OR = 양자택일
 * - FILL_BLANK = 빈칸 채우기
 * - COUPLE_DEBATE = 커플 논쟁
 * - BALANCE_GAME = 밸런스 게임
 */
export type TMICategory = 'ALL' | 'EITHER_OR' | 'FILL_BLANK' | 'COUPLE_DEBATE' | 'BALANCE_GAME';

/**
 * TMI 질문 답변 유형
 * - CHOICE = 선택형 (선택지 중 1개 탭)
 * - TEXT = 서술형 (텍스트 직접 입력, 5~100자)
 */
export type TMIAnswerType = 'CHOICE' | 'TEXT';

/**
 * TMI 질문
 * - id: 질문 고유 ID
 * - category: 질문 카테고리
 * - question: 질문 텍스트
 * - answerType: 답변 유형 (선택형/서술형)
 * - options: 선택형일 때 선택지 목록
 */
export interface TMIQuestion {
  id: string;
  category: TMICategory;
  question: string;
  answerType: TMIAnswerType;
  options?: string[];
}

/**
 * TMI 답변
 * - questionId: 질문 ID
 * - answer: 선택한 답변 또는 입력한 텍스트
 */
export interface TMIAnswer {
  questionId: string;
  answer: string;
}

/**
 * 관심사 옵션 목록 (PRD 12개)
 * - value: API에 전송하는 Interest 값
 * - label: 화면에 표시하는 한국어 라벨
 */
export const INTEREST_OPTIONS: { value: Interest; label: string }[] = [
  { value: 'TRAVEL', label: '여행' },
  { value: 'SPORTS', label: '운동' },
  { value: 'FOOD', label: '맛집/카페' },
  { value: 'BOOKS', label: '독서' },
  { value: 'GAME', label: '게임' },
  { value: 'SELF_DEVELOPMENT', label: '자기계발' },
  { value: 'INVESTING', label: '재테크' },
  { value: 'CULTURE', label: '콘서트/뮤지컬' },
  { value: 'CONTENTS', label: '영화/드라마' },
  { value: 'CAMPING', label: '캠핑/드라이브' },
  { value: 'MUSIC', label: '음악' },
  { value: 'LANGUAGE', label: '외국어' },
];

/**
 * TMI 카테고리 필터 옵션
 * - value: TMICategory 값
 * - label: 화면에 표시하는 한국어 라벨
 */
export const TMI_CATEGORY_OPTIONS: { value: TMICategory; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: 'EITHER_OR', label: '양자택일' },
  { value: 'FILL_BLANK', label: '빈칸 채우기' },
  { value: 'COUPLE_DEBATE', label: '커플 논쟁' },
  { value: 'BALANCE_GAME', label: '밸런스 게임' },
];
