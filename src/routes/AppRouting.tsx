import { lazy, Suspense } from 'react';

import { Redirect, Route } from 'wouter';

const AuthRouting = lazy(() => import('../auth/routes/AuthRouting'));
const DashboardRouting = lazy(
  () => import('../dashboard/routes/DashboardRouting')
);

export function AppRouting() {
  return (
    <Suspense fallback={<>loading</>}>
      <>
        <AuthRouting />
        <DashboardRouting />
        <Route>
          <Redirect to='/auth/login' />
        </Route>
      </>
    </Suspense>
  );
}
