import { lazy } from 'react';


import type { ILoginResponse } from '../types';

const QrImgPage = lazy(() => import('../pages/qr-img/QrImgPage'));
const FormUserDataPage = lazy(
  () => import('../pages/form-users-data/FormUserDataPage')
);
const DetailTablePage = lazy(
  () => import('../pages/detail-table/DetailTablePage')
);
const SendMessagePage = lazy(
  () => import('../pages/send-message/SendMessagePage')
);
const DashboardPage = lazy(() => import('../pages/DashboardPage'));

interface Props {
  qrImg: ILoginResponse;
}

function DashboardRouting() {
  return (
    <>
      {/* <Route
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
      <Route>
        <Redirect to='/' />
      </Route> */}
    </>
  );
}

export default DashboardRouting;
