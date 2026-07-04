import { useMutation } from '@tanstack/react-query';
import { ProfileAPI, type UploadContentType, type PresignResponse } from '@/entities/user';

/**
 * # useProfileImageUploadMutation
 * ---
 * - 간단설명: 프로필 이미지 presigned URL 발급 mutation 훅
 * - 제약사항 및 특이사항:
 *   - ProfileAPI.profileImageUpload 호출하여 uploadUrl, imageKey를 반환
 *   - TODO: uploadUrl, imageKey 사용해 실제 업로드 구현예정
 * ---
 * @example
 * const { mutate, isPending } = useProfileImageUploadMutation();
 * mutate('image/jpeg', { onSuccess: ({ uploadUrl, imageKey }) => ... });
 */
export default function useProfileImageUploadMutation() {
  return useMutation<PresignResponse, Error, UploadContentType>({
    mutationFn: async (contentType) => {
      const { data } = await ProfileAPI.profileImageUpload(contentType);
      return data;
    },
  });
}
