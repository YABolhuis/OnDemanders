import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, useWindowDimensions, View } from 'react-native';

import { Wordmark } from '@/components/Wordmark';
import { colors } from '@/theme';

const MIN_VISIBLE_MS = 1200;

type Props = {
  /** True once everything the app needs before its first screen has loaded. */
  ready: boolean;
  onFinished: () => void;
};

export function LoadingScreen({ ready, onFinished }: Props) {
  const { width } = useWindowDimensions();
  const [progress] = useState(() => new Animated.Value(0));
  const [opacity] = useState(() => new Animated.Value(1));
  const [shownAt] = useState(() => Date.now());

  const trackWidth = Math.min(width * 0.23, 120);
  const wordmarkSize = Math.min(width * 0.067, 34);

  useEffect(() => {
    // Creep towards 90% while loading; the last stretch only runs once loading is done.
    Animated.timing(progress, {
      toValue: 0.9,
      duration: 4000,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAt));
    const timer = setTimeout(() => {
      progress.stopAnimation();
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }),
      ]).start(() => onFinished());
    }, wait);
    return () => clearTimeout(timer);
  }, [ready, onFinished, opacity, progress, shownAt]);

  return (
    <Animated.View style={[styles.container, { opacity }]} pointerEvents="none">
      <Wordmark size={wordmarkSize} />
      <View style={[styles.track, { width: trackWidth }]}>
        <Animated.View
          style={[
            styles.fill,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [trackWidth * 0.08, trackWidth],
              }),
            },
          ]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  track: {
    height: 3,
    marginTop: 38,
    borderRadius: 1.5,
    overflow: 'hidden',
    backgroundColor: colors.progressTrack,
  },
  fill: {
    height: '100%',
    borderRadius: 1.5,
    backgroundColor: colors.progressFill,
  },
});
