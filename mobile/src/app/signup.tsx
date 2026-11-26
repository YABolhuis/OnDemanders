import { router } from 'expo-router';
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
  MIN_PASSWORD_LENGTH,
  signInWithGoogle,
  signUpWithEmail,
} from '@/lib/auth';
import { colors, fonts } from '@/theme';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState<'google' | 'email' | null>(null);
  const [message, setMessage] = useState<AuthMessage | null>(null);
  const [confirmationSentTo, setConfirmationSentTo] = useState<string | null>(null);
  const passwordRef = useRef<TextInputInstance>(null);

  async function continueWithGoogle() {
    setBusy('google');
    setMessage(null);
    setMessage(await signInWithGoogle());
    setBusy(null);
  }

  async function signUp() {
    setBusy('email');
    setMessage(null);
    const result = await signUpWithEmail(email.trim(), password);
    setBusy(null);
    if ('error' in result) {
      setMessage(result.error);
    } else {
      setConfirmationSentTo(result.confirmationSentTo);
    }
  }

  if (confirmationSentTo) {
    return <ConfirmationNotice email={confirmationSentTo} />;
  }

  return (
    <AuthScreen top={<AuthTitle>{'Create\nAccount'}</AuthTitle>}>
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
          accessibilityHint={`At least ${MIN_PASSWORD_LENGTH} characters`}
          value={password}
          onChangeText={setPassword}
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="go"
          onSubmitEditing={signUp}
        />
      </View>

      {message && (
        <View style={styles.message}>
          <FormMessage message={message} />
        </View>
      )}
      <PrimaryButton
        label="Sign up"
        onPress={signUp}
        busy={busy === 'email'}
        disabled={busy !== null}
        style={styles.signUp}
      />
      <OrDivider />
      <GoogleButton
        onPress={continueWithGoogle}
        busy={busy === 'google'}
        disabled={busy !== null}
      />
      <OutlineButton
        label="Log in"
        onPress={() => router.replace('/login')}
        style={styles.switch}
      />
    </AuthScreen>
  );
}

function ConfirmationNotice({ email }: { email: string }) {
  return (
    <AuthScreen
      top={
        <>
          <AuthTitle>{'Check your\nemail'}</AuthTitle>
          <Text style={styles.body}>
            We sent a confirmation link to <Text style={styles.emphasis}>{email}</Text>. Open it on
            this phone to activate your account and sign in.
          </Text>
          <Text style={styles.translation}>
            We hebben een bevestigingslink naar dit e-mailadres gestuurd. Open die link op deze
            telefoon om je account te activeren en in te loggen.
          </Text>
          <Text style={styles.hint}>
            Nothing in your inbox after a few minutes? Check your spam folder.
          </Text>
        </>
      }
    >
      <PrimaryButton label="Go to log in" onPress={() => router.replace('/login')} />
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  fields: {
    gap: 20,
  },
  message: {
    marginTop: 16,
  },
  signUp: {
    marginTop: 32,
  },
  switch: {
    marginTop: 12,
  },
  body: {
    marginTop: 24,
    color: colors.authTextSoft,
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 24,
  },
  emphasis: {
    color: colors.text,
    fontFamily: fonts.bold,
  },
  translation: {
    marginTop: 8,
    color: colors.authTextMuted,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
  },
  hint: {
    marginTop: 24,
    color: colors.authTextMuted,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
});
