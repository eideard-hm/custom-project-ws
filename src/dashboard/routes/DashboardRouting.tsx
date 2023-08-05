import { lazy } from 'react';

import { Redirect, Route } from 'wouter';

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
    <>
      <Route
        path='/save'
        component={FormUserDataPage}
      />
      <Route
        path='/sphipment-order'
        component={DetailTablePage}
      />
      <Route
        path='/send-messages'
        component={SendMessagePage}
      />
      <Route
        path='/'
        component={QrImPage}
      />
      <Route>{() => <Redirect to='/' />}</Route>
    </>
  );
}

export default DashboardRouting;
