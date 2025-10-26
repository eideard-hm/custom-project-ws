import { lazy, useCallback, useEffect, useMemo, useRef } from 'react';

import { navigate } from 'wouter/use-location';

import type { IUserDataLogin } from '../../../auth/types';
import { useAuthContext, useDashboardContext } from '../../../hooks';
import { destroySession, getSessionStorageOrNavigate } from '../../../services';
import { parseJsonSafe } from '../../../utils/json';
import { socket } from '../../../web-sockets';
import { DashboardLayout } from '../../layouts';
import type { IGenerateQr, IGetOrCreateUserSession } from '../../types';
import type { SessionStatusEvent } from '../../types/ws';

import './app.min.css';
import './style.css';

const DashboardRouting = lazy(() => import('../../routes/DashboardRouting'));

function DashboardPage() {
  const mountedRef = useRef(true);

  const {
    auth: { isLoggin },
    setAuth,
    setUserData,
  } = useAuthContext();

  const { setLoginInfo, setWsSessionStatus } = useDashboardContext();

  const userInfo = useMemo(() => {
    const raw = getSessionStorageOrNavigate();
    return parseJsonSafe<IUserDataLogin>(raw);
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    if (!userInfo?.userId) {
      destroySession(false);
      return;
    }
    const dataEmit: IGetOrCreateUserSession = { userId: userInfo.userId };
    socket.emit('qr', dataEmit);

    return () => {
      mountedRef.current = false;
    };
  }, [userInfo?.userId]);

  const onQr = useCallback(
    (loginInfo: IGenerateQr) => {
      if (!mountedRef.current) return;

      const next = !!loginInfo.loginSuccess;
      setAuth((prev) => (prev.isLoggin === next ? prev : { isLoggin: next }));

      if (!next && !loginInfo.qrImage && !loginInfo.reloadPage) {
        destroySession(false);
        return;
      }

      setLoginInfo(loginInfo);
    },
    [setAuth, setLoginInfo]
  );

  useEffect(() => {
    socket.on('qr', onQr);
    return () => {
      socket.off('qr', onQr);
    };
  }, [onQr]);

  const onSessionStatus = useCallback(
    (data: SessionStatusEvent) => {
      if (!mountedRef.current) return;
      setWsSessionStatus(data);
    },
    [setWsSessionStatus]
  );

  useEffect(() => {
    socket.on('sessionStatus', onSessionStatus);
    return () => {
      socket.off('sessionStatus', onSessionStatus);
    };
  }, [onSessionStatus]);

  useEffect(() => {
    if (!userInfo) return;
    const { fullName, town } = userInfo;

    setUserData((prev) => {
      if (prev.fullName === fullName && prev.town === town) return prev;
      return { ...prev, fullName, town };
    });
  }, [userInfo, setUserData]);

  useEffect(() => {
    const target = isLoggin ? '/dashboard/sphipment-order' : '/dashboard';
    navigate(target, { replace: true });
  }, [isLoggin]);

  return (
    <DashboardLayout>
      <DashboardRouting />
    </DashboardLayout>
  );
}

export default DashboardPage;
