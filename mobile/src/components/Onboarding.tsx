import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChevronLeftIcon } from '@/components/AuthIcons';
import { colors, fonts } from '@/theme';

/**
 * An onboarding step: progress along the top, a title, the step's content filling the middle and
 * `footer` (its continue button) at the bottom.
 */
export function OnboardingScreen({
  step,
  steps,
  title,
  subtitle,
  onBack,
  action,
  footer,
  children,
}: {
  step: number;
  steps: number;
  title: string;
  subtitle: string;
  onBack?: () => void;
  action?: { label: string; onPress: () => void };
  footer: ReactNode;
  children: ReactNode;
}) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.bar}>
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            hitSlop={8}
            onPress={onBack}
            style={({ pressed }) => [styles.back, pressed && styles.pressed]}
          >
            <ChevronLeftIcon color={colors.text} />
          </Pressable>
        ) : (
          <View style={styles.back} />
        )}
        {action && (
          <Pressable accessibilityRole="button" hitSlop={8} onPress={action.onPress}>
            {({ pressed }) => (
              <Text style={[styles.action, pressed && styles.pressed]}>{action.label}</Text>
            )}
          </Pressable>
        )}
      </View>

      <View style={styles.header}>
        <View
          style={styles.progress}
          accessibilityRole="progressbar"
          accessibilityLabel={`Step ${step} of ${steps}`}
        >
          {Array.from({ length: steps }, (_, index) => (
            <View
              key={index}
              style={[styles.progressStep, index < step && styles.progressStepDone]}
            />
          ))}
        </View>
        <Text style={styles.stepLabel}>
          Step {step} of {steps}
        </Text>
        <Text style={styles.title} accessibilityRole="header">
          {title}
        </Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.body}>{children}</View>
      <View style={styles.footer}>{footer}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.authBackground,
  },
  bar: {
    height: 44,
    marginTop: 8,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    color: colors.authTextSoft,
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  pressed: {
    opacity: 0.7,
  },
  header: {
    paddingHorizontal: 32,
    paddingTop: 8,
  },
  progress: {
    flexDirection: 'row',
    gap: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.progressTrack,
  },
  progressStepDone: {
    backgroundColor: colors.accent,
  },
  stepLabel: {
    marginTop: 20,
    color: colors.authTextMuted,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  title: {
    marginTop: 6,
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 30,
    lineHeight: 38,
  },
  subtitle: {
    marginTop: 10,
    color: colors.authTextSoft,
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  body: {
    flex: 1,
    marginTop: 24,
  },
  footer: {
    paddingHorizontal: 32,
    paddingTop: 12,
    paddingBottom: 24,
    gap: 14,
  },
});
