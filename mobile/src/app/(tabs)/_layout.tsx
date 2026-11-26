import type { ComponentProps } from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useTasks } from '@/lib/tasks';
import { colors } from '@/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

function tabIcon(outline: IconName, filled: IconName) {
  return function TabIcon({ focused }: { focused: boolean }) {
    return (
      <Ionicons
        name={focused ? filled : outline}
        size={24}
        color={focused ? colors.tabIconActive : colors.tabIcon}
      />
    );
  };
}

export default function TabsLayout() {
  const client = useTasks().mode === 'client';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.line,
        },
        sceneStyle: { backgroundColor: colors.screen },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Available Tasks', tabBarIcon: tabIcon('briefcase-outline', 'briefcase') }}
      />
      <Tabs.Screen
        name="explore"
        options={{ title: 'Explore', tabBarIcon: tabIcon('location-outline', 'location') }}
      />
      {/* The middle tab depends on the account mode chosen on My Account. */}
      <Tabs.Screen
        name="my-tasks"
        options={{
          title: 'My tasks',
          href: client ? null : undefined,
          tabBarIcon: tabIcon('checkmark-circle-outline', 'checkmark-circle'),
        }}
      />
      <Tabs.Screen
        name="post-task"
        options={{
          title: 'Post a task',
          href: client ? undefined : null,
          tabBarIcon: tabIcon('add-circle-outline', 'add-circle'),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{ title: 'Inbox', tabBarIcon: tabIcon('chatbox-outline', 'chatbox') }}
      />
      <Tabs.Screen
        name="account"
        options={{ title: 'My Account', tabBarIcon: tabIcon('person-outline', 'person') }}
      />
    </Tabs>
  );
}
