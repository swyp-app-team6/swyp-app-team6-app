/**
 * 코스믹 유형 테스트 질문
 * - id: 질문 고유 ID
 * - questionNumber: 질문 번호 (1~7)
 * - question: 질문 텍스트
 * - options: 4개 선택지
 */
export interface CosmicTypeQuestion {
  id: string;
  questionNumber: number;
  question: string;
  options: string[];
}

/**
 * 코스믹 유형 테스트 더미 질문 목록
 * - 추후 API에서 가져올 데이터를 임시로 JSON 상수로 관리
 * - 7문항, 각 4개 선택지
 */
export const COSMIC_TYPE_QUESTIONS: CosmicTypeQuestion[] = [
  {
    id: 'cosmic_1',
    questionNumber: 1,
    question: '연인과의 약속이 취소됐을 때 나는',
    options: [
      '혼자만의 시간을 보내요.',
      '다른 친구를 만나러 가요.',
      '다음 약속을 다시 잡아요.',
      '조금 서운한 마음이 들어요.',
    ],
  },
  {
    id: 'cosmic_2',
    questionNumber: 2,
    question: '연인이 내게 줬으면 하는 선물은',
    options: [
      '예상치 못한 꽃다발',
      '진심이 담긴 편지',
      '실용적인 물건',
      '평소에 갖고 싶었던 물건',
    ],
  },
  {
    id: 'cosmic_3',
    questionNumber: 3,
    question: '나의 애정 표현 방식',
    options: [
      '틈틈이 연락, 달달한 멘트',
      '이벤트 머신',
      '말보다 행동',
      '너만의 개그맨',
    ],
  },
  {
    id: 'cosmic_4',
    questionNumber: 4,
    question: '질투가 날 때 나는',
    options: [
      '농담하며 티낸다',
      '솔직하게 말한다',
      '혼자 삭인다',
      '더 잘해주려 한다',
    ],
  },
  {
    id: 'cosmic_5',
    questionNumber: 5,
    question: '연인과 싸웠을 때 나는',
    options: [
      '바로 대화로 풀려고 한다',
      '시간을 두고 생각한다',
      '먼저 사과한다',
      '상대가 먼저 연락하길 기다린다',
    ],
  },
  {
    id: 'cosmic_6',
    questionNumber: 6,
    question: '기념일에 대한 나의 생각',
    options: [
      '꼭 챙겨야 한다',
      '분위기에 따라 다르다',
      '굳이 안 챙겨도 된다',
      '매일이 기념일이다',
    ],
  },
  {
    id: 'cosmic_7',
    questionNumber: 7,
    question: '이상적인 연애는?',
    options: [
      '서로를 존중하는 연애',
      '친구처럼 웃는 연애',
      '오래 함께하는 연애',
      '서로에게 푹 빠지는 연애',
    ],
  },
];
