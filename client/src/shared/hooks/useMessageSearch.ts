import { useMemo } from 'react';
import type { Message } from '../types';

/**
 * useMessageSearch
 *
 * Client-side search hook that filters messages by query string.
 * Uses memoization to avoid re-filtering on every render.
 */
export const useMessageSearch = (messages: Message[], query: string) => {
  return useMemo(() => {
    if (!query.trim()) return messages;

    const lowerQuery = query.toLowerCase();
    return messages.filter(
      (m) =>
        m.content.toLowerCase().includes(lowerQuery) ||
        m.senderId.toLowerCase().includes(lowerQuery)
    );
  }, [messages, query]);
};
