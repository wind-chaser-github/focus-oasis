Created At: 2026-06-05T11:03:36Z
Completed At: 2026-06-05T11:03:37Z
File Path: `file:///Users/chaser/code/focus-oasis/src/store/useTimerStore.ts`
Total Lines: 120
Total Bytes: 3025
Showing lines 1 to 120
The following code has been modified to include a line number before every line, in the format: <line_number>: <original_line>. Please note that any changes targeting the original code should remove the line number, colon, and leading space.
1: import { create } from 'zustand';
2: import { persist } from 'zustand/middleware';
3: 
4: export type FocusStatus = 'idle' | 'focusing' | 'paused' | 'finished';
5: 
6: export interface Task {
7:   id: string;
8:   title: string;
9:   completed: boolean;
10: }
11: 
12: export interface PlantRecord {
13:   id: string;
14:   date: number;
15:   plantSeed: number;
16:   duration: number; // minutes focused
17: }
18: 
19: interface TimerState {
20:   status: FocusStatus;
21:   duration: number; // in seconds
22:   timeLeft: number; // in seconds
23:   progress: number; // 0 to 1
24:   isDead: boolean; // For withering mechanic
25:   currentSeed: number; // To randomly generate the current plant
26:   
27:   // Tasks
28:   tasks: Task[];
29:   activeTaskId: string | null;
30: 
31:   // Stats & Collection
32:   totalFocusTime: number; // in seconds
33:   completedSessions: number;
34:   garden: PlantRecord[];
35: 
36:   // Settings
37:   settings: {
38:     defaultFocusMins: number;
39:   };
40: 
41:   // Actions
42:   addTask: (title: string) => void;
43:   toggleTask: (id: string) => void;
44:   deleteTask: (id: string) => void;
45:   setActiveTask: (id: string | null) => void;
46: 
47:   startFocus: (durationMinutes?: number) => void;
48:   pauseFocus: () => void;
49:   resumeFocus: () => void;
50:   stopFocus: () => void;
51:   resetToIdle: () => void; // Called after finishing/stopping to go back to main screen
52:   tick: () => void;
53: }
54: 
55: const generateId = () => Math.random().toString(36).substring(2, 9);
56: 
57: export const useTimerStore = create<TimerState>()
58:         set({
59:           status: 'paused', // keep it visible for a moment
60:           isDead: true,
61:           timeLeft: get().duration,
62:         });
63:       },
64: 
65:       resetToIdle: () => {
66:         set({
67:           status: 'idle',
68:           progress: 0,
69:           isDead: false,
70:         });
71:       },
72: 
73:       tick: () => {
74:         const state = get();
75:         if (state.status !== 'focusing') return;
76: 
77:         const newTimeLeft = Math.max(0, state.timeLeft - 1);
78:         const newProgress = 1 - (newTimeLeft / state.duration);
79: 
80:         if (newTimeLeft === 0) {
81:           // Session finished - Add to garden!
82:           const newRecord: PlantRecord = {
83:             id: generateId(),
84:             date: Date.now(),
85:             plantSeed: state.currentSeed,
86:             duration: state.duration / 60,
87:           };
88: 
89:           set({
90:             timeLeft: 0,
91:             progress: 1,
92:             status: 'finished',
93:             totalFocusTime: state.totalFocusTime + state.duration,
94:             completedSessions: state.completedSessions + 1,
95:             garden: [...state.garden, newRecord],
96:           });
97:         } else {
98:           // Normal tick
99:           set({
100:             timeLeft: newTimeLeft,
101:             progress: newProgress,
102:             totalFocusTime: state.totalFocusTime + 1,
103:           });
104:         }
105:       }
106:     }),
107:     {
108:       name: 'focus-oasis-storage',
109:       partialize: (state) => ({ 
110:         tasks: state.tasks,
111:         activeTaskId: state.activeTaskId,
112:         totalFocusTime: state.totalFocusTime, 
113:         completedSessions: state.completedSessions,
114:         garden: state.garden,
115:         settings: state.settings,
116:       }),
117:     }
118:   )
119: );
120: 
The above content shows the entire, complete file contents of the requested file.
