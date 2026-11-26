import { StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

export function Wordmark({ size = 26 }: { size?: number }) {
  const dot = Math.round(size * 0.2);

  return (
    <View style={styles.row} accessible accessibilityRole="header" accessibilityLabel="OnDemanders">
      <Text style={[styles.text, { fontSize: size, lineHeight: size * 1.2, letterSpacing: size * -0.03 }]}>
        OnDemanders
      </Text>
      {/* The brand's full stop is a square, which no font's period matches. */}
      <View
        style={{
          width: dot,
          height: dot,
          marginLeft: size * 0.06,
          marginBottom: size * 0.26,
          backgroundColor: colors.accent,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  text: {
    color: colors.text,
    fontFamily: fonts.bold,
  },
});
