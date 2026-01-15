import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="app-shell">
      <main className="flex flex-1 items-center justify-center px-4 py-8">
        <div className="card-surface w-full max-w-md p-6 space-y-4">
          <h1 className="text-2xl font-semibold text-center">Welcome back</h1>
          {children}
        </div>
      </main>
    </div>
  );
};

