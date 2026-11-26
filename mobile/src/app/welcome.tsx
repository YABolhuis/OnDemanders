import { router } from 'expo-router';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppLogo } from '@/components/AppLogo';
import { OutlineButton, PrimaryButton } from '@/components/AuthForm';
import { Wordmark } from '@/components/Wordmark';
import { colors, fonts } from '@/theme';

const LOGO_SCREEN_FRACTION = 0.42;
const LOGO_MAX_SIZE = 220;

export default function WelcomeScreen() {
  const { width } = useWindowDimensions();
  const logoSize = Math.min(width * LOGO_SCREEN_FRACTION, LOGO_MAX_SIZE);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Wordmark size={18} />
        <View style={styles.hero}>
          <AppLogo size={logoSize} />
        </View>
        <Text style={styles.title} accessibilityRole="header">
          Work on demand
        </Text>
        <Text style={styles.subtitle}>
          Find tasks nearby, get them done and get paid. Or post your own and let others help.
        </Text>
        <PrimaryButton
          label="Log in"
          onPress={() => router.push('/login')}
          style={[styles.button, styles.logIn]}
        />
        <OutlineButton
          label="Sign up"
          light
          onPress={() => router.push('/signup')}
          style={[styles.button, styles.signUp]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.authBackground,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 40,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  title: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 40,
  },
  subtitle: {
    marginTop: 12,
    maxWidth: 330,
    color: colors.authTextSoft,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 24,
  },
  button: {
    height: 56,
  },
  logIn: {
    marginTop: 48,
  },
  signUp: {
    marginTop: 14,
  },
});
