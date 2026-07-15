/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        /** Pretendard 기본 */
        extralight: ['Pretendard-ExtraLight'],
        light: ['Pretendard-Light'],
        // medium: ['Pretendard-Regular'], // ios에서 두껍게 나옴
        semibold: ['Pretendard-SemiBold'],
        bold: ['Pretendard-Bold'],
      },
      colors: {
        /** Title color — 텍스트 및 아이콘용 그레이스케일 */
        text: {
          /** 메인 텍스트 (거의 블랙) */
          black: '#1A1A1A',
          /** 본문 텍스트 (다크 그레이) */
          gray2: '#1B1B1B',
          /** 보조 텍스트 */
          gray3: '#40403F',
          /** 비활성 텍스트 */
          gray4: '#888888',
          /** 플레이스홀더 */
          gray5: '#BFBFBF',
          /** 보더, 구분선 */
          gray6: '#E3E3E3',
          /** 배경 (라이트 그레이) */
          gray7: '#F5F5F5',
        },
        /** Primary color — 메인 브랜드 컬러 (퍼플 계열) */
        primary: {
          /** 기본 프라이머리 */
          DEFAULT: '#8C39FB',
          /** 연한 프라이머리 */
          light: '#EADCFF',
          /** 가장 연한 프라이머리 (배경용) */
          lightest: '#F5EDFF',
        },
        /** Secondary color (확정 아님) — 보조 강조 컬러 */
        secondary: {
          /** 옐로우 */
          yellow: '#FFCE07',
          /** 핑크 */
          pink: '#FF6CC2',
        },
        white: '#FFFFFF',
        /** 메인 텍스트 (거의 블랙) */
        black: '#1A1A1A',
        /** 본문 텍스트 (다크 그레이) */
        gray2: '#1B1B1B',
        /** 보조 텍스트 */
        gray3: '#40403F',
        /** 비활성 텍스트 */
        gray4: '#888888',
        /** 플레이스홀더 */
        gray5: '#BFBFBF',
        /** 보더, 구분선 */
        gray6: '#E3E3E3',
        /** 배경 (라이트 그레이) */
        gray7: '#F5F5F5',
      },
    },
  },
  plugins: [],
};
