import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

type Props = {
  illustration: ReactNode;
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function EmptyState({ illustration, title, subtitle, children }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>{illustration}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  circle: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colors.emptyCircle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 17,
    color: colors.ink,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 8,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.inkSoft,
    textAlign: 'center',
  },
});
