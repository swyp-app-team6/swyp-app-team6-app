import { Button, Header, Layout, Modal } from '@/shared/ui';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RegisterFormView } from '@/features/register';

/**
 * # RegisterPage
 * ---
 * - 간단설명: 회원가입 화면 - 아이디/비밀번호/비밀번호 확인 입력, 완료 시 다이얼로그 후 갤러리로 이동
 * ---
 * @example
 * <RegisterPage />
 */
export default function RegisterPage() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSuccess = () => {
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    navigation.navigate('gallery');
  };

  return (
    <>
      <Header title="회원가입" />
      <Layout.Body styleClass={{ root: 'px-6 pt-20' }}>
        <RegisterFormView onSuccess={handleSuccess} />
        <View className='w-full flex flex-row justify-center mt-4'>
          <Button title='로그인으로 돌아가기' variant='ghost' onPress={() => navigation.goBack()} />
        </View>
      </Layout.Body>

      <Modal visible={modalVisible} title="회원가입 완료" onClose={handleConfirm}>
        <Text className='text-gray-600 mb-4'>회원가입이 완료되었습니다.</Text>
        <Button title='갤러리로 이동' onPress={handleConfirm} />
      </Modal>
    </>
  );
}
