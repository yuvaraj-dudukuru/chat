import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';
import { useUi } from '../../shared/hooks/useUi';
import { authService } from '../../shared/services/authService';

export const ProfilePage: React.FC = () => {
  const { user, accessToken, reset } = useAuth();
  const { isDarkMode, toggleDarkMode, debugLoggingEnabled, toggleDebugLogging } = useUi();
  const history = useHistory();
  const [name, setName] = useState(user?.name || '');
  const [status, setStatus] = useState(user?.status || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setStatus(user.status || '');
    }
  }, [user]);

  const handleLogout = () => {
    reset();
    history.push('/login');
  };

  const handleSave = async () => {
    // In a real app, this would call an API to update the profile
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // eslint-disable-next-line no-alert
      alert('Profile updated (demo - no API call)');
    }, 500);
  };

  return (
    <div className="px-4 py-6 max-w-2xl mx-auto space-y-6">
      <div className="card-surface p-6 space-y-4">
        <h1 className="text-xl font-semibold">Profile & Settings</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">
              Status Message
            </label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-text-muted mb-1">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full rounded-md border border-border bg-surface-alt/50 px-3 py-2 text-sm opacity-60"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="btn-primary text-sm disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="card-surface p-6 space-y-4">
        <h2 className="text-lg font-semibold">Preferences</h2>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Dark Mode</p>
            <p className="text-xs text-text-muted">Toggle between light and dark themes</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isDarkMode ? 'bg-primary' : 'bg-surface-alt'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Debug Logging</p>
            <p className="text-xs text-text-muted">Show state changes in console</p>
          </div>
          <button
            onClick={toggleDebugLogging}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              debugLoggingEnabled ? 'bg-primary' : 'bg-surface-alt'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                debugLoggingEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="card-surface p-6">
        <button
          onClick={handleLogout}
          className="w-full btn-primary text-sm bg-danger hover:bg-danger/90"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
