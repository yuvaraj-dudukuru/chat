import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { AppErrorBoundary } from '../shared/components/AppErrorBoundary';
import { RootLayout } from './routes/RootLayout';
import { LoginPage } from './routes/LoginPage';
import { RegisterPage } from './routes/RegisterPage';
import { ChatLayout } from './routes/ChatLayout';
import React, { Suspense, lazy } from 'react';
import { FeaturesPage } from './routes/FeaturesPage';
import { NotFoundPage } from './routes/NotFoundPage';
import { DebugLoggingProvider } from './providers/DebugLoggingProvider';
import { useAuth } from '../shared/hooks/useAuth';
import { ProfilePage } from '../features/users/ProfilePage';
import { PerformancePanel } from '../features/ui/components/PerformancePanel';

// Code splitting: lazy load heavy routes
const LazyFeaturesPage = lazy(() =>
  Promise.resolve({ default: FeaturesPage })
);

const ProtectedRoute: React.FC<{
  path: string;
  exact?: boolean;
  children: React.ReactNode;
}> = ({ children, ...rest }) => {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-sm text-text-muted">Loading...</div>
      </div>
    );
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          <>{children}</>
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export const App: React.FC = () => {
  return (
    <AppErrorBoundary>
      <DebugLoggingProvider>
        <Router>
          <RootLayout>
            <Switch>
              <Route path="/login" exact>
                <LoginPage />
              </Route>
              <Route path="/register" exact>
                <RegisterPage />
              </Route>
              <ProtectedRoute path="/app" exact>
                <ChatLayout />
              </ProtectedRoute>
              <ProtectedRoute path="/app/:roomId">
                <ChatLayout />
              </ProtectedRoute>
              <ProtectedRoute path="/profile" exact>
                <ProfilePage />
              </ProtectedRoute>
              <Route path="/features" exact>
                <Suspense
                  fallback={
                    <div className="flex h-screen items-center justify-center">
                      <div className="text-sm text-text-muted">Loading...</div>
                    </div>
                  }
                >
                  <LazyFeaturesPage />
                </Suspense>
              </Route>
              <Route path="/" exact>
                <Redirect to="/login" />
              </Route>
              <Route>
                <NotFoundPage />
              </Route>
            </Switch>
          </RootLayout>
          <PerformancePanel />
        </Router>
      </DebugLoggingProvider>
    </AppErrorBoundary>
  );
};

export default App;

