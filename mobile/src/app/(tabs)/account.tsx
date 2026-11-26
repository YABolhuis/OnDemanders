import type { ComponentProps } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppHeader } from '@/components/AppHeader';
import { Button } from '@/components/Button';
import { useSession } from '@/lib/session';
import { colors, fonts } from '@/theme';

const FALLBACK_NAME = 'Yan Bolhuis';
const FALLBACK_EMAIL = 'bolhuisyan@gmail.com';

const MENU: { icon: ComponentProps<typeof Ionicons>['name']; label: string }[] = [
  { icon: 'list-outline', label: 'Activity Log' },
  { icon: 'ribbon-outline', label: 'OnDemanders Pro' },
  { icon: 'documents-outline', label: 'Documents' },
  { icon: 'paper-plane-outline', label: 'Invite a Friend' },
  { icon: 'help-buoy-outline', label: 'Help & Support' },
  { icon: 'log-out-outline', label: 'Logout' },
];

export default function AccountScreen() {
  const { session } = useSession();
  const user = session?.user;
  const name = (user?.user_metadata?.full_name as string | undefined) ?? FALLBACK_NAME;
  const email = user?.email ?? FALLBACK_EMAIL;

  return (
    <View style={styles.screen}>
      <AppHeader title="My Account" actions={[{ icon: 'settings-outline', label: 'Settings' }]} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, styles.profile]}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{name.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.name} numberOfLines={1}>
              {name}
            </Text>
            <Text style={styles.email} numberOfLines={1}>
              {email}
            </Text>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel="Edit profile" hitSlop={8}>
            <Ionicons name="pencil" size={18} color={colors.ink} />
          </Pressable>
        </View>

        <View style={[styles.card, styles.balance]}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <Text style={styles.balanceValue}>€ 0,00</Text>
          <Button label="Payout" style={styles.payout} />
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
            <Pressable key={item.label} style={styles.menuRow} accessibilityRole="button">
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
