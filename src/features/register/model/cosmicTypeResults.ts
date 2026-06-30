/**
 * 코스믹 유형 테스트 결과 유형
 * - SHOOTING_STAR = 슈팅스타 형
 * - GALAXY = 갤럭시 형
 * - SOLAR = 솔라 형
 * - LUNA = 루나 형
 */
export type CosmicType = 'SHOOTING_STAR' | 'GALAXY' | 'SOLAR' | 'LUNA';

/**
 * 코스믹 유형 결과 데이터
 * - type: 유형 코드
 * - name: 유형 표시명
 * - description: 한줄 설명
 * - tags: 키워드 태그 3개
 * - loveStyle: 연애 스타일 설명 (뒷면)
 * - quotes: 자주 듣는 말 (뒷면)
 * - bestMatches: 궁합이 좋은 유형 코드 (뒷면)
 */
export interface CosmicTypeResult {
  type: CosmicType;
  name: string;
  description: string;
  tags: string[];
  loveStyle: string[];
  quotes: string[];
  bestMatches: CosmicType[];
}

/**
 * 코스믹 유형 결과 더미 데이터
 * - 추후 API 연동 시 교체
 */
export const COSMIC_TYPE_RESULTS: Record<CosmicType, CosmicTypeResult> = {
  SHOOTING_STAR: {
    type: 'SHOOTING_STAR',
    name: '슈팅스타 형',
    description: '함께 웃고 즐기는 순간이\n가장 행복한 절친 같은 연애',
    tags: ['유쾌함', '추억수집', '긍정에너지'],
    loveStyle: [
      '함께하는 시간을 가장 소중하게 생각해요.',
      '새로운 데이트와 경험을 즐겨요.',
      '장난과 유머로 애정을 표현해요.',
      '편안하고 웃음이 많은 관계를 추구해요.',
    ],
    quotes: [
      '"너랑 있으면 시간이 진짜 빨라"',
      '"같이 있으면 너무 재밌어"',
    ],
    bestMatches: ['SOLAR', 'GALAXY'],
  },
  GALAXY: {
    type: 'GALAXY',
    name: '갤럭시 형',
    description: '서로를 존중하며 함께 성장하는\n독립적인 연애',
    tags: ['자유', '믿음', '편안함'],
    loveStyle: [
      '서로의 개인 시간을 존중해요.',
      '집착보다 믿음을 중요하게 생각해요.',
      '자연스럽고 부담 없는 관계를 선호해요.',
      '연애와 자신의 삶의 균형을 잘 맞춰요.',
    ],
    quotes: [
      '"같이 있으면 편안해"',
      '"의존하지 않아서 좋아"',
    ],
    bestMatches: ['LUNA', 'SHOOTING_STAR'],
  },
  SOLAR: {
    type: 'SOLAR',
    name: '솔라 형',
    description: '사랑을 아낌없이 표현하는\n열정적인 연애',
    tags: ['애정표현', '열정', '직진'],
    loveStyle: [
      '감정을 솔직하게 표현해요.',
      '연인에게 시간과 정성을 아끼지 않아요.',
      '둘만의 특별한 추억을 중요하게 생각해요.',
      '깊은 교감과 애정을 원해요.',
    ],
    quotes: [
      '"표현을 정말 잘 한다"',
      '"사랑받는다는 느낌이 들어"',
    ],
    bestMatches: ['SHOOTING_STAR', 'LUNA'],
  },
  LUNA: {
    type: 'LUNA',
    name: '루나 형',
    description: '믿음과 배려로 오래 함께하는\n잔잔한 연애',
    tags: ['신뢰', '배려', '꾸준함'],
    loveStyle: [
      '신뢰를 가장 중요한 가치로 생각해요.',
      '갈등은 대화로 해결하려고 해요.',
      '작은 배려를 꾸준히 실천해요.',
      '오래 함께할 수 있는 관계를 추구해요.',
    ],
    quotes: [
      '"옆에 있으면 든든해"',
      '"믿고 의지할 수 있는 사람이야"',
    ],
    bestMatches: ['SOLAR', 'GALAXY'],
  },
};
