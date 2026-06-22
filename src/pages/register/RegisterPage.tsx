import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button, Header, Layout } from '@/shared/ui';
import { RegisterFormView } from '@/features/register';
import type { NavigationPropType } from '@/shared/types';

/**
 * # RegisterPage
 * ---
 * - 간단설명: 회원가입 화면 - 닉네임 + 프로필 사진 등록
 * - 제약사항 및 특이사항:
 *   - 소셜 로그인 후 추가 정보 입력 화면으로 사용
 *   - 완료 시 메인(프로필) 화면으로 이동
 * ---
 * @example
 * <RegisterPage />
 */
export default function RegisterPage() {
  const navigation = useNavigation<NavigationPropType>();

  const handleSuccess = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'profile' }],
    });
  };

  return (
    <>
      <Header title="회원가입" showBack />
      <Layout.Body styleClass={{ root: 'px-6 pt-10' }}>
        <RegisterFormView onSuccess={handleSuccess} />
        <View className="w-full flex flex-row justify-center mt-4">
          <Button
            title="로그인으로 돌아가기"
            variant="ghost"
            onPress={() => navigation.goBack()}
          />
        </View>
      </Layout.Body>
    </>
  );
}
