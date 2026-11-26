import { Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppHeader } from '@/components/AppHeader';
import { EmptyState } from '@/components/EmptyState';
import { OpenBriefcase } from '@/components/Illustrations';
import { colors, fonts } from '@/theme';

export default function AvailableTasksScreen() {
  return (
    <View style={styles.screen}>
      <AppHeader
        title="Available Tasks"
        actions={[
          { icon: 'bookmark-outline', label: 'Saved tasks' },
          { icon: 'search-outline', label: 'Search' },
        ]}
      />
      <View style={styles.filterBar}>
        <Pressable style={styles.filters} accessibilityRole="button" hitSlop={8}>
          <Ionicons name="options-outline" size={20} color={colors.primary} />
          <Text style={styles.filtersLabel}>Filters</Text>
        </Pressable>
        <Text style={styles.count}>Showing 0 tasks</Text>
      </View>
      <EmptyState
        illustration={<OpenBriefcase />}
        title="No Tasks Available"
        subtitle="Try adjusting your filters."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  filterBar: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filtersLabel: {
    marginLeft: 8,
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.primary,
  },
  count: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.muted,
  },
});
