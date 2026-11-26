import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { STEPS } from '@/lib/tasks';
import { colors, fonts } from '@/theme';

/**
 * A round button floating above the message bar on the left. Pressing it turns its plus into a
 * cross and slides up the task's steps as dots on a line rising from it: the first step at the
 * bottom, the last at the top. Steps that have been started light up green; the next one can be
 * opened, later ones not yet.
 */
export function WorkflowMenu({
  step,
  bottom,
  onSelect,
}: {
  /** The furthest step started, as in `Workflow.step`. */
  step: number;
  bottom: number;
  /** Called with 1, 2 or 3. */
  onSelect: (step: number) => void;
}) {
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
  const reachable = Math.max(step, 1);

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
          {STEPS.map((label, index) => ({ label, number: index + 1 }))
            .reverse()
            .map(({ label, number }) => {
              const lit = number <= step;
              const enabled = number <= reachable;
              return (
                <Pressable
                  key={label}
                  accessibilityRole="menuitem"
                  accessibilityLabel={`Step ${number}: ${label}`}
                  accessibilityState={{ disabled: !enabled, checked: lit }}
                  disabled={!enabled}
                  onPress={() => {
                    setOpen(false);
                    onSelect(number);
                  }}
                  style={({ pressed }) => [styles.step, pressed && styles.stepPressed]}
                >
                  <View style={styles.track}>
                    <View style={[styles.dot, lit && styles.dotLit, !enabled && styles.dotLocked]} />
                    <View style={[styles.line, lit && styles.lineLit]} />
                  </View>
                  <Text
                    style={[styles.label, lit && styles.labelLit, !enabled && styles.labelLocked]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
        </Animated.View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={open ? 'Close task steps' : 'Open task steps'}
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

const DOT = 14;
const STEP_HEIGHT = 52;
const BUTTON = 48;

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
    left: 14,
    alignItems: 'flex-start',
  },
  menu: {
    minWidth: 240,
    paddingTop: 10,
    paddingRight: 18,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: colors.surface,
    ...shadow,
  },
  step: {
    height: STEP_HEIGHT,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepPressed: {
    backgroundColor: colors.primarySoft,
  },
  // Centred over the round button below, so the line rises out of it.
  track: {
    width: BUTTON,
    height: STEP_HEIGHT,
    alignItems: 'center',
    paddingTop: 4,
  },
  dot: {
    width: DOT,
    height: DOT,
    borderRadius: DOT / 2,
    borderWidth: 2,
    borderColor: colors.muted,
    backgroundColor: colors.surface,
  },
  dotLit: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  dotLocked: {
    borderColor: colors.line,
  },
  line: {
    flex: 1,
    width: 3,
    marginTop: 2,
    borderRadius: 1.5,
    backgroundColor: colors.line,
  },
  lineLit: {
    backgroundColor: colors.primary,
  },
  label: {
    marginTop: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.inkSoft,
  },
  labelLit: {
    color: colors.primary,
  },
  labelLocked: {
    color: colors.muted,
  },
  button: {
    width: BUTTON,
    height: BUTTON,
    borderRadius: BUTTON / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    ...shadow,
  },
  buttonPressed: {
    opacity: 0.85,
  },
});
