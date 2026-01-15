import React from 'react';
import { Link } from 'react-router-dom';
import { useUi } from '../../shared/hooks/useUi';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const { isDarkMode, toggleDarkMode } = useUi();

  return (
    <div className="app-shell">
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-surface">
        <div className="flex items-center space-x-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-soft text-primary font-semibold">
            C
          </span>
          <span className="font-semibold text-sm sm:text-base">Chat Studio</span>
        </div>
        <nav className="flex items-center space-x-4 text-sm">
          <Link to="/app" className="text-text-muted hover:text-text">
            App
          </Link>
          <Link to="/features" className="text-text-muted hover:text-text">
            Features
          </Link>
          <Link to="/profile" className="text-text-muted hover:text-text">
            Profile
          </Link>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="text-xs sm:text-sm text-text-muted hover:text-text"
          >
            {isDarkMode ? 'Light mode' : 'Dark mode'}
          </button>
        </nav>
      </header>
      <main className="flex-1 min-h-0">{children}</main>
    </div>
  );
};

