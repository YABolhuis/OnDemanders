import Ionicons from '@expo/vector-icons/Ionicons';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useSession } from '@/lib/session';

export type Coordinate = { latitude: number; longitude: number };

export type Task = {
  id: string;
  title: string;
  /** In cents. What the client has reserved on their account for this task. */
  price: number;
  category: string;
  icon: keyof typeof Ionicons.glyphMap;
  place: string;
  address: string;
  coordinate: Coordinate;
  client: string;
  description: string;
};

/** Test data until tasks come from Supabase. */
export const TASKS: Task[] = [
  {
    id: 'warffum-lawn',
    title: 'Mow the lawn',
    price: 2500,
    category: 'Garden',
    icon: 'leaf',
    place: 'Warffum',
    address: 'Hoofdstraat, Warffum',
    coordinate: { latitude: 53.3923, longitude: 6.5609 },
    client: 'Jan de Vries',
    description: 'Mow the back garden, about 80 m². The mower is in the shed.',
  },
];

export type Place = { name: string; coordinate: Coordinate; tasks: Task[] };

/** One pin per village or city, placed at its first task. */
export const PLACES: Place[] = Object.values(
  TASKS.reduce<Record<string, Place>>((places, task) => {
    const place = (places[task.place] ??= { name: task.place, coordinate: task.coordinate, tasks: [] });
    place.tasks.push(task);
    return places;
  }, {}),
);

export function formatPrice(cents: number) {
  return `€ ${(cents / 100).toFixed(2).replace('.', ',')}`;
}

/** Parses "25", "25,5" or "25.50" into cents. */
export function parsePrice(text: string) {
  const value = Number(text.trim().replace(',', '.'));
  return Number.isFinite(value) && value > 0 ? Math.round(value * 100) : null;
}

export type Message = {
  id: string;
  from: 'me' | 'contact' | 'system';
  text: string;
  at: number;
};

/**
 * The three steps a worker goes through on an accepted task. `step` is the furthest step that has
 * been started: 0 before anything, then 1 make an offer, 2 approve work, 3 send payment request,
 * and 4 once the payment request is sent.
 */
export type Workflow = {
  step: number;
  agreedPrice?: number;
  signedBy?: string;
  reviewRequested?: boolean;
};

export const STEPS = ['Make an offer', 'Approve work', 'Send payment request'] as const;

export type AccountMode = 'freelancer' | 'client';

/** A task the user posted as a client. Its price is reserved from the client balance. */
export type PostedTask = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  postedAt: number;
};

type Work = {
  accepted: string[];
  workflows: Record<string, Workflow>;
  messages: Record<string, Message[]>;
  mode: AccountMode;
  /** In cents. Mock amounts until payments exist. */
  balances: Record<AccountMode, number>;
  posted: PostedTask[];
};

const EMPTY: Work = {
  accepted: [],
  workflows: {},
  messages: {},
  mode: 'freelancer',
  balances: { freelancer: 0, client: 2500 },
  posted: [],
};

type TasksState = Work & {
  accept: (taskId: string) => void;
  send: (taskId: string, text: string, from?: Message['from']) => void;
  updateWorkflow: (taskId: string, change: Partial<Workflow>) => void;
  /** Pays the freelancer, as if the client's reserved money arrived. */
  addToBalance: (cents: number) => void;
  setMode: (mode: AccountMode) => void;
  /** False when the client balance can't cover the price. */
  postTask: (task: Omit<PostedTask, 'id' | 'postedAt'>) => boolean;
};

const TasksContext = createContext<TasksState | null>(null);

function storageKey(userId: string) {
  return `ondemanders.work.v1.${userId}`;
}

function load(userId: string): Work {
  try {
    const saved = localStorage.getItem(storageKey(userId));
    return saved ? { ...EMPTY, ...(JSON.parse(saved) as Work) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

let nextId = 0;
function message(from: Message['from'], text: string): Message {
  nextId += 1;
  return { id: `${Date.now()}-${nextId}`, from, text, at: Date.now() };
}

/** Accepted tasks, their chats and workflow, kept on the device per signed-in user for now. */
export function TasksProvider({ children }: { children: ReactNode }) {
  const { session } = useSession();
  const userId = session?.user.id;
  const [work, setWork] = useState<{ userId?: string; data: Work }>(() => ({
    userId,
    data: userId ? load(userId) : EMPTY,
  }));

  // A different account signs in on the same device.
  if (work.userId !== userId) {
    setWork({ userId, data: userId ? load(userId) : EMPTY });
  }

  useEffect(() => {
    if (work.userId) localStorage.setItem(storageKey(work.userId), JSON.stringify(work.data));
  }, [work]);

  const change = useCallback((update: (data: Work) => Work) => {
    setWork((current) => ({ ...current, data: update(current.data) }));
  }, []);

  const accept = useCallback(
    (taskId: string) =>
      change((data) => {
        const task = TASKS.find((entry) => entry.id === taskId);
        if (!task || data.accepted.includes(taskId)) return data;
        const firstName = task.client.split(' ')[0];
        return {
          ...data,
          accepted: [...data.accepted, taskId],
          messages: {
            ...data.messages,
            [taskId]: [
              message('system', `You accepted "${task.title}" for ${formatPrice(task.price)}.`),
              message('contact', `Hi! Thanks for accepting. I'm ${firstName}, let me know if you have any questions.`),
            ],
          },
        };
      }),
    [change],
  );

  const send = useCallback(
    (taskId: string, text: string, from: Message['from'] = 'me') =>
      change((data) => ({
        ...data,
        messages: { ...data.messages, [taskId]: [...(data.messages[taskId] ?? []), message(from, text)] },
      })),
    [change],
  );

  const updateWorkflow = useCallback(
    (taskId: string, update: Partial<Workflow>) =>
      change((data) => ({
        ...data,
        workflows: {
          ...data.workflows,
          [taskId]: { ...(data.workflows[taskId] ?? { step: 0 }), ...update },
        },
      })),
    [change],
  );

  const addToBalance = useCallback(
    (cents: number) =>
      change((data) => ({
        ...data,
        balances: { ...data.balances, freelancer: data.balances.freelancer + cents },
      })),
    [change],
  );

  const setMode = useCallback(
    (mode: AccountMode) => change((data) => ({ ...data, mode })),
    [change],
  );

  const postTask = useCallback(
    (task: Omit<PostedTask, 'id' | 'postedAt'>) => {
      if (task.price > work.data.balances.client) return false;
      change((data) => ({
        ...data,
        balances: { ...data.balances, client: data.balances.client - task.price },
        posted: [{ ...task, id: `posted-${Date.now()}`, postedAt: Date.now() }, ...data.posted],
      }));
      return true;
    },
    [change, work.data.balances.client],
  );

  const value = useMemo(
    () => ({ ...work.data, accept, send, updateWorkflow, addToBalance, setMode, postTask }),
    [work.data, accept, send, updateWorkflow, addToBalance, setMode, postTask],
  );

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
  const state = useContext(TasksContext);
  if (!state) throw new Error('useTasks needs a TasksProvider');
  return state;
}

export function taskById(id: string | undefined) {
  return TASKS.find((task) => task.id === id);
}
