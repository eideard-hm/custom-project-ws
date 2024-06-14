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
      <div
        className='col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0'
        style={{ backgroundColor: '#fff' }}
      >
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
                src='data:image/png;base64,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'
                alt='Código QR de inicio de sesión'
                style={{
                  padding: '16px',
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
