import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

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

export function LogoMark() {
  return (
    <View style={styles.logo} accessibilityLabel="OnDemanders">
      <Text style={styles.logoLetter}>O</Text>
      <View style={styles.logoDot} />
    </View>
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
  logo: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoLetter: {
    color: colors.primaryText,
    fontFamily: fonts.bold,
    fontSize: 19,
    lineHeight: 22,
  },
  logoDot: {
    position: 'absolute',
    right: 4,
    bottom: 5,
    width: 4,
    height: 4,
    backgroundColor: colors.accent,
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
