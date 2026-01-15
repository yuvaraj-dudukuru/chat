import { useEffect, useState } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { getSocket } from '../../../shared/services/socketClient';
import { useChat } from '../../../shared/hooks/useChat';
import type { Message } from '../../../shared/types';

/**
 * Temporary hook that bridges the original tutorial-style Chat component
 * to the new Zustand-based chat store. This lets us incrementally migrate
 * the UI while keeping the existing backend contract.
 */
export const useLegacyChatConnection = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState<any[]>([]);
  const { activeMessages, addMessageOptimistic } = useChat();

  useEffect(() => {
    const { name: queryName, room: queryRoom } = queryString.parse(location.search);
    const socket = getSocket();

    if (typeof queryName === 'string') setName(queryName);
    if (typeof queryRoom === 'string') setRoom(queryRoom);

    socket.emit('join', { name: queryName, room: queryRoom }, (error: any) => {
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [location.search]);

  useEffect(() => {
    const socket = getSocket();

    const onMessage = (message: any) => {
      const mapped: Message = {
        id: `${Date.now()}-${Math.random()}`,
        channelId: room || 'default',
        senderId: message.user,
        content: message.text,
        createdAt: new Date().toISOString(),
      };
      addMessageOptimistic(mapped);
    };

    const onRoomData = ({ users: nextUsers }: any) => {
      setUsers(nextUsers ?? []);
    };

    socket.on('message', onMessage);
    socket.on('roomData', onRoomData);

    return () => {
      socket.off('message', onMessage);
      socket.off('roomData', onRoomData);
    };
  }, [addMessageOptimistic, room]);

  const sendMessage = (value: string, cb?: () => void) => {
    const socket = getSocket();
    if (!value) return;
    socket.emit('sendMessage', value, () => {
      if (cb) cb();
    });
  };

  return {
    name,
    room,
    users,
    messages: activeMessages,
    sendMessage,
  };
};

