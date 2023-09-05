import { useContext } from 'react';
import { ASSETS_IMAGES } from '../../../assets/img';

import { DashboardContext } from '../../../context';
import { Card } from '../../../shared/components';
import { WsOptions } from '../../../ws/components';

import './QrImgPage.css';

function QrImgPage() {
  const { loginInfo } = useContext(DashboardContext);

  return (
    <Card>
      <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-5'>
        <div className='card-content'>
          <WsOptions />
        </div>
      </div>
      <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0'>
        <div className='banner-img'>
          {!loginInfo.qrImage ? (
            <section
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignContent: 'center',
              }}
            >
              <p>Generando el código QR...</p>
              <img
                src={ASSETS_IMAGES.loading}
                alt='Generando el código QR...'
                width='50%'
              />
            </section>
          ) : (
            <img
              src={loginInfo.qrImage}
              alt='Código QR de inicio de sesión'
              style={{
                display:
                  loginInfo.loginSuccess || !loginInfo.qrImage
                    ? 'none'
                    : 'block',
              }}
              width='70%'
            />
          )}
        </div>
      </div>
    </Card>
  );
}

export default QrImgPage;
