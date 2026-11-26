import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, fonts } from '@/theme';

export default function StartScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>OnDemanders</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: 28,
    fontWeight: '600',
    color: colors.text,
  },
});
