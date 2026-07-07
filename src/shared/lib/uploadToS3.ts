/**
 * # uploadToS3
 * ---
 * - 간단설명: presigned URL을 사용하여 로컬 이미지 파일을 S3에 업로드
 * - 제약사항 및 특이사항:
 *   - XMLHttpRequest 사용으로 안드로이드 content:// URI 호환
 *   - React Native의 XHR이 네이티브 레벨에서 로컬 파일 URI를 직접 처리
 *   - presigned URL의 유효 시간(10분) 내에 업로드 완료 필요
 * ---
 * @param uploadUrl S3 presigned URL
 * @param fileUri 로컬 파일 URI (file:// 또는 content://)
 * @param contentType 파일 MIME 타입 (예: image/jpeg)
 * @example
 * await uploadToS3('https://s3.../presigned', 'file:///photo.jpg', 'image/jpeg');
 */
export function uploadToS3(
  uploadUrl: string,
  fileUri: string,
  contentType: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState !== 4) return;
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`S3 업로드 실패: ${xhr.status}`));
      }
    };
    xhr.onerror = () => reject(new Error('S3 업로드 네트워크 오류'));
    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', contentType);
    xhr.send({ uri: fileUri, type: contentType, name: 'upload' } as any);
  });
}
