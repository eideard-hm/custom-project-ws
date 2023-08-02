import { lazy, Suspense } from 'react';

import { Redirect, Route, Router, Switch } from 'wouter';

const AuthRouting = lazy(() => import('../auth/routes/AuthRouting'));
const DashboardPage = lazy(() => import('../dashboard/pages/DashboardPage'));

export function AppRouting() {
  return (
    <Suspense fallback={<>loading</>}>
      <Switch>
        <Router base='/auth'>
          <AuthRouting />
        </Router>
        <Router base='/dashboard'>
          <DashboardPage />
        </Router>
        <Router>
          <Route>
            <Redirect to='/auth' />
          </Route>
        </Router>
      </Switch>
    </Suspense>
  );
}
