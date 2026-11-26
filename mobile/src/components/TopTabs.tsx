import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

type Props<T extends string> = {
  tabs: { key: T; label: string }[];
  active: T;
  onChange: (key: T) => void;
};

export function TopTabs<T extends string>({ tabs, active, onChange }: Props<T>) {
  return (
    <View style={styles.bar} accessibilityRole="tablist">
      {tabs.map((tab) => {
        const selected = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            style={styles.tab}
            onPress={() => onChange(tab.key)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
          >
            <Text style={[styles.label, selected && styles.labelActive]}>{tab.label}</Text>
            <View style={[styles.underline, selected && styles.underlineActive]} />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
  },
  label: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.muted,
    paddingBottom: 13,
  },
  labelActive: {
    color: colors.ink,
  },
  underline: {
    alignSelf: 'stretch',
    height: 3,
    borderRadius: 1.5,
  },
  underlineActive: {
    backgroundColor: colors.primary,
  },
});
