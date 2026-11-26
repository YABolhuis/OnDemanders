import { Lato_400Regular, Lato_700Bold } from '@expo-google-fonts/lato';
import { Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import {
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
  useFonts,
} from '@expo-google-fonts/outfit';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

import { LoadingScreen } from '@/components/LoadingScreen';
import { hasCompletedOnboarding } from '@/lib/onboarding';
import { SessionProvider, useSession } from '@/lib/session';
import { colors } from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <SessionProvider>
      <RootStack />
      <StatusBar style="light" />
    </SessionProvider>
  );
}

function RootStack() {
  const [fontsLoaded, fontError] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Lato_400Regular,
    Lato_700Bold,
  });
  const { session, loading: sessionLoading } = useSession();
  const [loaderDone, setLoaderDone] = useState(false);
  const fontsReady = fontsLoaded || !!fontError;
  const onboarded = hasCompletedOnboarding(session?.user);
  const home = !session ? '/welcome' : onboarded ? '/' : '/onboarding';

  // The native splash is a plain dark screen; hand over to the animated loader as soon as
  // its font can render.
  useEffect(() => {
    if (fontsReady) {
      SplashScreen.hide();
    }
  }, [fontsReady]);

  const finishLoader = useCallback(() => setLoaderDone(true), []);

  if (!fontsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      {!sessionLoading && (
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Protected guard={!session} redirectTo={home}>
            <Stack.Screen name="welcome" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="login" />
          </Stack.Protected>
          <Stack.Protected guard={!!session && !onboarded} redirectTo={home}>
            <Stack.Screen name="onboarding/index" />
            <Stack.Screen name="onboarding/work-type" />
          </Stack.Protected>
          <Stack.Protected guard={!!session && onboarded} redirectTo={home}>
            <Stack.Screen name="(tabs)" />
          </Stack.Protected>
          <Stack.Screen name="auth/callback" />
        </Stack>
      )}
      {!loaderDone && <LoadingScreen ready={!sessionLoading} onFinished={finishLoader} />}
    </View>
  );
}
