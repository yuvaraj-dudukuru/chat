import { useEffect, useState } from 'react';
import { getSocket } from '../../../shared/services/socketClient';

interface ReactionEvent {
  messageId: string;
  emoji: string;
  name: string;
}

export const useReactions = (room: string) => {
  const [reactions, setReactions] = useState<Record<string, ReactionEvent[]>>({});

  useEffect(() => {
    const socket = getSocket();
    const handler = (payload: {
      room: string;
      messageId: string;
      emoji: string;
      name: string;
    }) => {
      if (payload.room !== room) return;
      setReactions((prev) => {
        const list = prev[payload.messageId] ?? [];
        return {
          ...prev,
          [payload.messageId]: [...list, payload],
        };
      });
    };

    socket.on('reaction', handler);

    return () => {
      socket.off('reaction', handler);
    };
  }, [room]);

  const addReaction = (messageId: string, emoji: string, name: string) => {
    const socket = getSocket();
    socket.emit('reaction', { room, messageId, emoji, name });
  };

  return { reactions, addReaction };
};

