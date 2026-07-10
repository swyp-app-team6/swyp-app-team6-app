import { INTEREST } from '@/entities/user';
import type { MyProfileResponse } from '@/entities/user';
import type { CosmicType } from '@/shared/enums';
import { Region } from '@/shared/enums';
import { TMIQuestionType } from '@/shared/enums';
import { getProfileImageUrl } from '@/shared/lib/getProfileImageUrl';

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
 * - cosmicType: 코스믹 유형 테스트 결과
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
  interests: INTEREST[];
  cosmicType: CosmicType | null;
  tmiAnswers: TMIAnswer[];
}

/**
 * 활동 지역 옵션 목록
 * - value: API에 전송하는 지역 코드
 * - label: 화면에 표시하는 한국어 라벨
 */
export const REGION_OPTIONS: { value: Region; label: string }[] = [
  { value: Region.SEOUL, label: '서울' },
  { value: Region.GYEONGGI, label: '경기' },
  { value: Region.INCHEON, label: '인천' },
  { value: Region.BUSAN, label: '부산' },
  { value: Region.DAEGU, label: '대구' },
  { value: Region.DAEJEON, label: '대전' },
  { value: Region.GWANGJU, label: '광주' },
  { value: Region.ULSAN, label: '울산' },
  { value: Region.SEJONG, label: '세종' },
  { value: Region.GANGWON, label: '강원' },
  { value: Region.CHUNGBUK, label: '충북' },
  { value: Region.CHUNGNAM, label: '충남' },
  { value: Region.JEONBUK, label: '전북' },
  { value: Region.JEONNAM, label: '전남' },
  { value: Region.GYEONGBUK, label: '경북' },
  { value: Region.GYEONGNAM, label: '경남' },
  { value: Region.JEJU, label: '제주' },
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
 * INTEREST enum → 한국어 라벨 매핑
 * - API 응답 기준 라벨
 */
export const INTEREST_LABEL: Record<string, string> = {
  [INTEREST.TRAVEL]: '여행',
  [INTEREST.SPORTS]: '운동',
  [INTEREST.MUSIC]: '음악',
  [INTEREST.VIDEO]: '유튜브',
  [INTEREST.RESTAURANT]: '맛집탐방',
  [INTEREST.CAFE]: '카페투어',
  [INTEREST.CULTURE]: '문화생활',
  [INTEREST.READING]: '독서',
  [INTEREST.GAME]: '게임',
  [INTEREST.SELF_DEVELOPMENT]: '자기계발',
  [INTEREST.INVESTING]: '재테크',
  [INTEREST.MOVIE]: '영화감상',
};

/**
 * TMI 카테고리 필터 타입
 * - 'ALL' = 전체
 * - TMIQuestionType = API 질문 유형으로 필터링
 */
export type TMICategoryFilter = 'ALL' | TMIQuestionType;

/**
 * TMI 답변
 * - questionId: 질문 ID (API 기준 number)
 * - answerKind: 답변 종류 ('CHOICE' | 'TEXT') — multiple/short 구분용
 * - questionType: 질문 유형
 * - question: 질문 텍스트
 * - answer: 선택한 답변 또는 입력한 텍스트
 * - answerId: 선택형 답변 ID (선택형일 때만)
 */
export interface TMIAnswer {
  questionId: number;
  answerKind: 'CHOICE' | 'TEXT';
  questionType: TMIQuestionType;
  question: string;
  answer: string;
  answerId?: number;
}

/**
 * TMI 질문의 고유 키 생성
 * - multiple_questions와 short_questions에서 id가 중복될 수 있으므로 answerKind를 조합
 */
export function tmiKey(answerKind: 'CHOICE' | 'TEXT', questionId: number): string {
  return `${answerKind}-${questionId}`;
}

/**
 * 관심사별 이모지 매핑
 * - key: INTEREST enum 값
 * - value: 화면에 표시하는 이모지
 */
export const INTEREST_EMOJI: Record<string, string> = {
  [INTEREST.TRAVEL]: '✈️',
  [INTEREST.SPORTS]: '🏃',
  [INTEREST.MUSIC]: '🎵',
  [INTEREST.VIDEO]: '📹',
  [INTEREST.RESTAURANT]: '🍽️',
  [INTEREST.CAFE]: '☕',
  [INTEREST.CULTURE]: '🎭',
  [INTEREST.READING]: '📚',
  [INTEREST.GAME]: '🎮',
  [INTEREST.SELF_DEVELOPMENT]: '📝',
  [INTEREST.INVESTING]: '💰',
  [INTEREST.MOVIE]: '🎬',
};


/**
 * # profileToFormState
 * ---
 * - 간단설명: MyProfileResponse를 RegisterFormState로 변환하는 파싱 함수
 * - 제약사항 및 특이사항:
 *   - image_key는 getProfileImageUrl()로 URI 변환
 *   - choice_template/short_template를 TMIAnswer[]로 변환
 * ---
 * @param profile 프로필 응답 데이터
 * @example
 * const formState = profileToFormState(profile);
 * updateForm(formState);
 */
export function profileToFormState(profile: MyProfileResponse): RegisterFormState {
  const tmiAnswers: TMIAnswer[] = [
    ...(profile.choice_template ?? []).map((t) => ({
      questionId: t.question_id!,
      answerKind: 'CHOICE' as const,
      questionType: t.question_type,
      question: t.question,
      answer: t.answer,
      answerId: t.answer_id,
    })),
    ...(profile.short_template ?? []).map((t) => ({
      questionId: t.question_id!,
      answerKind: 'TEXT' as const,
      questionType: t.question_type,
      question: t.question,
      answer: t.answer,
    })),
  ];

  return {
    nickname: profile.nickname,
    profileImageUri: getProfileImageUrl(profile.image_key) ?? null,
    profileImageKey: profile.image_key ?? null,
    gender: profile.gender,
    age: String(profile.age),
    jobField: profile.job,
    region: REGION_OPTIONS.find((o) => o.label === profile.region.group)?.value ?? profile.region.detail,
    subArea: profile.region.label,
    bio: profile.bio ?? '',
    interests: profile.interests.map((i) => i.type),
    cosmicType: profile.cosmic_type ?? null,
    tmiAnswers,
  };
}

/**
 * TMI 카테고리 필터 옵션
 * - value: TMICategoryFilter 값 (ALL 또는 TMIQuestionType)
 * - label: 화면에 표시하는 한국어 라벨
 */
export const TMI_CATEGORY_OPTIONS: { value: TMICategoryFilter; label: string }[] = [
  { value: 'ALL', label: '전체' },
  { value: TMIQuestionType.BINARY, label: '양자택일' },
  { value: TMIQuestionType.BLANK, label: '빈칸채우기' },
  { value: TMIQuestionType.DISCUSSION, label: '커플논쟁' },
  { value: TMIQuestionType.BALANCE_GAME, label: '밸런스게임' },
];
