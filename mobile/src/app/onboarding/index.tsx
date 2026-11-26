import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { PrimaryButton } from '@/components/AuthForm';
import { CheckIcon, SearchIcon } from '@/components/AuthIcons';
import { OnboardingScreen } from '@/components/Onboarding';
import { COUNTRIES, type Country, countryFlag } from '@/lib/countries';
import { onboardingAnswers } from '@/lib/onboarding';
import { useSession } from '@/lib/session';
import { supabase } from '@/lib/supabase';
import { colors, fonts } from '@/theme';

/** Lowercase without accents, so "cote" finds Côte d'Ivoire. */
function searchable(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const SEARCH_INDEX = COUNTRIES.map((country) => ({ country, key: searchable(country.name) }));

export default function CountryStep() {
  const { session } = useSession();
  const [country, setCountry] = useState<string | undefined>(
    () => onboardingAnswers(session?.user).country,
  );
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const needle = searchable(query.trim());
    if (!needle) return COUNTRIES;
    return SEARCH_INDEX.filter(({ key }) => key.includes(needle)).map((entry) => entry.country);
  }, [query]);

  function choose(code: string) {
    Keyboard.dismiss();
    setCountry(code);
  }

  return (
    <OnboardingScreen
      step={1}
      steps={2}
      title="Where do you work?"
      subtitle="Choose the country you work from, so we can show you tasks there."
      action={{ label: 'Log out', onPress: () => supabase.auth.signOut() }}
      footer={
        <PrimaryButton
          label="Continue"
          disabled={!country}
          onPress={() =>
            country &&
            router.push({ pathname: '/onboarding/work-type', params: { country } })
          }
        />
      }
    >
      <View style={styles.search}>
        <SearchIcon color={colors.authTextMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search country"
          placeholderTextColor={colors.authTextMuted}
          selectionColor={colors.accent}
          cursorColor={colors.text}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
          style={styles.searchInput}
          accessibilityLabel="Search country"
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.code}
        renderItem={({ item }) => (
          <CountryRow
            country={item}
            selected={item.code === country}
            onPress={() => choose(item.code)}
          />
        )}
        extraData={country}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        initialNumToRender={20}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No country matches “{query.trim()}”.</Text>}
      />
    </OnboardingScreen>
  );
}

function CountryRow({
  country,
  selected,
  onPress,
}: {
  country: Country;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={country.name}
      onPress={onPress}
      style={({ pressed }) => [styles.row, selected && styles.rowSelected, pressed && styles.rowPressed]}
    >
      <Text style={styles.flag}>{countryFlag(country.code)}</Text>
      <Text style={[styles.name, selected && styles.nameSelected]} numberOfLines={1}>
        {country.name}
      </Text>
      {selected && <CheckIcon color={colors.accent} size={20} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  search: {
    height: 48,
    marginHorizontal: 32,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.authInputBorder,
  },
  searchInput: {
    flex: 1,
    height: 48,
    paddingVertical: 0,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
  },
  row: {
    height: 52,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 8,
  },
  rowSelected: {
    backgroundColor: 'rgba(2, 249, 34, 0.08)',
  },
  rowPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  flag: {
    fontSize: 22,
  },
  name: {
    flex: 1,
    color: colors.authTextSoft,
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  nameSelected: {
    color: colors.text,
    fontFamily: fonts.semibold,
  },
  empty: {
    marginTop: 24,
    textAlign: 'center',
    color: colors.authTextMuted,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
});
