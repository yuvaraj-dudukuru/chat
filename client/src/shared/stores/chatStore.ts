import create from 'zustand';
import type { Channel, ChannelId, Message, MessageId } from '../types';

export interface ChatState {
  channels: Record<ChannelId, Channel>;
  messagesByChannel: Record<ChannelId, MessageId[]>;
  messages: Record<MessageId, Message>;
  activeChannelId: ChannelId | null;
  isLoadingInitial: boolean;
  setChannels: (channels: Channel[]) => void;
  setActiveChannel: (channelId: ChannelId | null) => void;
  upsertMessages: (messages: Message[]) => void;
  addMessageOptimistic: (message: Message) => void;
  clear: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  channels: {},
  messagesByChannel: {},
  messages: {},
  activeChannelId: null,
  isLoadingInitial: false,

  setChannels: (channels) =>
    set(() => {
      const next: Record<ChannelId, Channel> = {};
      channels.forEach((c) => {
        next[c.id] = c;
      });
      return { channels: next };
    }),

  setActiveChannel: (channelId) => set({ activeChannelId: channelId }),

  upsertMessages: (incoming) =>
    set((state) => {
      const messages = { ...state.messages };
      const messagesByChannel = { ...state.messagesByChannel };

      incoming.forEach((m) => {
        messages[m.id] = m;
        const list = messagesByChannel[m.channelId] ?? [];
        if (!list.includes(m.id)) {
          messagesByChannel[m.channelId] = [...list, m.id];
        }
      });

      return { messages, messagesByChannel };
    }),

  addMessageOptimistic: (message) => {
    const existing = get().messages[message.id];
    if (existing) {
      return;
    }
    get().upsertMessages([message]);
  },

  clear: () =>
    set({
      channels: {},
      messagesByChannel: {},
      messages: {},
      activeChannelId: null,
    }),
}));

