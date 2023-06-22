import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';

import { AppRouting } from './routes/AppRouting';
import { socket } from './web-sockets';

export function App() {
  const [qrImg, setQrImg] = useState('');

  useEffect(() => {
    socket.emit('message', 'Hola desde el front');

    socket.on('message', (body) => {
      console.log({ body });
      setQrImg(`data:image/png;base64,${body.image}`);
    });

    return () => {
      // socket.off("message", receiveMessage);
    };
  }, []);
  return (
    <main>
      <img
        src={qrImg}
        alt='QR de inicio de sesión'
      />
      <AppRouting />

      <Toaster position='bottom-center' />
    </main>
  );
}
