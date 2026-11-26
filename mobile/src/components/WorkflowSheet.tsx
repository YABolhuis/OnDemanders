import Ionicons from '@expo/vector-icons/Ionicons';
import { type ReactNode, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { BottomSheet } from '@/components/BottomSheet';
import { Button } from '@/components/Button';
import { SignaturePad } from '@/components/SignaturePad';
import { formatPrice, parsePrice, STEPS, type Task, useTasks, type Workflow } from '@/lib/tasks';
import { colors, fonts } from '@/theme';

/**
 * The sheet for one of a task's three steps. `step` is the open step (1–3) or null when closed;
 * finishing a step opens the next one through `onStep`.
 */
export function WorkflowSheet({
  task,
  step,
  onStep,
  onClose,
}: {
  task: Task;
  step: number | null;
  onStep: (step: number) => void;
  onClose: () => void;
}) {
  const { workflows, send, updateWorkflow, addToBalance } = useTasks();
  const workflow: Workflow = workflows[task.id] ?? { step: 0 };
  // Keeps the last step's content while the sheet slides away.
  const [shown, setShown] = useState(step ?? 1);
  if (step !== null && step !== shown) setShown(step);

  const goTo = (next: number) => {
    updateWorkflow(task.id, { step: Math.max(workflow.step, next) });
    onStep(next);
  };

  return (
    <BottomSheet visible={step !== null} onClose={onClose} fit>
      <Progress step={shown} />
      {shown === 1 && (
        <OfferStep
          key={task.id}
          task={task}
          workflow={workflow}
          onAccept={() => {
            updateWorkflow(task.id, { agreedPrice: task.price });
            send(task.id, `I accept your price of ${formatPrice(task.price)}.`);
          }}
          onPropose={(cents) => {
            send(task.id, `I'd like to propose ${formatPrice(cents)} for this task.`);
            onClose();
          }}
          onContinue={() => goTo(2)}
        />
      )}
      {shown === 2 && (
        <ApproveStep
          workflow={workflow}
          onSigned={(name) => {
            updateWorkflow(task.id, { signedBy: name, step: Math.max(workflow.step, 3) });
            send(task.id, `Work finished and signed by ${name}.`, 'system');
            onStep(3);
          }}
          onContinue={() => goTo(3)}
        />
      )}
      {shown === 3 && (
        <PaymentStep
          task={task}
          workflow={workflow}
          onRequest={() => {
            const amount = workflow.agreedPrice ?? task.price;
            updateWorkflow(task.id, { step: 4 });
            send(task.id, `Payment request: ${formatPrice(amount)} for "${task.title}".`);
            addToBalance(amount);
          }}
          onRequestReview={() => {
            updateWorkflow(task.id, { reviewRequested: true });
            send(task.id, 'Thanks for the task! Would you leave me a review?');
          }}
          onDone={onClose}
        />
      )}
    </BottomSheet>
  );
}

function Progress({ step }: { step: number }) {
  return (
    <View style={styles.progress}>
      <View style={styles.progressBar}>
        {STEPS.map((label, index) => (
          <View
            key={label}
            style={[styles.progressStep, index < step && styles.progressStepLit]}
          />
        ))}
      </View>
      <Text style={styles.progressLabel}>
        Step {step} of {STEPS.length}
      </Text>
      <Text style={styles.title} accessibilityRole="header">
        {STEPS[step - 1]}
      </Text>
    </View>
  );
}

function OfferStep({
  task,
  workflow,
  onAccept,
  onPropose,
  onContinue,
}: {
  task: Task;
  workflow: Workflow;
  onAccept: () => void;
  onPropose: (cents: number) => void;
  onContinue: () => void;
}) {
  const [proposing, setProposing] = useState(false);
  const [amount, setAmount] = useState('');
  const cents = parsePrice(amount);

  if (workflow.agreedPrice !== undefined) {
    return (
      <>
        <Notice icon="checkmark-circle">
          You accepted {formatPrice(workflow.agreedPrice)}. {task.client} has reserved this amount on
          their account for this task. {"It's"} paid to you automatically once the work is approved.
        </Notice>
        <Button label="Continue" onPress={onContinue} style={styles.button} />
      </>
    );
  }

  return (
    <>
      <Text style={styles.body}>
        {task.client} offers <Text style={styles.price}>{formatPrice(task.price)}</Text> for{' '}
        {`"${task.title}".`}
      </Text>
      <Button
        label={`Accept the client's price (${formatPrice(task.price)})`}
        onPress={onAccept}
        style={styles.button}
      />
      {proposing ? (
        <View style={styles.propose}>
          <View style={styles.amountField}>
            <Text style={styles.euro}>€</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="0,00"
              placeholderTextColor={colors.muted}
              keyboardType="decimal-pad"
              autoFocus
              style={styles.amountInput}
              accessibilityLabel="Your price in euros"
            />
          </View>
          <Button
            label="Send in chat"
            disabled={!cents}
            onPress={() => cents && onPropose(cents)}
            style={[styles.button, styles.sendButton]}
          />
        </View>
      ) : (
        <Button
          label="Propose a different price"
          variant="outline"
          onPress={() => setProposing(true)}
          style={styles.button}
        />
      )}
    </>
  );
}

function ApproveStep({
  workflow,
  onSigned,
  onContinue,
}: {
  workflow: Workflow;
  onSigned: (name: string) => void;
  onContinue: () => void;
}) {
  const [signed, setSigned] = useState(false);
  const [name, setName] = useState('');

  if (workflow.signedBy) {
    return (
      <>
        <Notice icon="create">Signed by {workflow.signedBy}.</Notice>
        <Button label="Continue" onPress={onContinue} style={styles.button} />
      </>
    );
  }

  return (
    <>
      <Text style={styles.body}>Sign and enter your name to confirm the work is finished.</Text>
      <SignaturePad onChange={setSigned} />
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Full name"
        placeholderTextColor={colors.muted}
        autoCapitalize="words"
        autoComplete="name"
        style={styles.nameInput}
        accessibilityLabel="Full name"
      />
      <Button
        label="Continue"
        disabled={!signed || !name.trim()}
        onPress={() => onSigned(name.trim())}
        style={styles.button}
      />
    </>
  );
}

function PaymentStep({
  task,
  workflow,
  onRequest,
  onRequestReview,
  onDone,
}: {
  task: Task;
  workflow: Workflow;
  onRequest: () => void;
  onRequestReview: () => void;
  onDone: () => void;
}) {
  const amount = formatPrice(workflow.agreedPrice ?? task.price);

  if (workflow.step < 4) {
    return (
      <>
        <View style={styles.amountRow}>
          <Text style={styles.body}>Amount</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>
        <Text style={styles.hint}>
          {task.client} receives the request, and {amount} moves from their account to yours.
        </Text>
        <Button label="Send payment request" onPress={onRequest} style={styles.button} />
      </>
    );
  }

  return (
    <>
      <Notice icon="checkmark-circle">Payment request for {amount} sent to {task.client}.</Notice>
      {workflow.reviewRequested ? (
        <Notice icon="star">Review requested.</Notice>
      ) : (
        <Button
          label="Request a review"
          variant="outline"
          onPress={onRequestReview}
          style={styles.button}
        />
      )}
      <Button label="Done" onPress={onDone} style={styles.button} />
    </>
  );
}

function Notice({ icon, children }: { icon: keyof typeof Ionicons.glyphMap; children: ReactNode }) {
  return (
    <View style={styles.notice}>
      <Ionicons name={icon} size={22} color={colors.primary} />
      <Text style={styles.noticeText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  progress: {
    marginBottom: 14,
  },
  progressBar: {
    flexDirection: 'row',
    gap: 6,
  },
  progressStep: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.line,
  },
  progressStepLit: {
    backgroundColor: colors.primary,
  },
  progressLabel: {
    marginTop: 12,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.muted,
  },
  title: {
    marginTop: 2,
    fontFamily: fonts.title,
    fontSize: 20,
    color: colors.ink,
  },
  body: {
    marginBottom: 12,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.inkSoft,
  },
  price: {
    fontFamily: fonts.bodyBold,
    color: colors.price,
  },
  hint: {
    marginBottom: 4,
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 19,
    color: colors.muted,
  },
  button: {
    height: 48,
    marginTop: 10,
    borderRadius: 8,
  },
  propose: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  amountField: {
    flex: 1,
    height: 48,
    marginTop: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
  },
  euro: {
    fontFamily: fonts.bodyBold,
    fontSize: 17,
    color: colors.ink,
  },
  amountInput: {
    flex: 1,
    height: 48,
    paddingVertical: 0,
    fontFamily: fonts.body,
    fontSize: 17,
    color: colors.ink,
  },
  sendButton: {
    alignSelf: 'auto',
    paddingHorizontal: 18,
  },
  nameInput: {
    height: 48,
    marginTop: 4,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  amount: {
    fontFamily: fonts.title,
    fontSize: 22,
    color: colors.ink,
  },
  notice: {
    marginBottom: 4,
    padding: 14,
    flexDirection: 'row',
    gap: 10,
    borderRadius: 10,
    backgroundColor: colors.primarySoft,
  },
  noticeText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 15,
    lineHeight: 21,
    color: colors.ink,
  },
});
