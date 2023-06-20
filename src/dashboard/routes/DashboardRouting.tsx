import { lazy } from 'react';

import { Route } from 'wouter';

const DashboardPage = lazy(() => import('../pages/DashboardPage'));

function DashboardRouting() {
  return (
    <Route
      path='/'
      component={DashboardPage}
    />
  );
}

export default DashboardRouting;
