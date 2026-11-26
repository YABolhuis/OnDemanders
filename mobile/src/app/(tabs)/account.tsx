import type { ComponentProps } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppHeader } from '@/components/AppHeader';
import { Button } from '@/components/Button';
import { countryFlag, countryName } from '@/lib/countries';
import { onboardingAnswers, WORK_TYPES } from '@/lib/onboarding';
import { useSession } from '@/lib/session';
import { type AccountMode, formatPrice, useTasks } from '@/lib/tasks';
import { supabase } from '@/lib/supabase';
import { colors, fonts } from '@/theme';

function signOut() {
  supabase.auth.signOut().then(({ error }) => {
    if (error) console.warn('Supabase sign-out failed', error);
  });
}

const MENU: { icon: ComponentProps<typeof Ionicons>['name']; label: string; onPress?: () => void }[] = [
  { icon: 'list-outline', label: 'Activity Log' },
  { icon: 'ribbon-outline', label: 'OnDemanders Pro' },
  { icon: 'documents-outline', label: 'Documents' },
  { icon: 'paper-plane-outline', label: 'Invite a Friend' },
  { icon: 'help-buoy-outline', label: 'Help & Support' },
  { icon: 'log-out-outline', label: 'Logout', onPress: signOut },
];

const MODES: { value: AccountMode; label: string; icon: ComponentProps<typeof Ionicons>['name'] }[] = [
  { value: 'freelancer', label: 'Freelancer', icon: 'construct-outline' },
  { value: 'client', label: 'Client', icon: 'briefcase-outline' },
];

export default function AccountScreen() {
  const { session } = useSession();
  const user = session?.user;
  const email = user?.email ?? '';
  const name =
    (user?.user_metadata?.full_name as string | undefined) ??
    (user?.user_metadata?.name as string | undefined) ??
    (email.split('@')[0] || 'My account');
  const initial = (email || name).charAt(0).toUpperCase();
  const { mode, balances, setMode } = useTasks();
  const { country, workType } = onboardingAnswers(user);
  const workSummary = [
    country && `${countryFlag(country)} ${countryName(country)}`,
    WORK_TYPES.find((option) => option.value === workType)?.title,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <View style={styles.screen}>
      <AppHeader title="My Account" actions={[{ icon: 'settings-outline', label: 'Settings' }]} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, styles.profile]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{initial}</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            {!!email && (
              <Text style={styles.email} numberOfLines={1}>
                {email}
              </Text>
            )}
            {!!workSummary && (
              <Text style={styles.email} numberOfLines={1}>
                {workSummary}
              </Text>
            )}
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Edit profile" hitSlop={8}>
            <Ionicons name="pencil" size={18} color={colors.ink} />
          </Pressable>
        </View>

        <View style={[styles.card, styles.modeCard]}>
          <View style={styles.modes} accessibilityRole="radiogroup">
            {MODES.map((option) => {
              const selected = option.value === mode;
              return (
                <Pressable
                  key={option.value}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  onPress={() => setMode(option.value)}
                  style={[styles.mode, selected && styles.modeSelected]}
                >
                  <Ionicons
                    name={option.icon}
                    size={17}
                    color={selected ? colors.primaryText : colors.inkSoft}
                  />
                  <Text style={[styles.modeText, selected && styles.modeTextSelected]}>
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[styles.card, styles.balance]}>
          <Text style={styles.balanceLabel}>
            Current Balance · {mode === 'client' ? 'Client' : 'Freelancer'}
          </Text>
          <Text style={styles.balanceValue}>{formatPrice(balances[mode])}</Text>
          <Button label={mode === 'client' ? 'Top up' : 'Payout'} style={styles.payout} />
          <Button label="Transaction History" variant="outline" style={styles.history} />
        </View>

        <View style={[styles.card, styles.limit]}>
          <Text style={styles.limitTitle}>
            Monthly limit: <Text style={styles.limitAmount}>€600</Text>
          </Text>
          <View style={styles.limitTrack} />
          <Text style={styles.limitLink}>Become a OnDemanders PRO to earn more →</Text>
        </View>

        <View style={styles.menu}>
          {MENU.map((item) => (
            <Pressable
              key={item.label}
              onPress={item.onPress}
              style={styles.menuRow}
              accessibilityRole="button"
            >
              <Ionicons name={item.icon} size={21} color={colors.ink} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.ink} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  content: {
    paddingBottom: 24,
  },
  card: {
    backgroundColor: colors.surface,
    marginBottom: 8,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    fontFamily: fonts.bodyBold,
    fontSize: 18,
    color: colors.primaryText,
  },
  profileText: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },
  email: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.inkSoft,
  },
  modeCard: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  modes: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 8,
    backgroundColor: colors.input,
  },
  mode: {
    flex: 1,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 6,
  },
  modeSelected: {
    backgroundColor: colors.primary,
  },
  modeText: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.inkSoft,
  },
  modeTextSelected: {
    color: colors.primaryText,
  },
  balance: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 18,
    paddingBottom: 20,
  },
  balanceLabel: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.inkSoft,
  },
  balanceValue: {
    marginTop: 4,
    fontFamily: fonts.title,
    fontSize: 21,
    color: colors.ink,
  },
  payout: {
    marginTop: 14,
  },
  history: {
    marginTop: 10,
  },
  limit: {
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 24,
    paddingBottom: 18,
  },
  limitTitle: {
    fontFamily: fonts.titleSemibold,
    fontSize: 14,
    color: colors.ink,
  },
  limitAmount: {
    color: colors.primary,
  },
  limitTrack: {
    alignSelf: 'stretch',
    height: 10,
    marginTop: 16,
    borderRadius: 5,
    backgroundColor: colors.primarySoft,
  },
  limitLink: {
    marginTop: 16,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.inkSoft,
  },
  menu: {
    backgroundColor: colors.surface,
  },
  menuRow: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    borderBottomWidth: 6,
    borderBottomColor: colors.screen,
  },
  menuLabel: {
    flex: 1,
    marginLeft: 14,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink,
  },
});
