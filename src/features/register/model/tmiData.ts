import type { TMIQuestion } from './types';

/**
 * TMI 플레이스홀더 질문 목록
 * - 추후 API에서 가져올 데이터를 임시로 JSON 상수로 관리
 * - 카테고리별 질문 구성: 양자택일, 빈칸 채우기, 커플 논쟁, 밸런스 게임
 */
export const TMI_QUESTIONS: TMIQuestion[] = [
  // 양자택일
  {
    id: 'tmi_1',
    category: 'EITHER_OR',
    question: '연락은 전화파? 문자파?',
    answerType: 'CHOICE',
    options: ['전화파', '문자파'],
  },
  {
    id: 'tmi_2',
    category: 'EITHER_OR',
    question: '여행은 계획파? 즉흥파?',
    answerType: 'CHOICE',
    options: ['계획파', '즉흥파'],
  },
  {
    id: 'tmi_3',
    category: 'EITHER_OR',
    question: '주말에는 집순이/집돌이? 밖순이/밖돌이?',
    answerType: 'CHOICE',
    options: ['집순이/집돌이', '밖순이/밖돌이'],
  },

  // 빈칸 채우기
  {
    id: 'tmi_4',
    category: 'FILL_BLANK',
    question: '나의 인생 영화는 ___이다',
    answerType: 'TEXT',
  },
  {
    id: 'tmi_5',
    category: 'FILL_BLANK',
    question: '내가 가장 좋아하는 음식은 ___이다',
    answerType: 'TEXT',
  },
  {
    id: 'tmi_6',
    category: 'FILL_BLANK',
    question: '나의 버킷리스트 1순위는 ___이다',
    answerType: 'TEXT',
  },

  // 커플 논쟁
  {
    id: 'tmi_7',
    category: 'COUPLE_DEBATE',
    question: '연인의 이성 친구, 괜찮다 vs 안 괜찮다',
    answerType: 'CHOICE',
    options: ['괜찮다', '안 괜찮다'],
  },
  {
    id: 'tmi_8',
    category: 'COUPLE_DEBATE',
    question: '기념일 챙기기, 중요하다 vs 상관없다',
    answerType: 'CHOICE',
    options: ['중요하다', '상관없다'],
  },

  // 밸런스 게임
  {
    id: 'tmi_9',
    category: 'BALANCE_GAME',
    question: '100만원 받기 vs 내일 당장 해외여행',
    answerType: 'CHOICE',
    options: ['100만원 받기', '내일 당장 해외여행'],
  },
  {
    id: 'tmi_10',
    category: 'BALANCE_GAME',
    question: '짜장면 vs 짬뽕',
    answerType: 'CHOICE',
    options: ['짜장면', '짬뽕'],
  },
];
