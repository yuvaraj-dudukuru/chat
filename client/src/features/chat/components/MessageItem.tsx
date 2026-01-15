import React, { memo } from 'react';
import type { Message } from '../../../shared/types';

interface MessageItemProps {
  message: Message;
  currentUserName?: string;
  reactions: Array<{ emoji: string; name: string }>;
  onAddReaction: (messageId: string, emoji: string, name: string) => void;
}

/**
 * MessageItem
 *
 * Memoized component to prevent unnecessary re-renders when other
 * messages change. This is a key performance optimization for
 * long message lists.
 */
export const MessageItem = memo<MessageItemProps>(
  ({ message, currentUserName, reactions, onAddReaction }) => {
    return (
      <div className="group text-sm mb-1">
        <div className="inline-flex items-baseline space-x-2">
          <span className="font-medium">{message.senderId}</span>
          <span>{message.content}</span>
        </div>
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-text-muted mt-0.5">
          <button
            type="button"
            onClick={() => onAddReaction(message.id, '👍', currentUserName || 'guest')}
            className="px-1 rounded hover:bg-surface-alt"
          >
            👍
          </button>
          <button
            type="button"
            onClick={() => onAddReaction(message.id, '❤️', currentUserName || 'guest')}
            className="px-1 rounded hover:bg-surface-alt"
          >
            ❤️
          </button>
          <div className="flex flex-wrap gap-1">
            {(reactions ?? []).map((r, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-1 rounded-full bg-surface-alt"
              >
                {r.emoji}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

MessageItem.displayName = 'MessageItem';
