import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { useAuthStore } from '../../stores/authStore';

// Mock the store
jest.mock('../../stores/authStore', () => ({
  useAuthStore: jest.fn(),
}));

describe('useAuth', () => {
  const mockStore = {
    user: null,
    accessToken: null,
    isInitializing: false,
    setUser: jest.fn(),
    setAccessToken: jest.fn(),
    setInitializing: jest.fn(),
    reset: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as jest.Mock).mockImplementation((selector: any) => {
      return selector(mockStore);
    });
  });

  it('should return auth state', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should return isAuthenticated true when user and token exist', () => {
    mockStore.user = { id: '1', name: 'Test', email: 'test@example.com' };
    mockStore.accessToken = 'token';

    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBe(true);
  });
});
