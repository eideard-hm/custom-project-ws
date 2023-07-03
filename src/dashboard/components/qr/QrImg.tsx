import { useEffect, useState } from 'react';

import { retrieveLoginQr } from '../../services';
import { IGenerateQr } from '../../types';

import './QrImage.css';

export function QrImg() {
  const [qrImg, setQrImg] = useState<IGenerateQr>({
    loginSuccess: false,
    qrImage: '',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      retrieveLoginQr()
        .then((res) => {
          console.log({res});
          const newRes = { ...res };
          newRes.qrImage = `data:image/svg+xml;base64,${res.qrImage}`;
          setQrImg(newRes);
        })
        .catch(console.error);
    }, 20 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className='qr-image'
      style={{
        display: qrImg.loginSuccess || qrImg.qrImage === '' ? 'none' : 'block',
      }}
    >
      <img
        src={qrImg.qrImage}
        alt='Código QR de inicio de sesión'
      />
    </div>
  );
}
