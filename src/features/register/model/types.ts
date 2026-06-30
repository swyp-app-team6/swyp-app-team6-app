import type { Interest } from '@/entities/user';

/**
 * 프로필 등록 폼 상태
 * - nickname: 이름 (2~10자)
 * - profileImageUri: 로컬 이미지 URI (미리보기용)
 * - profileImageKey: S3 업로드 후 발급된 이미지 키
 * - gender: 성별 (M=남성, F=여성)
 * - age: 만 나이
 * - jobField: 직무분야 (직무/직업/직장, 최대 10자)
 * - region: 활동 지역
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
