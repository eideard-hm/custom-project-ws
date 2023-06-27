import { useEffect, useState } from 'react';

import QRCode from 'react-qr-code';

import { socket } from '../../../web-sockets';
import './QrImage.css';

export function QrImg() {
  const [qrImg, setQrImg] = useState<IGenerateQr>({
    loginSuccess: false,
    qrImage: '',
  });

  useEffect(() => {
    socket.on('qr', receiveQr);

    return () => {
      socket.off('qr', receiveQr);
    };
  }, []);

  const receiveQr = (loginIfo: IGenerateQr) => {
    console.log({ loginIfo });
    setQrImg(loginIfo);
  };

  return (
    <div
      className='qr-image'
      style={{
        display: qrImg.loginSuccess || qrImg.qrImage === '' ? 'none' : 'block',
      }}
    >
      <QRCode
        value={qrImg.qrImage}
        size={400}
      />
    </div>
  );
}

interface IGenerateQr {
  loginSuccess: boolean;
  qrImage: string;
}
