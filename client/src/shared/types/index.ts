export type UserId = string;

export interface User {
  id: UserId;
  name: string;
  avatarUrl?: string;
  status?: string;
}

export type MessageId = string;
export type ChannelId = string;

export interface Message {
  id: MessageId;
  channelId: ChannelId;
  senderId: UserId;
  content: string;
  createdAt: string;
  updatedAt?: string;
  isEdited?: boolean;
}

export interface Channel {
  id: ChannelId;
  name: string;
  isDirect?: boolean;
}

export interface Reaction {
  emoji: string;
  userId: UserId;
}

export interface Presence {
  userId: UserId;
  isOnline: boolean;
  lastActiveAt: string;
}

export interface AuthTokenPayload {
  sub: UserId;
  name: string;
  exp: number;
}
