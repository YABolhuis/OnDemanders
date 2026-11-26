import { router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { StyleSheet, Text, type TextInputInstance, View } from 'react-native';

import {
  AuthScreen,
  AuthTitle,
  FormMessage,
  GoogleButton,
  LineField,
  OrDivider,
  OutlineButton,
  PrimaryButton,
} from '@/components/AuthForm';
import {
  type AuthMessage,
  looksLikeEmail,
  messages,
  signInWithEmail,
  signInWithGoogle,
} from '@/lib/auth';
import { colors, fonts } from '@/theme';

export default function LogInScreen() {
  const { notice } = useLocalSearchParams<{ notice?: string }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState<'google' | 'email' | null>(null);
  const [message, setMessage] = useState<AuthMessage | null>(
    notice === 'link_failed' ? messages.linkFailed : null,
  );
  const passwordRef = useRef<TextInputInstance>(null);

  async function continueWithGoogle() {
    setBusy('google');
    setMessage(null);
    setMessage(await signInWithGoogle());
    setBusy(null);
  }

  async function logIn() {
    setBusy('email');
    setMessage(null);
    setMessage(await signInWithEmail(email.trim(), password));
    setBusy(null);
  }

  return (
    <AuthScreen top={<AuthTitle>{'Welcome\nBack'}</AuthTitle>}>
      <View style={styles.fields}>
        <LineField
          icon="mail"
          valid={looksLikeEmail(email.trim())}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <LineField
          ref={passwordRef}
          icon="lock"
          password
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          autoComplete="current-password"
          textContentType="password"
          returnKeyType="go"
          onSubmitEditing={logIn}
        />
      </View>

      <Text style={styles.forgot} accessibilityRole="link">
        Forgot password?
      </Text>

      {message && (
        <View style={styles.message}>
          <FormMessage message={message} />
        </View>
      )}
      <PrimaryButton
        label="Log in"
        onPress={logIn}
        busy={busy === 'email'}
        disabled={busy !== null}
        style={styles.logIn}
      />
      <OrDivider />
      <GoogleButton
        onPress={continueWithGoogle}
        busy={busy === 'google'}
        disabled={busy !== null}
      />
      <OutlineButton
        label="Sign up"
        onPress={() => router.replace('/signup')}
        style={styles.switch}
      />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: 20,
  },
  forgot: {
    marginTop: 14,
    alignSelf: 'flex-end',
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 15,
    lineHeight: 20,
  },
  message: {
    marginTop: 16,
  },
  logIn: {
    marginTop: 24,
  },
  switch: {
    marginTop: 12,
  },
});
