import { lazy, Suspense } from 'react';

import { Router } from '@reach/router';
import { Route } from '../components';

const AuthRouting = lazy(() => import('../auth/routes/AuthRouting'));
const DashboardPage = lazy(() => import('../dashboard/pages/DashboardPage'));
const QrImPage = lazy(() => import('../dashboard/pages/qr-img/QrImgPage'));
const FormUserDataPage = lazy(
  () => import('../dashboard/pages/form-users-data/FormUserDataPage')
);
const DetailTablePage = lazy(
  () => import('../dashboard/pages/detail-table/DetailTablePage')
);
const SendMessagePage = lazy(
  () => import('../dashboard/pages/send-message/SendMessagePage')
);

export function AppRouting() {
  return (
    <Suspense fallback={<>loading</>}>
      <Router>
        <Route
          path='/auth/*'
          element={<AuthRouting />}
        />
        <DashboardPage path='/dashboard'>
          <Route
            path='/'
            element={<QrImPage />}
          />
          <Route
            path='/save'
            element={<FormUserDataPage />}
          />
          <Route
            path='/sphipment-order'
            element={<DetailTablePage />}
          />
          <Route
            path='/send-messages'
            element={<SendMessagePage />}
          />
        </DashboardPage>
      </Router>
    </Suspense>
  );
}
