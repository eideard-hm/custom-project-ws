import { ASSETS_IMAGES } from '../../../assets/img';
import { useDashboardContext } from '../../../hooks';
import { Card } from '../../../shared/components';
import { WsOptions } from '../../../ws/components';
import { ReloadPage } from '../../components';

import styles from './QrImgPage.module.css'

function QrImgPage() {
  const { loginInfo } = useDashboardContext();

  return (
    <Card>
      <div className='col-lg-6 col-md-6 col-sm-12 pl-5'>
        <div className='card-content'>
          <WsOptions />
        </div>
      </div>
      <div
        className='col-lg-6 col-md-6 col-sm-12 pl-0'
        style={{ backgroundColor: '#fff' }}
      >
        <div className={styles.bannerImg}>
          {(() => {
            if (loginInfo.reloadPage) return <ReloadPage />;
            if (!loginInfo.qrImage) {
              return (
                <section
                  className={styles.loadingGenerateQR}
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
                className={styles.qrImg}
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
