import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '@/theme';

export type ChatAction = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

/**
 * A round button that floats above the message bar on the right. Pressing it turns its plus into a
 * cross and slides `actions` up from it; pressing anywhere else closes them again.
 */
export function ChatActions({ actions, bottom }: { actions: ChatAction[]; bottom: number }) {
  const [open, setOpen] = useState(false);
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.spring(progress, {
      toValue: open ? 1 : 0,
      useNativeDriver: true,
      speed: 22,
      bounciness: 4,
    }).start();
  }, [open, progress]);

  const rotate = progress.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });
  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [16, 0] });

  return (
    <>
      {open && (
        <Pressable
          style={StyleSheet.absoluteFill}
          accessibilityLabel="Close menu"
          onPress={() => setOpen(false)}
        />
      )}
      <View style={[styles.anchor, { bottom }]} pointerEvents="box-none">
        <Animated.View
          pointerEvents={open ? 'auto' : 'none'}
          style={[styles.menu, { opacity: progress, transform: [{ translateY }] }]}
          accessibilityElementsHidden={!open}
          importantForAccessibility={open ? 'auto' : 'no-hide-descendants'}
        >
          {actions.map((action) => (
            <Pressable
              key={action.label}
              accessibilityRole="menuitem"
              onPress={() => {
                setOpen(false);
                action.onPress();
              }}
              style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
            >
              <Ionicons name={action.icon} size={20} color={colors.primary} />
              <Text style={styles.itemLabel}>{action.label}</Text>
            </Pressable>
          ))}
        </Animated.View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={open ? 'Close menu' : 'Open menu'}
          accessibilityState={{ expanded: open }}
          onPress={() => setOpen(!open)}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          <Animated.View style={{ transform: [{ rotate }] }}>
            <Ionicons name="add" size={26} color={colors.primaryText} />
          </Animated.View>
        </Pressable>
      </View>
    </>
  );
}

const shadow = {
  shadowColor: '#000',
  shadowOpacity: 0.18,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
  elevation: 6,
};

const styles = StyleSheet.create({
  anchor: {
    position: 'absolute',
    right: 14,
    alignItems: 'flex-end',
    gap: 10,
  },
  menu: {
    minWidth: 220,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.surface,
    ...shadow,
  },
  item: {
    height: 48,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemPressed: {
    backgroundColor: colors.primarySoft,
  },
  itemLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },
  button: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    ...shadow,
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
