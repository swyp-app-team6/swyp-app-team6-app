/**
 * # uploadToS3
 * ---
 * - 간단설명: presigned URL을 사용하여 로컬 이미지 파일을 S3에 업로드
 * - 제약사항 및 특이사항:
 *   - React Native 환경에서 로컬 URI를 fetch로 blob 변환 후 PUT 요청
 *   - presigned URL의 유효 시간(10분) 내에 업로드 완료 필요
 * ---
 * @param uploadUrl S3 presigned URL
 * @param fileUri 로컬 파일 URI (예: file:///...)
 * @param contentType 파일 MIME 타입 (예: image/jpeg)
 * @example
 * await uploadToS3('https://s3.../presigned', 'file:///photo.jpg', 'image/jpeg');
 */
export async function uploadToS3(
  uploadUrl: string,
  fileUri: string,
  contentType: string,
): Promise<void> {
  const response = await fetch(fileUri);
  const blob = await response.blob();

  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
    },
    body: blob,
  });

  if (!uploadResponse.ok) {
    throw new Error(`S3 업로드 실패: ${uploadResponse.status}`);
  }
}
