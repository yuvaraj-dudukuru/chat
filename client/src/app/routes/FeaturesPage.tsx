import React, { useState } from 'react';

export const FeaturesPage: React.FC = () => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
      <section className="card-surface p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Architecture overview</h2>
          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="text-xs text-primary hover:underline"
          >
            {showTechnicalDetails ? 'Hide' : 'Show'} Technical Details
          </button>
        </div>
        <p className="text-sm text-text-muted">
          This chat application is built with React + TypeScript, Zustand for global
          state, Tailwind for styling, and a feature-first folder structure. The goal
          is to look and feel like a production-ready messaging tool while remaining
          easy to discuss in interviews.
        </p>
        {showTechnicalDetails && (
          <div className="mt-4 p-3 bg-surface-alt rounded-md text-xs font-mono space-y-1">
            <div>📁 client/src/</div>
            <div className="pl-4">├── app/ (routing, layouts, providers)</div>
            <div className="pl-4">├── features/ (auth, chat, users)</div>
            <div className="pl-4">└── shared/ (stores, hooks, services, types)</div>
          </div>
        )}
      </section>

      <section className="card-surface p-4 space-y-2">
        <h3 className="text-md font-semibold">State management</h3>
        <p className="text-sm text-text-muted">
          Global entities such as users, channels, and messages live in normalized
          Zustand stores. Custom hooks like <code>useChat</code> and{' '}
          <code>useAuth</code> provide a React-friendly layer and hide the store
          implementation details.
        </p>
        {showTechnicalDetails && (
          <div className="mt-4 p-3 bg-surface-alt rounded-md text-xs font-mono">
            <div>Store structure:</div>
            <div className="pl-4">authStore: user, accessToken</div>
            <div className="pl-4">chatStore: channels, messages (normalized)</div>
            <div className="pl-4">uiStore: theme, sidebar, debug logging</div>
          </div>
        )}
      </section>

      <section className="card-surface p-4 space-y-2">
        <h3 className="text-md font-semibold">Real-time & performance</h3>
        <p className="text-sm text-text-muted">
          Socket.IO powers real-time features (typing indicators, reactions, read receipts).
          Performance optimizations include React.memo for message items, useMemo for
          search filtering, useCallback for event handlers, and code splitting via React.lazy().
        </p>
        {showTechnicalDetails && (
          <div className="mt-4 p-3 bg-surface-alt rounded-md text-xs font-mono space-y-1">
            <div>Optimizations:</div>
            <div className="pl-4">• MessageItem wrapped in React.memo</div>
            <div className="pl-4">• useMessageSearch uses useMemo</div>
            <div className="pl-4">• Event handlers use useCallback</div>
            <div className="pl-4">• FeaturesPage lazy-loaded</div>
          </div>
        )}
      </section>

      <section className="card-surface p-4 space-y-2">
        <h3 className="text-md font-semibold">Security</h3>
        <p className="text-sm text-text-muted">
          JWT-based authentication with bcrypt password hashing. Tokens stored in localStorage
          (trade-off: easier to demo, but httpOnly cookies preferred in production).
          Protected routes check auth state before rendering.
        </p>
      </section>

      <section className="card-surface p-4 space-y-2">
        <h3 className="text-md font-semibold">Testing</h3>
        <p className="text-sm text-text-muted">
          Jest + React Testing Library configured for unit tests (stores, hooks), component
          tests (UI interactions), and integration tests (auth flows, chat flows).
        </p>
      </section>
    </div>
  );
};

