import { lazy, Suspense } from 'react';

import { Redirect, Route, Router } from 'wouter';

import { NestedRoutes } from '../components';

const AuthRouting = lazy(() => import('../auth/routes/AuthRouting'));
const DashboardRoutes = lazy(() => import('../dashboard/routes/DashboardRouting'));

export function AppRouting() {
  return (
    <Router>
      <Suspense fallback={<>loading</>}>
        <NestedRoutes base='/auth'>
          <AuthRouting />
        </NestedRoutes>

        <NestedRoutes base='/dashboard'>
          <DashboardRoutes />
        </NestedRoutes>

        <Route>{() => <Redirect to='/auth/login' />}</Route>
      </Suspense>
    </Router>
  );
}
