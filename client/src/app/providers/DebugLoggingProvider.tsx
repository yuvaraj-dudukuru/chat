import React, { useEffect } from 'react';
import { useUiStore } from '../../shared/stores/uiStore';
import { useAuthStore } from '../../shared/stores/authStore';
import { useChatStore } from '../../shared/stores/chatStore';

interface DebugLoggingProviderProps {
  children: React.ReactNode;
}

/**
 * DebugLoggingProvider
 *
 * Subscribes to key Zustand stores and logs changes when the user
 * has debug logging enabled. This is great for interviews because
 * you can toggle it on and show how the global state evolves.
 */
export const DebugLoggingProvider: React.FC<DebugLoggingProviderProps> = ({
  children,
}) => {
  const debugLoggingEnabled = useUiStore((state) => state.debugLoggingEnabled);

  useEffect(() => {
    if (!debugLoggingEnabled) {
      return;
    }

    const unsubscribers = [
      useAuthStore.subscribe(
        (state) => state,
        (state) => {
          // eslint-disable-next-line no-console
          console.log('[debug][authStore]', state);
        },
      ),
      useChatStore.subscribe(
        (state) => ({
          activeChannelId: state.activeChannelId,
          channelsCount: Object.keys(state.channels).length,
          messagesCount: Object.keys(state.messages).length,
        }),
        (summary) => {
          // eslint-disable-next-line no-console
          console.log('[debug][chatStore]', summary);
        },
      ),
      useUiStore.subscribe(
        (state) => state,
        (state) => {
          // eslint-disable-next-line no-console
          console.log('[debug][uiStore]', state);
        },
      ),
    ];

    return () => {
      unsubscribers.forEach((unsub) => unsub());
    };
  }, [debugLoggingEnabled]);

  return <>{children}</>;
};

