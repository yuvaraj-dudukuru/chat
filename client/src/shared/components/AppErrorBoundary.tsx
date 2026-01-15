import React from 'react';

interface AppErrorBoundaryState {
  hasError: boolean;
}

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

export class AppErrorBoundary extends React.Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // In a real app, this is where you'd send the error to an error reporting service.
    // For interview purposes, it's useful to show that this hook exists.
    // eslint-disable-next-line no-console
    console.error('AppErrorBoundary caught error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-surface text-text">
          <div className="card-surface max-w-md w-full p-6 text-center space-y-4">
            <h1 className="text-xl font-semibold">Something went wrong</h1>
            <p className="text-text-muted">
              The UI crashed, but the error boundary caught it so the rest of the app
              can keep running.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

