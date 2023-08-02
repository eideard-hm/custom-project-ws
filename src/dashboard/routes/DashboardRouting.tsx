import { lazy } from 'react';

import { Route } from 'wouter';
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

interface Props {
  qrImg: ILoginResponse;
}

function DashboardRouting({ qrImg }: Props) {
  return (
    <>
      <Route path='/'>
        <QrImgPage loginInfo={qrImg} />
      </Route>
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
    </>
  );
}

export default DashboardRouting;
