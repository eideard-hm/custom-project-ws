import { ASSETS_IMAGES } from '../../../assets/img';

import { Card } from '../../../shared/components';
import { WsOptions } from '../../../ws/components';
import { ReloadPage } from '../../components';
import { useDashboardContext } from '../../../hooks';

import './QrImgPage.css';

function QrImgPage() {
  const { loginInfo } = useDashboardContext();

  return (
    <Card>
      <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-5'>
        <div className='card-content'>
          <WsOptions />
        </div>
      </div>
      <div className='col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0'>
        <div className='banner-img'>
          {(() => {
            if (loginInfo.reloadPage) return <ReloadPage />;
            if (!loginInfo.qrImage) {
              return (
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
              );
            }

            return (
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
            );
          })()}
        </div>
      </div>
    </Card>
  );
}

export default QrImgPage;
