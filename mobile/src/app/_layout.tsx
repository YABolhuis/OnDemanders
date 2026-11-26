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
  });
  const { loading: sessionLoading } = useSession();
  const [loaderDone, setLoaderDone] = useState(false);
  const fontsReady = fontsLoaded || !!fontError;

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
        />
      )}
      {!loaderDone && <LoadingScreen ready={!sessionLoading} onFinished={finishLoader} />}
    </View>
  );
}
