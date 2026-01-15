import React from 'react';
import { ChatWindow } from './components/ChatWindow';

/**
 * ChatPage
 *
 * Route-level component that renders the main chat experience.
 * In later phases we will add sidebars, thread panes, and search
 * while keeping this as the entry point for the chat feature.
 */
export const ChatPage: React.FC = () => {
  return <ChatWindow />;
};

