import { useContext, useEffect, useState } from 'react';

import { WHATSAAP_API_URL } from '../../../config';
import { AuthContext } from '../../../context';
import { Card } from '../../../shared/components';
import { socket } from '../../../web-sockets';
import { WsOptions } from '../../../ws/components';
import type { IGenerateQr } from '../../types';

export function QrImg() {
  const { setAuth } = useContext(AuthContext);
  const [qrImg, setQrImg] = useState<IGenerateQr>({
    loginSuccess: false,
    qrImage: '',
  });

  useEffect(() => {
    setQrImg({
      loginSuccess: false,
      qrImage: `${WHATSAAP_API_URL}/qr.svg?${Math.random().toString(36)}`,
    });
  }, []);

  useEffect(() => {
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
    <Card>
      <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-5'>
        <div className='card-content'>
          <WsOptions />
        </div>
      </div>
      <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0'>
        <div className='banner-img'>
          <img
            src={qrImg.qrImage}
            alt='Código QR de inicio de sesión'
            style={{
              display: qrImg.loginSuccess ? 'none' : 'block',
            }}
            width='70%'
          />
        </div>
      </div>
    </Card>
  );
}
