import { lazy, Suspense } from 'react';

import { Router } from '@reach/router';
import { Route } from '../components';

const AuthRouting = lazy(() => import('../auth/routes/AuthRouting'));
const DashboardPage = lazy(() => import('../dashboard/pages/DashboardPage'));

export function AppRouting() {
  return (
    <Suspense fallback={<>loading</>}>
      <Router>
        <Route
          path='auth/*'
          element={<AuthRouting />}
        />
        <Route
          path='dashboard/*'
          element={<DashboardPage />}
        />
      </Router>
    </Suspense>
  );
}
