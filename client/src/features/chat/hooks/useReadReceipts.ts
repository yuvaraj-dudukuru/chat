import { useEffect, useState } from 'react';
import { getSocket } from '../../../shared/services/socketClient';

interface ReadReceipt {
  name: string;
  readAt: string;
}

export const useReadReceipts = (room: string) => {
  const [receipts, setReceipts] = useState<ReadReceipt[]>([]);

  useEffect(() => {
    const socket = getSocket();

    const handler = (payload: { room: string; name: string; readAt: string }) => {
      if (payload.room !== room) return;
      setReceipts((prev) => {
        const others = prev.filter((r) => r.name !== payload.name);
        return [...others, { name: payload.name, readAt: payload.readAt }];
      });
    };

    socket.on('readReceipt', handler);

    return () => {
      socket.off('readReceipt', handler);
    };
  }, [room]);

  const emitRead = (name: string) => {
    const socket = getSocket();
    socket.emit('readMessages', {
      room,
      name,
      readAt: new Date().toISOString(),
    });
  };

  return { receipts, emitRead };
};

