import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLegacyChatConnection } from '../hooks/useLegacyChatConnection';
import { useTyping } from '../hooks/useTyping';
import { useReadReceipts } from '../hooks/useReadReceipts';
import { useReactions } from '../hooks/useReactions';
import { useMessageSearch } from '../../../shared/hooks/useMessageSearch';
import { MessageItem } from './MessageItem';

interface ChatWindowProps {
  // placeholder for future props, like custom renderers
}

export const ChatWindow: React.FC<ChatWindowProps> = () => {
  const { name, room, users, messages, sendMessage } = useLegacyChatConnection();
  const [draft, setDraft] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { typingUsers, emitTyping } = useTyping(room || 'default', name || 'guest');
  const { receipts, emitRead } = useReadReceipts(room || 'default');
  const { reactions, addReaction } = useReactions(room || 'default');
  const filteredMessages = useMessageSearch(messages, searchQuery);

  const handleAddReaction = useCallback(
    (messageId: string, emoji: string, userName: string) => {
      addReaction(messageId, emoji, userName);
    },
    [addReaction]
  );

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    if (!draft) return;
    sendMessage(draft, () => setDraft(''));
    emitTyping(false);
  };

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    if (name) {
      emitRead(name);
    }
  }, [messages, emitRead, name]);

  return (
    <div className="flex h-full">
      <aside className="hidden md:flex w-60 flex-col border-r border-border bg-surface-alt">
        <div className="px-4 py-3 border-b border-border">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">
            Room
          </p>
          <p className="text-sm font-medium truncate">{room || 'General'}</p>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">
            People
          </p>
          {users.map((u: any) => (
            <div key={u.id} className="flex items-center justify-between text-xs">
              <span>{u.name}</span>
              <span className="h-2 w-2 rounded-full bg-success" aria-hidden />
            </div>
          ))}
        </div>
      </aside>
      <section className="flex-1 flex flex-col">
        <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface-alt">
          <div>
            <p className="text-sm font-semibold truncate">{room || 'General'}</p>
            <p className="text-xs text-text-muted truncate">
              Signed in as <span className="font-medium">{name || 'Guest'}</span>
            </p>
          </div>
          <div className="flex-1 max-w-xs ml-4">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-border bg-surface px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </header>
        <div className="flex-1 min-h-0 overflow-y-auto px-4 py-3 space-y-1">
          <AnimatePresence>
            {filteredMessages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageItem
                  message={m}
                  currentUserName={name}
                  reactions={reactions[m.id] ?? []}
                  onAddReaction={handleAddReaction}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        <div className="px-4 pb-1 text-xs text-text-muted h-4">
          {typingUsers.length > 0 && (
            <span>{typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing…</span>
          )}
        </div>
        <form
          onSubmit={handleSend}
          className="border-t border-border px-3 py-2 flex items-center space-x-2 bg-surface"
        >
          <input
            className="flex-1 rounded-md border border-border bg-surface-alt px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Type a message..."
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              emitTyping(Boolean(e.target.value));
            }}
          />
          <button type="submit" className="btn-primary text-sm">
            Send
          </button>
        </form>
      </section>
    </div>
  );
};

