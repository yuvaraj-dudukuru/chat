import React from 'react';
import { App as RoutedApp } from './app/App';

/**
 * Legacy entry that now simply delegates to the new app shell
 * under `src/app/App.tsx`. This keeps existing imports working
 * while you gradually refactor the feature set.
 */
const App: React.FC = () => <RoutedApp />;

export default App;

