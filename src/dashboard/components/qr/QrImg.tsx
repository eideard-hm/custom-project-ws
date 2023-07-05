import { useEffect, useState } from 'react';

import { WHATSAAP_API_URL } from '../../../config';
import { Card } from '../../../shared/components';
import { socket } from '../../../web-sockets';
import type { IGenerateQr } from '../../types';

export function QrImg() {
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
  };

  return (
    <Card>
      <img
        src={qrImg.qrImage}
        alt='Código QR de inicio de sesión'
        style={{
          display: qrImg.loginSuccess ? 'none' : 'block',
        }}
      />
    </Card>
  );
}
