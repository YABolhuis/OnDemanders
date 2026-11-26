import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';

import { AppHeader } from '@/components/AppHeader';
import { Button } from '@/components/Button';
import { useKeyboardHeight } from '@/lib/keyboard';
import { formatPrice, parsePrice, useTasks } from '@/lib/tasks';
import { colors, fonts } from '@/theme';

const CATEGORIES = ['Garden', 'Cleaning', 'Moving', 'Handyman', 'Errands', 'Other'];

type Notice = { kind: 'error' | 'success'; text: string };

export default function PostTaskScreen() {
  const { balances, posted, postTask } = useTasks();
  const keyboard = useKeyboardHeight();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [notice, setNotice] = useState<Notice | null>(null);

  const cents = parsePrice(price);
  const complete = !!title.trim() && !!address.trim() && !!cents;

  function submit() {
    if (!cents || !complete) return;
    if (!postTask({ title: title.trim(), description: description.trim(), category, price: cents, address: address.trim() })) {
      setNotice({
        kind: 'error',
        text: `Your balance of ${formatPrice(balances.client)} isn't enough for ${formatPrice(cents)}. Top up your account or lower the price.`,
      });
      return;
    }
    setNotice({
      kind: 'success',
      text: `"${title.trim()}" is posted. ${formatPrice(cents)} is reserved from your balance until the work is approved.`,
    });
    setTitle('');
    setDescription('');
    setPrice('');
    setAddress('');
  }

  return (
    <View style={styles.screen}>
      <AppHeader title="Post a task" />
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: 24 + keyboard }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.balance}>
          <Text style={styles.balanceLabel}>Available balance</Text>
          <Text style={styles.balanceValue}>{formatPrice(balances.client)}</Text>
        </View>

        <View style={styles.card}>
          <Field label="What needs to be done?" value={title} onChangeText={setTitle} placeholder="e.g. Mow the lawn" />
          <Field
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Tell freelancers what the task involves"
            multiline
            style={styles.multiline}
          />

          <Text style={styles.label}>Category</Text>
          <View style={styles.categories}>
            {CATEGORIES.map((option) => {
              const selected = option === category;
              return (
                <Pressable
                  key={option}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: selected }}
                  onPress={() => setCategory(option)}
                  style={[styles.category, selected && styles.categorySelected]}
                >
                  <Text style={[styles.categoryText, selected && styles.categoryTextSelected]}>
                    {option}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Field
            label="Price (€)"
            value={price}
            onChangeText={setPrice}
            placeholder="25,00"
            keyboardType="decimal-pad"
          />
          <Field label="Address" value={address} onChangeText={setAddress} placeholder="Street, town" />

          {notice && (
            <View style={[styles.notice, notice.kind === 'error' && styles.noticeError]}>
              <Ionicons
                name={notice.kind === 'error' ? 'alert-circle' : 'checkmark-circle'}
                size={20}
                color={notice.kind === 'error' ? colors.danger : colors.primary}
              />
              <Text style={styles.noticeText}>{notice.text}</Text>
            </View>
          )}
          <Button label="Post task" disabled={!complete} onPress={submit} style={styles.submit} />
        </View>

        {posted.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Your posted tasks</Text>
            {posted.map((task) => (
              <View key={task.id} style={styles.posted}>
                <View style={styles.postedText}>
                  <Text style={styles.postedTitle} numberOfLines={1}>
                    {task.title}
                  </Text>
                  <Text style={styles.postedMeta} numberOfLines={1}>
                    {task.category} · {task.address}
                  </Text>
                </View>
                <Text style={styles.postedPrice}>{formatPrice(task.price)}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}

function Field({ label, style, ...props }: TextInputProps & { label: string }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        placeholderTextColor={colors.muted}
        accessibilityLabel={label}
        style={[styles.input, style]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.screen,
  },
  content: {
    paddingTop: 8,
  },
  balance: {
    alignItems: 'center',
    paddingVertical: 16,
    marginBottom: 8,
    backgroundColor: colors.surface,
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
  card: {
    paddingHorizontal: 14,
    paddingBottom: 18,
    backgroundColor: colors.surface,
  },
  label: {
    marginTop: 16,
    marginBottom: 6,
    fontFamily: fonts.bodyBold,
    fontSize: 14,
    color: colors.ink,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: colors.input,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink,
  },
  multiline: {
    height: 90,
    paddingTop: 10,
    textAlignVertical: 'top',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  category: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.line,
  },
  categorySelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  categoryText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.inkSoft,
  },
  categoryTextSelected: {
    fontFamily: fonts.bodyBold,
    color: colors.primary,
  },
  notice: {
    marginTop: 16,
    padding: 12,
    flexDirection: 'row',
    gap: 8,
    borderRadius: 8,
    backgroundColor: colors.primarySoft,
  },
  noticeError: {
    backgroundColor: '#FDECEC',
  },
  noticeText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.ink,
  },
  submit: {
    height: 46,
    marginTop: 20,
  },
  sectionTitle: {
    marginTop: 18,
    marginBottom: 8,
    marginHorizontal: 14,
    fontFamily: fonts.title,
    fontSize: 15,
    color: colors.ink,
  },
  posted: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 1,
    backgroundColor: colors.surface,
  },
  postedText: {
    flex: 1,
  },
  postedTitle: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
    color: colors.ink,
  },
  postedMeta: {
    marginTop: 2,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.inkSoft,
  },
  postedPrice: {
    fontFamily: fonts.title,
    fontSize: 15,
    color: colors.price,
  },
});
