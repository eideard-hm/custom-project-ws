import { lazy } from 'react';

import { Router } from '@reach/router';

import { Route } from '../../components';

const QrImPage = lazy(() => import('../pages/qr-img/QrImgPage'));
const FormUserDataPage = lazy(
  () => import('../pages/form-users-data/FormUserDataPage')
);
const DetailTablePage = lazy(
  () => import('../pages/detail-table/DetailTablePage')
);
const SendMessagePage = lazy(
  () => import('../pages/send-message/SendMessagePage')
);

function DashboardRouting() {
  return (
    <Router>
      <Route
        path='/'
        element={<QrImPage />}
      />
      <Route
        path='save'
        element={<FormUserDataPage />}
      />
      <Route
        default
        path='sphipment-order'
        element={<DetailTablePage />}
      />
      <Route
        path='send-messages'
        element={<SendMessagePage />}
      />
    </Router>
  );
}

export default DashboardRouting;
