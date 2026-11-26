import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { AppHeader } from '@/components/AppHeader';
import { ChatActions } from '@/components/ChatActions';
import { EmptyState } from '@/components/EmptyState';
import { ChatBubbles } from '@/components/Illustrations';
import { TopTabs } from '@/components/TopTabs';
import { colors, fonts } from '@/theme';

type Tab = 'messages' | 'notifications';

function confirmDelivery() {
  Alert.alert('Oplevering goedkeuren', 'Weet je zeker dat je de oplevering wilt goedkeuren?', [
    { text: 'Annuleren', style: 'cancel' },
    { text: 'Goedkeuren' },
  ]);
}

export default function InboxScreen() {
  const [tab, setTab] = useState<Tab>('messages');
  const [message, setMessage] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
        <>
          <View style={styles.messages}>
            <EmptyState
              illustration={<ChatBubbles />}
              title="No messages yet"
              subtitle="Chat messages will show up here"
            />
            <ChatActions
              bottom={12}
              actions={[
                {
                  icon: 'checkmark-done-outline',
                  label: 'Oplevering goedkeuren',
                  onPress: confirmDelivery,
                },
              ]}
            />
          </View>
          <View style={styles.composer}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Type your message"
              placeholderTextColor={colors.muted}
              style={styles.input}
            />
            <Pressable
              style={styles.send}
              accessibilityRole="button"
              accessibilityLabel="Send"
              disabled={!message.trim()}
            >
              <Ionicons name="send" size={16} color={message.trim() ? colors.primary : colors.inkSoft} />
            </Pressable>
          </View>
        </>
      ) : (
        <EmptyState
          illustration={<Ionicons name="notifications-outline" size={52} color={colors.inkSoft} />}
          title="No notifications yet"
          subtitle="Notifications will show up here"
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  messages: {
    flex: 1,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  input: {
    flex: 1,
    height: 36,
    paddingHorizontal: 14,
    borderRadius: 6,
    backgroundColor: colors.input,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink,
  },
  send: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.line,
  },
});
