import create from 'zustand';

export interface UiState {
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  debugLoggingEnabled: boolean;
  setSidebarOpen: (value: boolean) => void;
  toggleSidebar: () => void;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
  setDebugLogging: (value: boolean) => void;
  toggleDebugLogging: () => void;
}

export const useUiStore = create<UiState>((set, get) => ({
  isSidebarOpen: true,
  isDarkMode: true,
  debugLoggingEnabled: false,

  setSidebarOpen: (isSidebarOpen) => set({ isSidebarOpen }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  setDarkMode: (isDarkMode) => set({ isDarkMode }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  setDebugLogging: (debugLoggingEnabled) => set({ debugLoggingEnabled }),
  toggleDebugLogging: () =>
    set((state) => ({ debugLoggingEnabled: !state.debugLoggingEnabled })),
}));

