import { useMutation } from '@tanstack/react-query';
import { ProfileAPI, type UploadContentType } from '@/entities/user';

/**
 * # useProfileImageUploadMutation
 * ---
 * - 간단설명: 프로필 이미지 presign 발급 + S3 업로드 mutation 훅
 * - 제약사항 및 특이사항:
 *   - ProfileAPI.profileImageUpload 호출하여 presign 발급 및 S3 업로드 수행
 *   - 성공 시 imageKey 반환
 * ---
 * @example
 * const { mutateAsync } = useProfileImageUploadMutation();
 * const imageKey = await mutateAsync({ fileUri: 'file:///photo.jpg', contentType: 'image/jpeg' });
 */
export default function useProfileImageUploadMutation() {
  return useMutation<string, Error, { fileUri: string; contentType: UploadContentType }>({
    mutationFn: async ({ fileUri, contentType }) => {
      return ProfileAPI.profileImageUpload(fileUri, contentType);
    },
  });
}
