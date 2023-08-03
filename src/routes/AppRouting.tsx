import { lazy, Suspense } from 'react';

import { Router } from '@reach/router';
import { Route } from '../components';
import FormUserDataPage from '../dashboard/pages/form-users-data/FormUserDataPage';
import DetailTablePage from '../dashboard/pages/detail-table/DetailTablePage';

const AuthRouting = lazy(() => import('../auth/routes/AuthRouting'));
const DashboardPage = lazy(() => import('../dashboard/pages/DashboardPage'));
const DashboardRouting = lazy(
  () => import('../dashboard/routes/DashboardRouting')
);

export function AppRouting() {
  return (
    <Suspense fallback={<>loading</>}>
      <Router>
        <Route
          default
          path='/auth/*'
          element={<AuthRouting />}
        />
        <DashboardPage path='/dashboard'>
          <Route
            default
            path='/'
            element={<h1>Hello World</h1>}
          />
          <FormUserDataPage path='save' />
          <DetailTablePage path='sphipment-order' />
        </DashboardPage>
      </Router>
    </Suspense>
  );
}
