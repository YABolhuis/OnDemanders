import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { completeSignInFromUrl } from '@/lib/auth';
import { colors } from '@/theme';

/** Lands the confirmation mail's link and, on Android, the return trip from Google sign-in. */
export default function AuthCallbackScreen() {
  const url = Linking.useLinkingURL();

  useEffect(() => {
    if (!url) return;

    let cancelled = false;
    completeSignInFromUrl(url).then((error) => {
      if (cancelled) return;
      if (error) {
        router.replace({ pathname: '/login', params: { notice: 'link_failed' } });
      } else {
        router.replace('/');
      }
    });
    return () => {
      cancelled = true;
    };
  }, [url]);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.text} size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.authBackground,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
