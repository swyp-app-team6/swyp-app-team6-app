import React from 'react';
import { Text, View } from 'react-native';
import { cn } from '@/shared/lib/cn';

interface StyleClass {
  root?: string;
  icon?: string;
  message?: string;
}

interface Props {
  message: string;
  icon?: React.ReactNode;
  styleClass?: StyleClass;
}

export function SearchFallbackView({ message, icon, styleClass }: Props) {
  return (
    <View className={cn('items-center justify-center', styleClass?.root)}>
      {icon && (
        <View className={cn('mb-2', styleClass?.icon)}>
          {icon}
        </View>
      )}
      <Text className={cn('text-gray-500', styleClass?.message)}>{message}</Text>
    </View>
  );
}
