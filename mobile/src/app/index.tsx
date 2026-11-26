import { StyleSheet, View } from 'react-native';

import { Wordmark } from '@/components/Wordmark';
import { colors } from '@/theme';

export default function StartScreen() {
  return (
    <View style={styles.container}>
      <Wordmark />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
