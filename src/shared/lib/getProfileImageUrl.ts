import Config from 'react-native-config';

/**
 * # getProfileImageUrl
 * ---
 * - 간단설명: S3 이미지 키를 전체 프로필 이미지 URL로 변환
 * - 제약사항 및 특이사항:
 *   - imageKey가 비어있거나 null/undefined이면 undefined 반환
 *   - 이미 http로 시작하는 전체 URL인 경우 그대로 반환
 * ---
 * @param imageKey S3 이미지 키
 * @returns 전체 프로필 이미지 URL 또는 undefined
 * ---
 * @example
 * getProfileImageUrl('abc123.jpg')
 * // => 'https://swyp-prod-media.s3.ap-northeast-2.amazonaws.com/original/abc123.jpg'
 */
export function getProfileImageUrl(imageKey: string | null | undefined): string | undefined {
  if (!imageKey) {
    return undefined;
  }

  if (imageKey.startsWith('http')) {
    return imageKey;
  }

  return `${Config.PROFILE_IMAGE_S3_URL}/${imageKey}`;
}
