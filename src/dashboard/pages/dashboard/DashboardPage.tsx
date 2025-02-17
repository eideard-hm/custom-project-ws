/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, useEffect } from 'react';

import { navigate } from 'wouter/use-location';

import type { IUserDataLogin } from '../../../auth/types';
import { useAuthContext, useDashboardContext } from '../../../hooks';
import { destroySession, getSessionStorageOrNavigate } from '../../../services';
import { socket } from '../../../web-sockets';
import { DashboardLayout } from '../../layouts';
import type { IGenerateQr, IGetOrCreateUserSession } from '../../types';

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
  const { setLoginInfo } = useDashboardContext();

  useEffect(() => {
    // emit the user id loggin
    const userInfo = getSessionStorageOrNavigate();
    const { userId }: IUserDataLogin = JSON.parse(userInfo);
    const dataEmit: IGetOrCreateUserSession = {
      userId,
    };
    socket.emit('qr', dataEmit);

    // nos suscribimos al socket
    socket.on('qr', receiveQr);

    return () => {
      socket.off('qr', receiveQr);
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

  const receiveQr = async (loginIfo: IGenerateQr) => {
    console.log({ loginIfo });
    setAuth({ isLoggin: loginIfo.loginSuccess });

    if (!loginIfo.loginSuccess && !loginIfo.qrImage && !loginIfo.reloadPage) {
      await destroySession(false);
      return;
    }

    setLoginInfo(loginIfo);

    // if (loginIfo.userImage) {
    //   setUserData({ ...userData, userImage: loginIfo.userImage });
    // }
  };

  return (
    <DashboardLayout>
      <DashboardRouting />
    </DashboardLayout>
  );
}

export default DashboardPage;
