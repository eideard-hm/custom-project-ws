/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, useContext, useEffect, useState } from 'react';

import { navigate } from 'wouter/use-location';

import type { IUserDataLogin } from '../../auth/types';
import { WHATSAAP_API_URL } from '../../config';
import { AuthContext } from '../../context';
import { getSessionStorage } from '../../services';
import { USER_ID_KEY } from '../../utils';
import { socket } from '../../web-sockets';
import { Nabvar, Sidebar } from '../components';
import type { IGenerateQr, ILoginResponse } from '../types';

import './app.min.css';
import './style.css';

const DashboardRouting = lazy(() => import('../routes/DashboardRouting'));

function DashboardPage() {
  const [qrImg, setQrImg] = useState<ILoginResponse>({
    loginSuccess: false,
    qrImage: '',
  });
  const { setAuth, setUserData, userData } = useContext(AuthContext);

  useEffect(() => {
    // traemo el qr que esta generado
    setQrImg({
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
      navigate('/', { replace: false });
      return;
    }

    const { fullName, town }: IUserDataLogin = JSON.parse(userInfo);
    setUserData({ ...userData, fullName, town });
    console.log({ IUserDataLogin: userData });
  }, []);

  const receiveQr = (loginIfo: IGenerateQr) => {
    console.log({ loginIfo });
    loginIfo.qrImage = `data:image/svg+xml;base64,${loginIfo.qrImage}`;
    setQrImg(loginIfo);
    setAuth({ isLoggin: loginIfo.loginSuccess });

    if (loginIfo.userImage) {
      setUserData({ ...userData, userImage: loginIfo.userImage });
    }

    console.log({ userData });
  };

  return (
    <>
      {/* <div className='loader'></div> */}
      <div id='admin'>
        <div className='main-wrapper main-wrapper-1'>
          <Nabvar />

          <Sidebar />

          {/* <!-- Main Content --> */}
          <section className='main-content'>
            <section className='section'>
              <div className='section-body'>
                <DashboardRouting qrImg={qrImg} />
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
