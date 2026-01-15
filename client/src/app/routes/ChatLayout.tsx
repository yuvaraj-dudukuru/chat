import React from 'react';
import { ChatPage } from '../../features/chat/ChatPage';

export const ChatLayout: React.FC = () => (
  <div className="flex h-[calc(100vh-3.25rem)]">
    <div className="flex-1 min-w-0">
      <ChatPage />
    </div>
  </div>
);

