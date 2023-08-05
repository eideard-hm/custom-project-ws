/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, useEffect } from 'react';

import { useNavigate } from '@reach/router';

import type { IUserDataLogin } from '../../../auth/types';
import { WHATSAAP_API_URL } from '../../../config';
import { useAuthContext, useDashboardContext } from '../../../hooks';
import { getSessionStorage } from '../../../services';
import { USER_ID_KEY } from '../../../utils';
import { socket } from '../../../web-sockets';
import { DashboardLayout } from '../../layouts';
import type { IGenerateQr } from '../../types';

import './app.min.css';
import './style.css';

const DashboardRouting = lazy(() => import('../../routes/DashboardRouting'));

function DashboardPage() {
  const { setAuth, setUserData, userData } = useAuthContext();
  const { setLoginInfo } = useDashboardContext();
  const navigate = useNavigate();

  useEffect(() => {
    // traemo el qr que esta generado
    setLoginInfo({
      loginSuccess: false,
      qrImage: `${WHATSAAP_API_URL}/qr.svg?${Math.random().toString(36)}`,
    });

    // nos suscribimos al socket
    socket.on('qr', receiveQr);

    return () => {
      socket.off('qr', receiveQr);
    };
  }, []);

  useEffect(() => {
    const userInfo = getSessionStorage(USER_ID_KEY);
    if (!userInfo) {
      redirectoAuth();
      return;
    }

    const { fullName, town }: IUserDataLogin = JSON.parse(userInfo);
    setUserData({ ...userData, fullName, town });

    return () => {
      socket.offAny();
    };
  }, []);

  const receiveQr = (loginIfo: IGenerateQr) => {
    console.log({ loginIfo });
    loginIfo.qrImage = `data:image/svg+xml;base64,${loginIfo.qrImage}`;
    setLoginInfo(loginIfo);
    setAuth({ isLoggin: loginIfo.loginSuccess });

    if (loginIfo.userImage) {
      setUserData({ ...userData, userImage: loginIfo.userImage });
    }

    if (loginIfo.loginSuccess) {
      navigate('/dashboard/sphipment-order', { replace: true });
    } else {
      redirectoAuth();
    }
  };

  const redirectoAuth = () => navigate('/auth', { replace: true });

  return (
    <DashboardLayout>
      <DashboardRouting />
    </DashboardLayout>
  );
}

export default DashboardPage;
