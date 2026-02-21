import { lazy, useEffect } from 'react';

import { Redirect, Route, useLocation } from 'wouter';

import type { IUserDataLogin } from '../../auth/types';
import { useAuthContext, useDashboardContext } from '../../hooks';
import { destroySession, getSessionStorageOrNavigate } from '../../services';
import { parseJsonSafe } from '../../utils/json';
import { socket } from '../../web-sockets';
import { DashboardLayout } from '../layouts';
import type { IGenerateQr, IGetOrCreateUserSession } from '../types';
import type { SessionStatusEvent } from '../types/ws';
import { PUBLIC_ROUTES } from '../../data';

const QrImPage = lazy(() => import('../pages/qr-img/QrImgPage'));
const FormUserDataPage = lazy(
  () => import('../pages/form-users-data/FormUserDataPage'),
);
const DetailTablePage = lazy(
  () => import('../pages/detail-table/DetailTablePage'),
);
const SendMessagePage = lazy(
  () => import('../pages/send-message/SendMessagePage'),
);
const WeeklyReportPage = lazy(
  () => import('../pages/reports/WeeklyReportPage'),
);

/**
 * Validates if the user is authenticated
 * @param param0 - children components
 * @returns JSX.Element
 */
function Private({ children }: { children: React.ReactNode }) {
  const raw = getSessionStorageOrNavigate();
  const userInfo = parseJsonSafe<IUserDataLogin>(raw);

  return userInfo?.userId ? <>{children}</> : <Redirect to='/auth/login' />;
}

/**
 * Validates if the dashboard is accessible when connected with ws
 * @param param0 - children components
 * @returns JSX.Element
 */
function PrivateDashboard({ children }: { children: React.ReactNode }) {
  const {
    auth: { isLoggin },
  } = useAuthContext();
  const [location] = useLocation();

  const pathOnly = location.split('?')[0].split('#')[0];
  const isRoot = pathOnly === '/' || pathOnly === '';
  const isPublicRoute = PUBLIC_ROUTES.includes(pathOnly);

  if (isPublicRoute) {
    return <>{children}</>;
  }

  if (!isLoggin && !isRoot) {
    return <Redirect to='/' />;
  }

  if (isLoggin && isRoot) {
    return <Redirect to='/sphipment-order' />;
  }

  return <>{children}</>;
}

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { setAuth, setUserData } = useAuthContext();
  const { setLoginInfo, setWsSessionStatus } = useDashboardContext();

  useEffect(() => {
    const raw = getSessionStorageOrNavigate();
    const userInfo = parseJsonSafe<IUserDataLogin>(raw);
    if (!userInfo?.userId) {
      destroySession(false);
      return;
    }
    const dataEmit: IGetOrCreateUserSession = { userId: userInfo.userId };
    socket.emit('qr', dataEmit);
    const { fullName, town } = userInfo;
    setUserData((prev) =>
      prev.fullName === fullName && prev.town === town
        ? prev
        : { ...prev, fullName, town },
    );
  }, [setUserData]);

  useEffect(() => {
    const onQr = (loginInfo: IGenerateQr) => {
      const next = !!loginInfo.loginSuccess;
      setAuth((prev) => (prev.isLoggin === next ? prev : { isLoggin: next }));

      if (!next && !loginInfo.qrImage && !loginInfo.reloadPage) {
        destroySession(false);
        return;
      }
      setLoginInfo(loginInfo);
    };

    const onSessionStatus = (data: SessionStatusEvent) => {
      setWsSessionStatus(data);
    };

    socket.on('qr', onQr);
    socket.on('sessionStatus', onSessionStatus);
    return () => {
      socket.off('qr', onQr);
      socket.off('sessionStatus', onSessionStatus);
    };
  }, [setAuth, setLoginInfo, setWsSessionStatus]);

  return <DashboardLayout>{children}</DashboardLayout>;
}

export default function DashboardRoutes() {
  return (
    <Private>
      <DashboardShell>
        <PrivateDashboard>
          <Route
            path='/'
            component={QrImPage}
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
            path='/save'
            component={FormUserDataPage}
          />
          <Route
            path='/reports'
            component={WeeklyReportPage}
          />
          <Route>{() => <Redirect to='/' />}</Route>
        </PrivateDashboard>
      </DashboardShell>
    </Private>
  );
}
