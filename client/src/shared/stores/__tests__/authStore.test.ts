import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '../authStore';

describe('authStore', () => {
  beforeEach(() => {
    // Reset store before each test
    const { result } = renderHook(() => useAuthStore());
    act(() => {
      result.current.reset();
    });
  });

  it('should initialize with null user and token', () => {
    const { result } = renderHook(() => useAuthStore());
    expect(result.current.user).toBeNull();
    expect(result.current.accessToken).toBeNull();
  });

  it('should set user and token', () => {
    const { result } = renderHook(() => useAuthStore());
    const user = { id: '1', name: 'Test User', email: 'test@example.com' };

    act(() => {
      result.current.setUser(user);
      result.current.setAccessToken('test-token');
    });

    expect(result.current.user).toEqual(user);
    expect(result.current.accessToken).toBe('test-token');
  });

  it('should reset user and token', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setUser({ id: '1', name: 'Test', email: 'test@example.com' });
      result.current.setAccessToken('token');
      result.current.reset();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.accessToken).toBeNull();
  });
});
