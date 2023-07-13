import { useContext, useEffect, useState } from 'react';
import { WHATSAAP_API_URL } from '../../config';

import { AuthContext } from '../../context';
import { socket } from '../../web-sockets';
import { FormUserData, Nabvar, QrImg, Sidebar } from '../components';
import type { IGenerateQr } from '../types';

import './app.min.css';
import './style.css';

function DashboardPage() {
  const [qrImg, setQrImg] = useState<IGenerateQr>({
    loginSuccess: false,
    qrImage: '',
  });
  const { auth, setAuth } = useContext(AuthContext);

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

  const receiveQr = (loginIfo: IGenerateQr) => {
    console.log({ loginIfo });
    loginIfo.qrImage = `data:image/svg+xml;base64,${loginIfo.qrImage}`;
    setQrImg(loginIfo);
    setAuth({ isLoggin: loginIfo.loginSuccess });
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
                {auth.isLoggin ? <FormUserData /> : <QrImg loginInfo={qrImg} />}
                {/* <FormUserData /> */}
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
