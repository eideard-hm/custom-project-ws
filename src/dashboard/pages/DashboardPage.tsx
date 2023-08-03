/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, type ReactNode } from 'react';

import { navigate, RouteComponentProps } from '@reach/router';

import type { IUserDataLogin } from '../../auth/types';
import { WHATSAAP_API_URL } from '../../config';
import { AuthContext } from '../../context';
import { useDashboardContext } from '../../hooks';
import { getSessionStorage } from '../../services';
import { USER_ID_KEY } from '../../utils';
import { socket } from '../../web-sockets';
import { DashboardLayout } from '../layouts';
import type { IGenerateQr } from '../types';

import './app.min.css';
import './style.css';

type Props = { children: ReactNode } & RouteComponentProps;

function DashboardPage({ children }: Props) {
  const { setAuth, setUserData, userData } = useContext(AuthContext);
  const { setLoginInfo } = useDashboardContext();

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
      navigate('/auth', { replace: true });
      return;
    }

    const { fullName, town }: IUserDataLogin = JSON.parse(userInfo);
    setUserData({ ...userData, fullName, town });
    console.log({ IUserDataLogin: userData });
  }, []);

  const receiveQr = (loginIfo: IGenerateQr) => {
    console.log({ loginIfo });
    loginIfo.qrImage = `data:image/svg+xml;base64,${loginIfo.qrImage}`;
    setLoginInfo(loginIfo);
    setAuth({ isLoggin: loginIfo.loginSuccess });

    if (loginIfo.userImage) {
      setUserData({ ...userData, userImage: loginIfo.userImage });
    }

    console.log({ userData });
  };

  return <DashboardLayout>{children}</DashboardLayout>;
}

export default DashboardPage;
