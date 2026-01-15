import create from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isInitializing: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setInitializing: (value: boolean) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isInitializing: true,
      setUser: (user) => set({ user }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setInitializing: (isInitializing) => set({ isInitializing }),
      reset: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'chat-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    },
  ),
);

