import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect, router, useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { WorkflowMenu } from '@/components/WorkflowMenu';
import { WorkflowSheet } from '@/components/WorkflowSheet';
import { useKeyboardHeight } from '@/lib/keyboard';
import { type Message, taskById, useTasks } from '@/lib/tasks';
import { colors, fonts } from '@/theme';

const COMPOSER_HEIGHT = 56;

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const task = taskById(id);
  const { accepted, messages, workflows, send, updateWorkflow } = useTasks();
  const insets = useSafeAreaInsets();
  const keyboard = useKeyboardHeight();
  const [text, setText] = useState('');
  const [openStep, setOpenStep] = useState<number | null>(null);
  const list = useRef<FlatList<Message>>(null);

  if (!task || !accepted.includes(task.id)) {
    return <Redirect href="/inbox" />;
  }

  const chat = messages[task.id] ?? [];
  const step = workflows[task.id]?.step ?? 0;
  const bottom = keyboard || insets.bottom;

  function submit() {
    if (!task || !text.trim()) return;
    send(task.id, text.trim());
    setText('');
  }

  return (
    <View style={styles.screen}>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.headerRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            hitSlop={8}
            onPress={() => (router.canGoBack() ? router.back() : router.replace('/inbox'))}
          >
            <Ionicons name="chevron-back" size={26} color={colors.headerText} />
          </Pressable>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{task.client.charAt(0)}</Text>
          </View>
          <View style={styles.headerText}>
            <Text style={styles.name} numberOfLines={1}>
              {task.client}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {task.title} · {task.place}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <FlatList
          ref={list}
          data={chat}
          keyExtractor={(message) => message.id}
          renderItem={({ item }) => <Bubble message={item} />}
          contentContainerStyle={styles.messages}
          onContentSizeChange={() => list.current?.scrollToEnd({ animated: true })}
          keyboardShouldPersistTaps="handled"
        />
        <WorkflowMenu
          step={step}
          bottom={12}
          onSelect={(next) => {
            updateWorkflow(task.id, { step: Math.max(step, next) });
            setOpenStep(next);
          }}
        />
      </View>

      <View style={[styles.composer, { paddingBottom: bottom + 10 }]}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type your message"
          placeholderTextColor={colors.muted}
          style={styles.input}
          returnKeyType="send"
          onSubmitEditing={submit}
          submitBehavior="submit"
        />
        <Pressable
          style={styles.send}
          accessibilityRole="button"
          accessibilityLabel="Send"
          disabled={!text.trim()}
          onPress={submit}
        >
          <Ionicons name="send" size={16} color={text.trim() ? colors.primary : colors.inkSoft} />
        </Pressable>
      </View>

      <WorkflowSheet
        task={task}
        step={openStep}
        onStep={setOpenStep}
        onClose={() => setOpenStep(null)}
      />
    </View>
  );
}

function Bubble({ message }: { message: Message }) {
  if (message.from === 'system') {
    return <Text style={styles.system}>{message.text}</Text>;
  }
  const mine = message.from === 'me';
  return (
    <View style={[styles.bubble, mine ? styles.mine : styles.theirs]}>
      <Text style={[styles.bubbleText, mine && styles.mineText]}>{message.text}</Text>
      <Text style={[styles.time, mine && styles.mineTime]}>
        {new Date(message.at).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  header: {
    backgroundColor: colors.header,
  },
  headerRow: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 10,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  avatarLetter: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.primaryText,
  },
  headerText: {
    flex: 1,
  },
  name: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    color: colors.headerText,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.authTextMuted,
  },
  body: {
    flex: 1,
  },
  messages: {
    padding: 14,
    paddingBottom: 80,
    gap: 8,
  },
  system: {
    alignSelf: 'center',
    maxWidth: '85%',
    marginVertical: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.emptyCircle,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.inkSoft,
    textAlign: 'center',
  },
  bubble: {
    maxWidth: '80%',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
    borderRadius: 14,
  },
  mine: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
    backgroundColor: colors.primary,
  },
  theirs: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.line,
  },
  bubbleText: {
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 21,
    color: colors.ink,
  },
  mineText: {
    color: colors.primaryText,
  },
  time: {
    alignSelf: 'flex-end',
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.muted,
  },
  mineTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  composer: {
    minHeight: COMPOSER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 10,
    backgroundColor: colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.line,
  },
  input: {
    flex: 1,
    height: 38,
    paddingHorizontal: 14,
    paddingVertical: 0,
    borderRadius: 6,
    backgroundColor: colors.input,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink,
  },
  send: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.line,
  },
});
