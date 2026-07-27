import React from 'react';
import { Alert, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import FlipCard from '@/shared/ui/FlipCard';
import UserProfileCardExample from './UserProfileCardExample';
import { EmptyProfileCard } from '../../../shared/ui';

export default function CardFlipAnimationExample() {
  const isFlipped = useSharedValue(false);

  return (
    <SafeAreaView style={styles.container}>
      <FlipCard
        isFlipped={isFlipped}
        cardStyle={styles.flipCard}
        front={<UserProfileCardExample />}
        back={<EmptyProfileCard
          text="새로운 프로필 카드를 추가하세요"
          onPress={() => Alert.alert('EmptyProfileCard', '프로필 생성으로 이동')}
        />}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.toggleButton} onPress={() => { isFlipped.value = !isFlipped.value; }}>
          <Text style={styles.toggleButtonText}>Toggle card</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCard: {
    width: 240,
    height: 320,
    backfaceVisibility: 'hidden',
  },
  card: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: '#001a72',
  },
  buttonContainer: {
    marginTop: 340,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: '#b58df1',
    padding: 12,
    borderRadius: 48,
  },
  toggleButtonText: {
    color: '#fff',
  },
});
