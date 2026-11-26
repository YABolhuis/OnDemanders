import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { FormMessage, PrimaryButton } from '@/components/AuthForm';
import { OnboardingScreen } from '@/components/Onboarding';
import type { AuthMessage } from '@/lib/auth';
import { COUNTRIES } from '@/lib/countries';
import { completeOnboarding, onboardingAnswers, WORK_TYPES, type WorkType } from '@/lib/onboarding';
import { useSession } from '@/lib/session';
import { colors, fonts } from '@/theme';

const ICONS: Record<WorkType, keyof typeof Ionicons.glyphMap> = {
  everyday: 'hammer-outline',
  professional: 'ribbon-outline',
};

export default function WorkTypeStep() {
  const { country } = useLocalSearchParams<{ country?: string }>();
  const { session } = useSession();
  const [workType, setWorkType] = useState<WorkType | undefined>(
    () => onboardingAnswers(session?.user).workType,
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<AuthMessage | null>(null);

  if (!country || !COUNTRIES.some((entry) => entry.code === country)) {
    return <Redirect href="/onboarding" />;
  }

  async function finish() {
    if (!country || !workType) return;
    setSaving(true);
    setMessage(null);
    const error = await completeOnboarding(country, workType);
    // On success the app leaves onboarding by itself, so only a failure needs handling here.
    if (error) {
      setMessage(error);
      setSaving(false);
    }
  }

  return (
    <OnboardingScreen
      step={2}
      steps={2}
      title="How do you want to work?"
      subtitle="Choose the one that fits you best."
      onBack={() => (router.canGoBack() ? router.back() : router.replace('/onboarding'))}
      footer={
        <>
          <FormMessage message={message} />
          <PrimaryButton
            label="Continue"
            onPress={finish}
            busy={saving}
            disabled={!workType || saving}
          />
        </>
      }
    >
      <ScrollView contentContainerStyle={styles.options} accessibilityRole="radiogroup">
        {WORK_TYPES.map((option) => {
          const selected = option.value === workType;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ checked: selected, disabled: saving }}
              accessibilityLabel={option.title}
              accessibilityHint={option.description}
              disabled={saving}
              onPress={() => setWorkType(option.value)}
              style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                pressed && styles.optionPressed,
              ]}
            >
              <View style={[styles.icon, selected && styles.iconSelected]}>
                <Ionicons
                  name={ICONS[option.value]}
                  size={24}
                  color={selected ? colors.accent : colors.authTextSoft}
                />
              </View>
              <View style={styles.optionText}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <View style={[styles.radio, selected && styles.radioSelected]}>
                {selected && <View style={styles.radioDot} />}
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  options: {
    paddingHorizontal: 32,
    gap: 14,
  },
  option: {
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.authInputBorder,
  },
  optionSelected: {
    borderColor: colors.accent,
    backgroundColor: 'rgba(2, 249, 34, 0.06)',
  },
  optionPressed: {
    opacity: 0.8,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  iconSelected: {
    backgroundColor: 'rgba(2, 249, 34, 0.12)',
  },
  optionText: {
    flex: 1,
    gap: 4,
  },
  optionTitle: {
    color: colors.text,
    fontFamily: fonts.semibold,
    fontSize: 17,
  },
  optionDescription: {
    color: colors.authTextSoft,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.authTextMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: colors.accent,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
});
