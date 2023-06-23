import { useEffect, useState } from 'react';

import { WHATSAAP_API_URL } from '../../../config';
import { socket } from '../../../web-sockets';
import './QrImage.css';

const initialQrState = `${WHATSAAP_API_URL}/qr.svg`

export function QrImg() {
  const [qrImg, setQrImg] = useState(`${initialQrState}?${Math.random().toString(36)}`);
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    socket.on('qr', receiveQr);

    return () => {
      socket.on('qr', receiveQr);
    };
  }, []);

  const receiveQr = ({ loginSuccess }: IGenerateQr) => {
    console.log({ loginSuccess });
    if (!loginSuccess) {
      setQrImg(`${initialQrState}?${Math.random().toString(36)}`);
    }

    setLoginSuccess(loginSuccess);
  };

  return (
    <div
      className='qr-image'
      style={{ display: loginSuccess ? 'none' : 'block' }}
    >
      <img
        src={qrImg}
        alt='QR de inicio de sesión'
      />
    </div>
  );
}

interface IGenerateQr {
  loginSuccess: boolean;
}
