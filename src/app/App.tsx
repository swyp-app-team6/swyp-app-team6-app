import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import '../../global.css';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer, ParamListBase, useNavigation } from '@react-navigation/native';
import Config from 'react-native-config';
import StackRouter from '@/app/StackRouter';
import AppProviders from '@/app/providers/AppProviders';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();

/**
 * navigation 화면 타입
 */
export type HomeStackParamList = {
  Home: undefined;
  Detail: { id: string };
};

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Home'>;


/**
 * 홈화면
 * @param param0
 * @returns 
 */
function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Pressable
        onPress={() => {
          navigation.navigate('Detail', { id: '123' });
        }}
        className="bg-blue-500 px-6 py-3 rounded-lg"
      >
        <Text className="text-white text-lg font-bold">Detail로 이동</Text>
      </Pressable>
    </View>
  );
}

/**
 * 상세 화면
 * @param param0 
 * @returns 
 */
function DetailScreen() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View className="flex-1">
      <Pressable
        onPress={() => {
          navigation.navigate('Home');
        }}
        className="bg-gray-500 mx-5 mt-4 px-4 py-2 rounded-lg self-start"
      >
        <Text className="text-white font-bold">← 뒤로</Text>
      </Pressable>
      <AppContent />
    </View>
  );
}

function App() {
  return (
    <AppProviders>
      <StackRouter/>
      <Toast />
    </AppProviders>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [memo, setMemo] = useState('');

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      Alert.alert('입력 오류', '필수 항목을 모두 입력해주세요.');
      return;
    }
    Alert.alert(
      '주문 완료',
      `이름: ${name}\n이메일: ${email}\n연락처: ${phone}\n주소: ${address}\n메모: ${memo || '없음'
      }`,
    );
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setMemo('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
        ]}
      >
        <Text style={styles.title}>주문 테스트 폼</Text>

        <Text style={styles.label}>이름 *</Text>
        <TextInput
          style={styles.input}
          placeholder="이름을 입력하세요"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>이메일 *</Text>
        <TextInput
          style={styles.input}
          placeholder="이메일을 입력하세요"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>연락처 *</Text>
        <TextInput
          style={styles.input}
          placeholder="010-0000-0000"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>배달 주소 *</Text>
        <TextInput
          style={styles.input}
          placeholder="배달 받을 주소를 입력하세요"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>메모</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="요청 사항을 입력하세요"
          value={memo}
          onChangeText={setMemo}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>주문하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
          <Text style={styles.resetButtonText}>초기화</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: '#ff6347',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  resetButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

export default App;
