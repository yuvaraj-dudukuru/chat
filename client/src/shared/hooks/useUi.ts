import { useEffect } from 'react';
import { useUiStore } from '../stores/uiStore';

/**
 * useUi
 *
 * Central place for global UI state such as theme, sidebar, and debug logging.
 * We also synchronize the dark/light theme to the document body class here.
 */
export const useUi = () => {
  const isSidebarOpen = useUiStore((state) => state.isSidebarOpen);
  const isDarkMode = useUiStore((state) => state.isDarkMode);
  const debugLoggingEnabled = useUiStore((state) => state.debugLoggingEnabled);
  const setSidebarOpen = useUiStore((state) => state.setSidebarOpen);
  const toggleSidebar = useUiStore((state) => state.toggleSidebar);
  const setDarkMode = useUiStore((state) => state.setDarkMode);
  const toggleDarkMode = useUiStore((state) => state.toggleDarkMode);
  const setDebugLogging = useUiStore((state) => state.setDebugLogging);
  const toggleDebugLogging = useUiStore((state) => state.toggleDebugLogging);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const body = document.body;
    if (isDarkMode) {
      body.classList.remove('theme-light');
    } else {
      body.classList.add('theme-light');
    }
  }, [isDarkMode]);

  return {
    isSidebarOpen,
    isDarkMode,
    debugLoggingEnabled,
    setSidebarOpen,
    toggleSidebar,
    setDarkMode,
    toggleDarkMode,
    setDebugLogging,
    toggleDebugLogging,
  };
};

