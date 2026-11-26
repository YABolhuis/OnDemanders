import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

import { supabase } from '@/lib/supabase';

/** Every auth message is shown in English with a Dutch line underneath. */
export type AuthMessage = { en: string; nl: string };

/** Supabase projects can demand more, but never less than this. */
export const MIN_PASSWORD_LENGTH = 8;

export const messages = {
  missingFields: {
    en: 'Please enter your email address and password.',
    nl: 'Vul je e-mailadres en wachtwoord in.',
  },
  missingSignUpFields: {
    en: 'Please enter your email address and password.',
    nl: 'Vul je e-mailadres en wachtwoord in.',
  },
  invalidCredentials: {
    en: 'The email address or password is incorrect.',
    nl: 'Het e-mailadres of wachtwoord is onjuist.',
  },
  emailNotConfirmed: {
    en: "Your email address hasn't been confirmed yet. Check your inbox.",
    nl: 'Je e-mailadres is nog niet bevestigd. Kijk in je inbox.',
  },
  rateLimited: {
    en: 'Too many attempts. Please wait a moment and try again.',
    nl: 'Te veel pogingen. Wacht even en probeer het opnieuw.',
  },
  invalidEmail: {
    en: "That doesn't look like a valid email address.",
    nl: 'Dit lijkt geen geldig e-mailadres te zijn.',
  },
  passwordTooShort: {
    en: `Your password needs at least ${MIN_PASSWORD_LENGTH} characters.`,
    nl: `Je wachtwoord heeft minstens ${MIN_PASSWORD_LENGTH} tekens nodig.`,
  },
  weakPassword: {
    en: 'Please pick a stronger password.',
    nl: 'Kies een sterker wachtwoord.',
  },
  emailTaken: {
    en: 'There is already an account with this email address. Try signing in instead.',
    nl: 'Er bestaat al een account met dit e-mailadres. Probeer in te loggen.',
  },
  signUpFailed: {
    en: 'Something went wrong while creating your account. Please try again.',
    nl: 'Er ging iets mis bij het aanmaken van je account. Probeer het opnieuw.',
  },
  unexpected: {
    en: 'Something went wrong while signing in. Please try again.',
    nl: 'Er ging iets mis bij het inloggen. Probeer het opnieuw.',
  },
  noConnection: {
    en: "Can't reach the server. Check your internet connection.",
    nl: 'Geen verbinding met de server. Controleer je internetverbinding.',
  },
  googleNotStarted: {
    en: "Google sign-in couldn't be started. Please try again.",
    nl: 'Google-inloggen kon niet worden gestart. Probeer het opnieuw.',
  },
  linkFailed: {
    en: "Signing in didn't complete. If you just confirmed your email address, log in with your email and password.",
    nl: 'Het inloggen is niet afgerond. Heb je net je e-mailadres bevestigd? Log dan in met je e-mailadres en wachtwoord.',
  },
} satisfies Record<string, AuthMessage>;

export function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Where Google and the confirmation mail return to: `ondemanders://auth/callback` in an installed
 * build, an `exp://…/--/auth/callback` URL in Expo Go. Supabase only redirects there when the URL
 * is on the project's Redirect URLs allow list; otherwise it falls back to the Site URL.
 */
export const authRedirectUrl = Linking.createURL('auth/callback');

function isNetworkError(error: { name?: string; status?: number }) {
  return error.name === 'AuthRetryableFetchError' || error.status === 0;
}

export async function signInWithEmail(
  email: string,
  password: string,
): Promise<AuthMessage | null> {
  if (!email || !password) return messages.missingFields;

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (!error) return null;

  if (error.code === 'invalid_credentials') return messages.invalidCredentials;
  if (error.code === 'email_not_confirmed') return messages.emailNotConfirmed;
  if (error.status === 429) return messages.rateLimited;
  if (isNetworkError(error)) return messages.noConnection;
  console.warn('Supabase sign-in failed', error);
  return messages.unexpected;
}

export type SignUpResult = { error: AuthMessage } | { confirmationSentTo: string };

export async function signUpWithEmail(
  email: string,
  password: string,
): Promise<SignUpResult> {
  if (!email || !password) return { error: messages.missingSignUpFields };
  if (!looksLikeEmail(email)) return { error: messages.invalidEmail };
  if (password.length < MIN_PASSWORD_LENGTH) return { error: messages.passwordTooShort };

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: authRedirectUrl },
  });

  if (error) {
    if (error.code === 'user_already_exists' || error.code === 'email_exists') {
      return { error: messages.emailTaken };
    }
    if (error.code === 'weak_password') return { error: messages.weakPassword };
    if (error.status === 429) return { error: messages.rateLimited };
    if (isNetworkError(error)) return { error: messages.noConnection };
    console.warn('Supabase sign-up failed', error);
    return { error: messages.signUpFailed };
  }

  // When the address already has an account Supabase succeeds without sending a new mail, so that
  // a stranger can't probe which emails are registered. The confirmation notice is shown either
  // way to keep that guarantee.
  return { confirmationSentTo: email };
}

/** Resolves to null once signed in or when the person closed the browser, else to a message. */
export async function signInWithGoogle(): Promise<AuthMessage | null> {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: authRedirectUrl,
      skipBrowserRedirect: true,
      // Google's account chooser every time, so a phone signed in to one Google account can still pick another.
      queryParams: { prompt: 'select_account' },
    },
  });

  if (error || !data.url) {
    console.warn('Google sign-in could not be started', error);
    return messages.googleNotStarted;
  }

  const result = await WebBrowser.openAuthSessionAsync(data.url, authRedirectUrl);
  if (result.type !== 'success') return null;

  return completeSignInFromUrl(result.url);
}

const exchanges = new Map<string, Promise<AuthMessage | null>>();

/**
 * Trades the code in a Google or confirmation-mail redirect for a session. On Android the same
 * redirect reaches both the browser session and the router, so each code is exchanged only once.
 */
export function completeSignInFromUrl(url: string): Promise<AuthMessage | null> {
  const params = redirectParams(url);
  const code = params.get('code');

  if (!code) {
    if (params.get('error')) {
      console.warn('Auth provider returned an error', {
        error: params.get('error'),
        code: params.get('error_code'),
        description: params.get('error_description'),
      });
    }
    return Promise.resolve(messages.linkFailed);
  }

  let exchange = exchanges.get(code);
  if (!exchange) {
    exchange = supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (!error) return null;
      console.warn('Supabase code exchange failed', error);
      return isNetworkError(error) ? messages.noConnection : messages.linkFailed;
    });
    exchanges.set(code, exchange);
  }
  return exchange;
}

/** Supabase puts the code in the query string, but errors can also arrive in the fragment. */
function redirectParams(url: string) {
  const params = new URLSearchParams();
  const [beforeHash, hash = ''] = url.split('#');
  const query = beforeHash.includes('?') ? beforeHash.slice(beforeHash.indexOf('?') + 1) : '';
  for (const part of [query, hash]) {
    new URLSearchParams(part).forEach((value, key) => params.set(key, value));
  }
  return params;
}
