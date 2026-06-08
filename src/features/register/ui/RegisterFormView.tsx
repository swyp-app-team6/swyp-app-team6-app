import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input } from '@/shared/ui';
import useRegisterMutation from '../api/useRegisterMutation';

interface Props {
  /** 회원가입 성공 시 호출 */
  onSuccess: () => void;
}

/**
 * # RegisterFormView
 * ---
 * - 간단설명: 아이디/비밀번호/비밀번호 확인 입력 및 회원가입 요청 UI 컴포넌트
 * - 제약사항 및 특이사항: 성공 시 onSuccess 콜백 호출, 실제 유효성 검사는 추후 추가
 * ---
 * @param onSuccess 회원가입 성공 시 호출되는 콜백
 * @example
 * <RegisterFormView onSuccess={() => setModalVisible(true)} />
 */
export default function RegisterFormView({ onSuccess }: Props) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const { mutate, isPending } = useRegisterMutation();

  const handleSubmit = () => {
    mutate({ id, password }, { onSuccess });
  };

  return (
    <View className='gap-3'>
      <Input placeholder='아이디' value={id} onChangeText={setId} />
      <Input placeholder='비밀번호' secureTextEntry value={password} onChangeText={setPassword} />
      <Input placeholder='비밀번호 확인' secureTextEntry value={passwordConfirm} onChangeText={setPasswordConfirm} />
      <Button className='w-full' title='회원가입' loading={isPending} onPress={handleSubmit} />
    </View>
  );
}
