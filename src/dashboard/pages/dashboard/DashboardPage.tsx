/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, useEffect } from 'react';

import { navigate } from 'wouter/use-location';

import type { IUserDataLogin } from '../../../auth/types';
import { useAuthContext, useDashboardContext } from '../../../hooks';
import { destroySession, getSessionStorageOrNavigate } from '../../../services';
import { socket } from '../../../web-sockets';
import { DashboardLayout } from '../../layouts';
import type { IGenerateQr, IGetOrCreateUserSession } from '../../types';
import type { SessionStatusEvent } from '../../types/ws';

import './app.min.css';
import './style.css';

const DashboardRouting = lazy(() => import('../../routes/DashboardRouting'));

function DashboardPage() {
  const {
    auth: { isLoggin },
    setAuth,
    setUserData,
    userData,
  } = useAuthContext();
  const { setLoginInfo, setWsSessionStatus } = useDashboardContext();

  useEffect(() => {
    // emit the user id loggin
    const userInfo = getSessionStorageOrNavigate();
    const { userId }: IUserDataLogin = JSON.parse(userInfo);
    const dataEmit: IGetOrCreateUserSession = {
      userId,
    };
    socket.emit('qr', dataEmit);

    const receiveQr = (loginIfo: IGenerateQr) => {
      console.log({ loginIfo });
      setAuth({ isLoggin: loginIfo.loginSuccess });

      if (!loginIfo.loginSuccess && !loginIfo.qrImage && !loginIfo.reloadPage) {
        destroySession(false);
        return;
      }

      setLoginInfo(loginIfo);

      // if (loginIfo.userImage) {
      //   setUserData({ ...userData, userImage: loginIfo.userImage });
      // }
    };

    // nos suscribimos al socket
    socket.on('qr', receiveQr);

    return () => {
      socket.off('qr', receiveQr);
    };
  }, []);

  useEffect(() => {
    const handleSessionStatusEvent = (data: SessionStatusEvent) => {
      setWsSessionStatus(data);
    };

    socket.on('sessionStatus', handleSessionStatusEvent);

    return () => {
      socket.off('sessionStatus', handleSessionStatusEvent);
    };
  }, []);

  useEffect(() => {
    const userInfo = getSessionStorageOrNavigate();
    const { fullName, town }: IUserDataLogin = JSON.parse(userInfo);
    setUserData({ ...userData, fullName, town });
  }, []);

  useEffect(() => {
    if (isLoggin) {
      navigate('/dashboard/sphipment-order', { replace: true });
    } else {
      navigate('/dashboard', { replace: true });
    }
  }, [isLoggin]);

  return (
    <DashboardLayout>
      <DashboardRouting />
    </DashboardLayout>
  );
}

export default DashboardPage;
