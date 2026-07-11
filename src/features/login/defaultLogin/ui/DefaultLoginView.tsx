import React, { useState } from 'react';
import { Keyboard, Pressable, Text, View } from 'react-native';
import { Button, Input } from '@/shared/ui';
import { openErrorDialog } from '@/shared/ui/ErrorDialog';
import useDefaultLoginMutation from '../api/useDefaultLoginMutation';

/**
 * # DefaultLoginView
 * ---
 * - 간단설명: 안내받은 계정 기반 ID/비밀번호 로그인 UI
 * - 제약사항 및 특이사항:
 *   - 운영팀에서 안내받은 계정만 로그인 가능
 *   - 아이디/비밀번호 미입력 시 로그인 버튼 비활성
 *   - 로그인 실패 시 에러 팝업 표시
 * ---
 * @param onLoginSuccess 로그인 성공 시 콜백
 * ---
 * @example
 * <DefaultLoginView onLoginSuccess={() => navigate('home')} />
 */
interface Props {
  /** 로그인 성공 시 호출되는 콜백 */
  onLoginSuccess?: () => void;
}

export default function DefaultLoginView({ onLoginSuccess }: Props) {
  const { mutate, isPending } = useDefaultLoginMutation();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const isFormValid = userId.trim().length > 0 && password.trim().length > 0;

  const handleLogin = () => {
    mutate(
      { email: userId, password },
      {
        onSuccess: () => {
          onLoginSuccess?.();
        },
        onError: () => {
          openErrorDialog({
            title: "안내받은 계정이 아닙니다",
            message: '사용할 수 없는 계정입니다. 아이디와 비밀번호를\n 다시 확인해주시기 바랍니다.',
            buttonLabel: '다시 시도하기',
          });
        },
      },
    );
  };

  return (
    <Pressable className="flex-1" onPress={Keyboard.dismiss}>
      {/* 안내 문구 */}
      <View className="px-5 pt-6 pb-8">
        <Text className="text-sm text-black text-center leading-5">
          {'운영팀의 안내를 받은 계정만 사용할 수 있습니다.\n새 계정 생성은 지원하지 않습니다.'}
        </Text>
      </View>

      {/* 입력 필드 */}
      <View className="px-5 gap-7">
        <Input
          label="아이디"
          placeholder="안내받은 아이디를 입력해주세요."
          value={userId}
          onChangeText={setUserId}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Input
          label="비밀번호"
          placeholder="안내받은 비밀번호를 입력해주세요."
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      {/* 로그인 버튼 */}
      <View className="px-5 pt-16">
        <Button
          title="로그인"
          onPress={handleLogin}
          loading={isPending}
          disabled={!isFormValid}
          variant={isFormValid ? 'primary' : 'secondary'}
        />
      </View>

    </Pressable>
  );
}
