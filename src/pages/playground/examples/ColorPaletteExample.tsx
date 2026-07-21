import { Text, View } from 'react-native';
import Section from './Section';

/**
 * # ColorPaletteExample
 * ---
 * - 간단설명: 디자인 시스템 색상 토큰을 시각적으로 확인하는 컴포넌트
 * ---
 * @example
 * <ColorPaletteExample />
 */
export default function ColorPaletteExample() {
  return (
    <Section title="Color Palette — 디자인 시스템 색상 토큰">
      <Text className="mb-2 text-xs text-text-gray4">Title color (그레이스케일)</Text>
      <View className="flex-row flex-wrap gap-3 mb-4">
        {[
          { name: 'black', cls: 'bg-text-black', hex: '#1A1A1A' },
          { name: 'gray2', cls: 'bg-text-gray2', hex: '#1B1B1B' },
          { name: 'gray3', cls: 'bg-text-gray3', hex: '#40403F' },
          { name: 'gray4', cls: 'bg-text-gray4', hex: '#888888' },
          { name: 'gray5', cls: 'bg-text-gray5', hex: '#BFBFBF' },
          { name: 'gray6', cls: 'bg-text-gray6', hex: '#E3E3E3' },
          { name: 'gray7', cls: 'bg-text-gray7', hex: '#F5F5F5' },
        ].map(c => (
          <View key={c.name} className="items-center gap-1">
            <View className={`${c.cls} h-12 w-12 rounded-lg border border-text-gray6`} />
            <Text className="text-[10px] text-text-gray4">{c.name}</Text>
            <Text className="text-[9px] text-text-gray5">{c.hex}</Text>
          </View>
        ))}
      </View>

      <Text className="mb-2 text-xs text-text-gray4">Primary color (퍼플)</Text>
      <View className="flex-row flex-wrap gap-3 mb-4">
        {[
          { name: 'DEFAULT', cls: 'bg-primary', hex: '#8C39FB' },
          { name: 'light', cls: 'bg-primary-light', hex: '#EADCFF' },
          { name: 'lightest', cls: 'bg-primary-lightest', hex: '#F5EDFF' },
        ].map(c => (
          <View key={c.name} className="items-center gap-1">
            <View className={`${c.cls} h-12 w-12 rounded-lg border border-text-gray6`} />
            <Text className="text-[10px] text-text-gray4">{c.name}</Text>
            <Text className="text-[9px] text-text-gray5">{c.hex}</Text>
          </View>
        ))}
      </View>

      <Text className="mb-2 text-xs text-text-gray4">Secondary color (확정 아님)</Text>
      <View className="flex-row flex-wrap gap-3">
        {[
          { name: 'yellow', cls: 'bg-secondary-yellow', hex: '#FFCE07' },
          { name: 'pink', cls: 'bg-secondary-pink', hex: '#FF6CC2' },
        ].map(c => (
          <View key={c.name} className="items-center gap-1">
            <View className={`${c.cls} h-12 w-12 rounded-lg border border-text-gray6`} />
            <Text className="text-[10px] text-text-gray4">{c.name}</Text>
            <Text className="text-[9px] text-text-gray5">{c.hex}</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}
