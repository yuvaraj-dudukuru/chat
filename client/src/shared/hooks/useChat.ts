import { useMemo } from 'react';
import { useChatStore } from '../stores/chatStore';

/**
 * useChat
 *
 * A high-level API for chat data and actions.
 * Uses memoization so components can select exactly what they need.
 */
export const useChat = () => {
  const {
    channels,
    messages,
    messagesByChannel,
    activeChannelId,
    setChannels,
    setActiveChannel,
    upsertMessages,
    addMessageOptimistic,
  } = useChatStore();

  const activeChannel = activeChannelId ? channels[activeChannelId] : null;

  const activeMessages = useMemo(() => {
    if (!activeChannelId) return [];
    const ids = messagesByChannel[activeChannelId] ?? [];
    return ids.map((id) => messages[id]).filter(Boolean);
  }, [activeChannelId, messagesByChannel, messages]);

  return {
    channels: Object.values(channels),
    activeChannel,
    activeChannelId,
    activeMessages,
    setChannels,
    setActiveChannel,
    upsertMessages,
    addMessageOptimistic,
  };
};

