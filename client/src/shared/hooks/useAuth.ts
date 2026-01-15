import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { authService } from '../services/authService';

/**
 * useAuth
 *
 * High-level hook over the auth store, suitable for components.
 * Encapsulates how auth state is stored and updated so it can be
 * discussed easily in interviews.
 */
export const useAuth = () => {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const isInitializing = useAuthStore((state) => state.isInitializing);
  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setInitializing = useAuthStore((state) => state.setInitializing);
  const reset = useAuthStore((state) => state.reset);

  useEffect(() => {
    // Initialize auth state from persisted token
    const initAuth = async () => {
      if (isInitializing && accessToken) {
        try {
          const { user: currentUser } = await authService.getCurrentUser(accessToken);
          setUser(currentUser);
        } catch {
          // Token invalid, clear auth
          reset();
        }
      }
      setInitializing(false);
    };

    initAuth();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    user,
    accessToken,
    isInitializing,
    setUser,
    setAccessToken,
    setInitializing,
    reset,
    isAuthenticated: Boolean(accessToken && user),
  };
};

