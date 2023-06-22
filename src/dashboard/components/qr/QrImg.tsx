import { useEffect, useState } from 'react';

import { socket } from '../../../web-sockets';
import './QrImage.css';

export function QrImg() {
  const [qrImg, setQrImg] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  useEffect(() => {
    socket.on('message', (body) => {
      console.log({ body });
      setQrImg(`data:image/svg+xml;base64,${body.image}`);
    });

    socket.on('login', (body) => {
      console.log({ body });
      setLoginSuccess(body.loginSuccess)
    });

    return () => {
      // socket.off("message", receiveMessage);
    };
  }, []);

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
