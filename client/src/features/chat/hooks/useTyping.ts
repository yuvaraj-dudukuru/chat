import { useEffect, useState } from 'react';
import { getSocket } from '../../../shared/services/socketClient';

export const useTyping = (room: string, name: string) => {
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  useEffect(() => {
    const socket = getSocket();

    const handleTyping = (payload: { room: string; name: string; isTyping: boolean }) => {
      if (payload.room !== room || payload.name === name) return;
      setTypingUsers((prev) => {
        const has = prev.includes(payload.name);
        if (payload.isTyping) {
          return has ? prev : [...prev, payload.name];
        }
        return prev.filter((n) => n !== payload.name);
      });
    };

    socket.on('typing', handleTyping);

    return () => {
      socket.off('typing', handleTyping);
    };
  }, [room, name]);

  const emitTyping = (isTyping: boolean) => {
    const socket = getSocket();
    socket.emit('typing', { room, name, isTyping });
  };

  return { typingUsers, emitTyping };
};

