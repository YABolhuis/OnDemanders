import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import Svg, { Circle, Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { colors, fonts } from '@/theme';

type Action = {
  icon: ComponentProps<typeof Ionicons>['name'];
  label: string;
  onPress?: () => void;
};

export function AppHeader({ title, actions = [] }: { title: string; actions?: Action[] }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.bar, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        <LogoMark />
        <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.actions}>
          {actions.map((action) => (
            <Pressable
              key={action.label}
              onPress={action.onPress}
              accessibilityRole="button"
              accessibilityLabel={action.label}
              hitSlop={8}
              style={styles.action}
            >
              <Ionicons name={action.icon} size={23} color={colors.headerText} />
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}

/** Same geometry as assets/brand/logo.svg. */
export function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 1024 1024" accessibilityLabel="OnDemanders">
      <Defs>
        <LinearGradient id="logoBg" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#1B1C1B" />
          <Stop offset="1" stopColor="#0D0E0D" />
        </LinearGradient>
      </Defs>
      {/* The faint rim keeps the tile visible on the equally dark header. */}
      <Rect
        x={16}
        y={16}
        width={992}
        height={992}
        rx={214}
        fill="url(#logoBg)"
        stroke="#FFFFFF"
        strokeOpacity={0.18}
        strokeWidth={32}
      />
      <Circle cx={492} cy={500} r={186} fill="none" stroke="#FFFFFF" strokeWidth={96} />
      <Rect x={719} y={622} width={92} height={92} fill={colors.accent} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: colors.header,
  },
  row: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  title: {
    flex: 1,
    marginLeft: 14,
    color: colors.headerText,
    fontFamily: fonts.title,
    fontSize: 19,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  action: {
    marginLeft: 16,
  },
});
