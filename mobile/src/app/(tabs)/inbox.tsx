import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { EmptyState } from '@/components/EmptyState';
import { ChatBubbles } from '@/components/Illustrations';
import { TopTabs } from '@/components/TopTabs';
import { type Task, taskById, useTasks } from '@/lib/tasks';
import { colors, fonts } from '@/theme';

type Tab = 'messages' | 'notifications';

function time(at: number) {
  return new Date(at).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
}

export default function InboxScreen() {
  const [tab, setTab] = useState<Tab>('messages');
  const { accepted, messages } = useTasks();
  const chats = accepted
    .map(taskById)
    .filter((task): task is Task => !!task)
    .map((task) => ({ task, last: messages[task.id]?.at(-1) }))
    .sort((a, b) => (b.last?.at ?? 0) - (a.last?.at ?? 0));

  return (
    <View style={styles.screen}>
      <AppHeader title="Inbox" />
      <TopTabs
        tabs={[
          { key: 'messages', label: 'Messages' },
          { key: 'notifications', label: 'Notifications' },
        ]}
        active={tab}
        onChange={setTab}
      />
      {tab === 'messages' ? (
        chats.length ? (
          <FlatList
            data={chats}
            keyExtractor={({ task }) => task.id}
            renderItem={({ item: { task, last } }) => (
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push({ pathname: '/chat/[id]', params: { id: task.id } })}
                style={({ pressed }) => [styles.row, pressed && styles.pressed]}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarLetter}>{task.client.charAt(0)}</Text>
                </View>
                <View style={styles.rowText}>
                  <View style={styles.rowTop}>
                    <Text style={styles.name} numberOfLines={1}>
                      {task.client}
                    </Text>
                    {last && <Text style={styles.time}>{time(last.at)}</Text>}
                  </View>
                  <Text style={styles.task} numberOfLines={1}>
                    {task.title}
                  </Text>
                  {last && (
                    <Text style={styles.preview} numberOfLines={1}>
                      {last.from === 'me' ? 'You: ' : ''}
                      {last.text}
                    </Text>
                  )}
                </View>
              </Pressable>
            )}
          />
        ) : (
          <EmptyState
            illustration={<ChatBubbles />}
            title="No messages yet"
            subtitle="Chat messages will show up here"
          />
        )
      ) : (
        <EmptyState
          illustration={<Ionicons name="notifications-outline" size={52} color={colors.inkSoft} />}
          title="No notifications yet"
          subtitle="Notifications will show up here"
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    backgroundColor: colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  pressed: {
    opacity: 0.8,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  avatarLetter: {
    fontFamily: fonts.bodyBold,
    fontSize: 18,
    color: colors.primaryText,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  name: {
    flex: 1,
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },
  time: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.muted,
  },
  task: {
    fontFamily: fonts.bodyBold,
    fontSize: 13,
    color: colors.primary,
  },
  preview: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.inkSoft,
  },
});
