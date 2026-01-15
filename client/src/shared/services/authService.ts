const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: { id: string; name: string; email: string };
  token: string;
}

export interface AuthError {
  error: string;
}

/**
 * authService
 *
 * Encapsulates all authentication-related API calls.
 * This separation makes it easy to swap implementations or
 * add interceptors for token refresh, error handling, etc.
 */
export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!res.ok) {
      const error: AuthError = await res.json();
      throw new Error(error.error || 'Login failed');
    }

    return res.json();
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error: AuthError = await res.json();
      throw new Error(error.error || 'Registration failed');
    }

    return res.json();
  },

  async getCurrentUser(token: string): Promise<{ user: { id: string; name: string; email: string } }> {
    const res = await fetch(`${API_BASE}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error('Failed to get current user');
    }

    return res.json();
  },
};
