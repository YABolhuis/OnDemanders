import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { Clipboard } from '@/components/Illustrations';
import { TopTabs } from '@/components/TopTabs';
import { colors } from '@/theme';

type Tab = 'todo' | 'prebooked';

export default function MyTasksScreen() {
  const [tab, setTab] = useState<Tab>('todo');

  return (
    <View style={styles.screen}>
      <AppHeader title="My tasks" actions={[{ icon: 'search-outline', label: 'Search' }]} />
      <TopTabs
        tabs={[
          { key: 'todo', label: 'To-do list' },
          { key: 'prebooked', label: 'Pre-booked' },
        ]}
        active={tab}
        onChange={setTab}
      />
      {tab === 'todo' ? (
        <EmptyState
          illustration={<Clipboard />}
          title="Your to-do list is empty"
          subtitle="Tasks you accept will show up here"
        >
          <Button
            label="Discover Tasks"
            onPress={() => router.navigate('/')}
            style={styles.button}
          />
        </EmptyState>
      ) : (
        <EmptyState
          illustration={<Clipboard />}
          title="No pre-booked tasks"
          subtitle="Tasks you pre-book will show up here"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  button: {
    marginTop: 22,
  },
});
