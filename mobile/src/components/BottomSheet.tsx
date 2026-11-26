import { type ReactNode, useEffect, useState } from 'react';
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useKeyboardHeight } from '@/lib/keyboard';
import { colors } from '@/theme';

/** Just under half the screen, so the page above stays in view. */
const DEFAULT_HEIGHT = 0.45;

/**
 * A sheet that slides up from the bottom over a dimmed page. It is `height` (a fraction of the
 * screen) tall, or as tall as its content with `fit`. Tapping the dimmed page or Android's back
 * button calls `onClose`.
 */
export function BottomSheet({
  visible,
  onClose,
  height = DEFAULT_HEIGHT,
  fit,
  children,
}: {
  visible: boolean;
  onClose: () => void;
  height?: number;
  fit?: boolean;
  children: ReactNode;
}) {
  const { height: screenHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboardHeight();
  const [mounted, setMounted] = useState(visible);
  const [progress] = useState(() => new Animated.Value(0));

  if (visible && !mounted) setMounted(true);

  useEffect(() => {
    if (!mounted) return;
    Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: visible ? 280 : 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !visible) setMounted(false);
    });
  }, [visible, mounted, progress]);

  if (!mounted) return null;

  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [screenHeight, 0] });

  return (
    <Modal
      transparent
      visible
      statusBarTranslucent
      navigationBarTranslucent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View style={[styles.backdrop, { opacity: progress }]}>
        <Pressable style={StyleSheet.absoluteFill} accessibilityLabel="Close" onPress={onClose} />
      </Animated.View>
      <Animated.View
        style={[
          styles.sheet,
          fit ? { maxHeight: screenHeight * 0.9 } : { height: screenHeight * height + keyboard },
          {
            paddingBottom: Math.max(insets.bottom, keyboard) + 16,
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.handle} />
        {children}
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: colors.surface,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    marginTop: 10,
    marginBottom: 14,
    borderRadius: 2,
    backgroundColor: colors.line,
  },
});
