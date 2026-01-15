import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="flex h-[calc(100vh-3.25rem)] items-center justify-center">
      <div className="card-surface max-w-md w-full p-6 text-center space-y-3">
        <h1 className="text-2xl font-semibold">404</h1>
        <p className="text-sm text-text-muted">Page not found.</p>
        <Link to="/app" className="btn-primary text-sm inline-flex justify-center">
          Go to app
        </Link>
      </div>
    </div>
  );
};

