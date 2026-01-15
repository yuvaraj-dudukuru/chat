import io from 'socket.io-client';

const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

export type SocketClient = ReturnType<typeof io>;

let socket: SocketClient | null = null;

export const getSocket = (): SocketClient => {
  if (!socket) {
    socket = io(ENDPOINT);
  }
  return socket;
};

export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

