Created At: 2026-06-05T11:04:06Z
Completed At: 2026-06-05T11:04:06Z

				The command completed successfully.
				Output:
				import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FocusStatus = 'idle' | 'focusing' | 'paused' | 'finished';

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
  progress: number; // 0 to 1
  isDead: boolean; // For withering mechanic
  currentSeed: number; // To randomly generate the current plant
  
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

  // Actions
  addTask: (title: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  setActiveTask: (id: string | null) => void;

  startFocus: (durationMinutes?: number) => void;
  pauseFocus: () => void;
  resumeFocus: () => void;
  stopFocus: () => void;
  resetToIdle: () => void; // Called after finishing/stopping to go back to main screen
  tick: () => void;
}

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useTimerStore = create<TimerState>()
        set({
          status: 'paused', // keep it visible for a moment
          isDead: true,
          timeLeft: get().duration,
        });
      },

      resetToIdle: () => {
        set({
          status: 'idle',
          progress: 0,
          isDead: false,
        });
      },

      tick: () => {
        const state = get();
        if (state.status !== 'focusing') return;

        const newTimeLeft = Math.max(0, state.timeLeft - 1);
        const newProgress = 1 - (newTimeLeft / state.duration);

        if (newTimeLeft === 0) {
          // Session finished - Add to garden!
          const newRecord: PlantRecord = {
            id: generateId(),
            date: Date.now(),
            plantSeed: state.currentSeed,
            duration: state.duration / 60,
          };

          set({
            timeLeft: 0,
            progress: 1,
            status: 'finished',
            totalFocusTime: state.totalFocusTime + state.duration,
            completedSessions: state.completedSessions + 1,
            garden: [...state.garden, newRecord],
          });
        } else {
          // Normal tick
          set({
            timeLeft: newTimeLeft,
            progress: newProgress,
            totalFocusTime: state.totalFocusTime + 1,
          });
        }
      }
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
      }),
    }
  )
);

