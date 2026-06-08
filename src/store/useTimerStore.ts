import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FocusStatus = 'idle' | 'focusing' | 'paused' | 'finished' | 'withered' | 'suspended';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface PlantRecord {
  id: string;
  date: number;
  plantSeed: number;
  duration: number; // minutes focused
}

interface TimerState {
  status: FocusStatus;
  duration: number; // in seconds
  timeLeft: number; // in seconds
  timeString: string;
  progress: number; // 0 to 1
  isDead: boolean; // For withering mechanic
  currentSeed: number; // To randomly generate the current plant
  lastTickTime: number;
  
  // Tasks
  tasks: Task[];
  activeTaskId: string | null;

  // Stats & Collection
  totalFocusTime: number; // in seconds
  completedSessions: number;
  garden: PlantRecord[];

  // Settings
  settings: {
    defaultFocusMins: number;
  };
  soundEnabled: boolean;

  // Actions
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setActiveTask: (id: string | null) => void;

  startFocus: (durationMinutes?: number) => void;
  pauseFocus: () => void;
  resumeFocus: () => void;
  stopFocus: () => void;
  resetToIdle: () => void;
  tick: () => void;
  toggleSound: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const getTimeString = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const useTimerStore = create<TimerState>()(
  persist(
    (set, get) => ({
      status: 'idle',
      duration: 25 * 60,
      timeLeft: 25 * 60,
      timeString: getTimeString(25 * 60),
      progress: 0,
      isDead: false,
      currentSeed: Math.random(),
      lastTickTime: Date.now(),
      
      tasks: [],
      activeTaskId: null,
      
      totalFocusTime: 0,
      completedSessions: 0,
      garden: [],

      settings: {
        defaultFocusMins: 25,
      },
      soundEnabled: true,

      addTask: (title) => set((state) => {
        const newTask = { id: generateId(), title, completed: false };
        return {
          tasks: [...state.tasks, newTask],
          activeTaskId: state.activeTaskId || newTask.id
        };
      }),

      toggleTask: (id) => set((state) => ({
        tasks: state.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter(t => t.id !== id),
        activeTaskId: state.activeTaskId === id ? null : state.activeTaskId
      })),

      setActiveTask: (id) => set({ activeTaskId: id }),

      startFocus: (durationMinutes) => {
        const mins = durationMinutes || get().settings.defaultFocusMins;
        const durationSeconds = mins * 60;
        set({
          status: 'focusing',
          duration: durationSeconds,
          timeLeft: durationSeconds,
          timeString: getTimeString(durationSeconds),
          progress: 0,
          isDead: false,
          currentSeed: Math.random(),
          lastTickTime: Date.now()
        });
      },

      pauseFocus: () => {
        if (get().status === 'focusing') {
          set({ status: 'suspended' }); // Maps to suspended/paused
        }
      },

      resumeFocus: () => {
        if (get().status === 'suspended' || get().status === 'paused') {
          set({ status: 'focusing', lastTickTime: Date.now() });
        }
      },

      stopFocus: () => {
        // Trigger withering mechanic!
        set({
          status: 'withered', // so it matches UI logic
          isDead: true,
        });
      },

      resetToIdle: () => {
        set({
          status: 'idle',
          progress: 0,
          isDead: false,
          timeLeft: get().settings.defaultFocusMins * 60,
          timeString: getTimeString(get().settings.defaultFocusMins * 60),
        });
      },

      tick: () => {
        const state = get();
        if (state.status !== 'focusing') return;

        const now = Date.now();
        const delta = now - state.lastTickTime;
        const newTimeLeft = Math.max(0, state.timeLeft - (delta / 1000));
        const newProgress = 1 - (newTimeLeft / state.duration);

        if (newTimeLeft <= 0) {
          // Session finished
          const newRecord: PlantRecord = {
            id: generateId(),
            date: Date.now(),
            plantSeed: state.currentSeed,
            duration: state.duration / 60,
          };

          set({
            timeLeft: 0,
            timeString: '00:00',
            progress: 1,
            status: 'finished',
            totalFocusTime: state.totalFocusTime + state.duration,
            completedSessions: state.completedSessions + 1,
            garden: [...state.garden, newRecord],
            lastTickTime: now
          });
        } else {
          // Normal tick
          set({
            timeLeft: newTimeLeft,
            timeString: getTimeString(newTimeLeft),
            progress: newProgress,
            totalFocusTime: state.totalFocusTime + (delta / 1000),
            lastTickTime: now
          });
        }
      },

      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled }))
    }),
    {
      name: 'focus-oasis-storage',
      partialize: (state) => ({ 
        tasks: state.tasks,
        activeTaskId: state.activeTaskId,
        totalFocusTime: state.totalFocusTime, 
        completedSessions: state.completedSessions,
        garden: state.garden,
        settings: state.settings,
        soundEnabled: state.soundEnabled
      }),
    }
  )
);
