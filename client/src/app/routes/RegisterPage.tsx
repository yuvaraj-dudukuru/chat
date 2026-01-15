import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthLayout } from './AuthLayout';
import { authService } from '../../shared/services/authService';
import { useAuth } from '../../shared/hooks/useAuth';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { setUser, setAccessToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { user, token } = await authService.register({ name, email, password });
      setUser(user);
      setAccessToken(token);
      history.push('/app');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-xs text-danger bg-danger/10 border border-danger/20 rounded-md p-2">
            {error}
          </div>
        )}
        <div className="space-y-1 text-left">
          <label htmlFor="name" className="block text-xs font-medium text-text-muted">
            Display name
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-1 text-left">
          <label htmlFor="email" className="block text-xs font-medium text-text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-1 text-left">
          <label
            htmlFor="password"
            className="block text-xs font-medium text-text-muted"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border bg-surface-alt px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full text-sm disabled:opacity-50"
        >
          {loading ? 'Creating account...' : 'Create account'}
        </button>
        <p className="text-xs text-center text-text-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

