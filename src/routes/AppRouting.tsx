import { lazy, Suspense } from 'react';

import { Redirect, Route, Router } from 'wouter';

import { NestedRoutes } from '../components';

const AuthRouting = lazy(() => import('../auth/routes/AuthRouting'));
const DashboardPage = lazy(
  () => import('../dashboard/pages/dashboard/DashboardPage')
);

export function AppRouting() {
  return (
    <Suspense fallback={<>loading</>}>
      <Router
        base='/auth'
        key='/auth'
      >
        <AuthRouting />
      </Router>

      <NestedRoutes base='/dashboard'>
        <DashboardPage />
      </NestedRoutes>

      <Route>{() => <Redirect to='/auth' />}</Route>
    </Suspense>
  );
}
