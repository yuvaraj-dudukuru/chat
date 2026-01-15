import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageItem } from '../MessageItem';
import type { Message } from '../../../../shared/types';

const mockMessage: Message = {
  id: '1',
  channelId: 'channel1',
  senderId: 'user1',
  content: 'Test message',
  createdAt: new Date().toISOString(),
};

describe('MessageItem', () => {
  it('should render message content', () => {
    render(
      <MessageItem
        message={mockMessage}
        reactions={[]}
        onAddReaction={jest.fn()}
      />
    );

    expect(screen.getByText('user1')).toBeInTheDocument();
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('should render reactions', () => {
    const reactions = [
      { emoji: '👍', name: 'user2' },
      { emoji: '❤️', name: 'user3' },
    ];

    render(
      <MessageItem
        message={mockMessage}
        reactions={reactions}
        onAddReaction={jest.fn()}
      />
    );

    expect(screen.getByText('👍')).toBeInTheDocument();
    expect(screen.getByText('❤️')).toBeInTheDocument();
  });
});
