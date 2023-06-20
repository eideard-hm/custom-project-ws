import { lazy, Suspense } from 'react';

import { Redirect, Route, Router } from 'wouter';

const AuthRouting = lazy(() => import('../auth/routes/AuthRouting'));
const DashboardRouting = lazy(
  () => import('../dashboard/routes/DashboardRouting')
);

export function AppRouting() {
  return (
    <Suspense fallback={<>loading</>}>
      <Router base='/auth'>
        <AuthRouting />
      </Router>
      <Router base='/dashboard'>
        <DashboardRouting />
      </Router>
      <Route>{() => <Redirect to='/auth/login' />}</Route>
    </Suspense>
  );
}
