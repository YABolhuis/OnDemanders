import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';
import { Clipboard } from '@/components/Illustrations';
import { TopTabs } from '@/components/TopTabs';
import { formatPrice, STEPS, type Task, taskById, useTasks, type Workflow } from '@/lib/tasks';
import { colors, fonts } from '@/theme';

type Tab = 'todo' | 'prebooked';

function stepLabel(workflow: Workflow | undefined) {
  const step = workflow?.step ?? 0;
  if (step >= STEPS.length + 1) return 'Payment requested';
  return `Next: ${STEPS[Math.max(step, 1) - 1]}`;
}

export default function MyTasksScreen() {
  const [tab, setTab] = useState<Tab>('todo');
  const { accepted, workflows } = useTasks();
  const tasks = accepted.map(taskById).filter((task): task is Task => !!task);

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
        tasks.length ? (
          <FlatList
            data={tasks}
            keyExtractor={(task) => task.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push({ pathname: '/chat/[id]', params: { id: item.id } })}
                style={({ pressed }) => [styles.row, pressed && styles.pressed]}
              >
                <View style={styles.thumb}>
                  <Ionicons name={item.icon} size={26} color={colors.primary} />
                </View>
                <View style={styles.rowText}>
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.meta} numberOfLines={1}>
                    {item.client} · {item.place}
                  </Text>
                  <Text style={styles.step}>{stepLabel(workflows[item.id])}</Text>
                </View>
                <View style={styles.rowEnd}>
                  <Text style={styles.price}>
                    {formatPrice(workflows[item.id]?.agreedPrice ?? item.price)}
                  </Text>
                  <Ionicons name="chatbubble-ellipses-outline" size={20} color={colors.inkSoft} />
                </View>
              </Pressable>
            )}
          />
        ) : (
          <EmptyState
            illustration={<Clipboard />}
            title="Your to-do list is empty"
            subtitle="Tasks you accept will show up here"
          >
            <Button
              label="Discover Tasks"
              onPress={() => router.navigate('/explore')}
              style={styles.button}
            />
          </EmptyState>
        )
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
  list: {
    paddingVertical: 8,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: colors.surface,
  },
  pressed: {
    opacity: 0.8,
  },
  thumb: {
    width: 52,
    height: 52,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  rowText: {
    flex: 1,
    gap: 3,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 16,
    color: colors.ink,
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.inkSoft,
  },
  step: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.primary,
  },
  rowEnd: {
    alignItems: 'flex-end',
    gap: 8,
  },
  price: {
    fontFamily: fonts.title,
    fontSize: 15,
    color: colors.price,
  },
});
