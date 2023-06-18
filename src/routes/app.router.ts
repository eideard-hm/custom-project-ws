import { lazy } from 'react';

import { createBrowserRouter } from 'react-router-dom';
import { authRouter } from '../auth/routes/auth.router';

const App = lazy(() => import('../App'));

export const routes = createBrowserRouter([
  {
    path: '/',
    Component: App,
  },
  {
    path: '/auth',
    children: [
      authRouter
    ]
  },
]);
