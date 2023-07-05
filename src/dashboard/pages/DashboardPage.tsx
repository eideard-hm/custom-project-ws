import { Nabvar, QrImg, Sidebar } from '../components';

import './app.min.css';
import './style.css';

function DashboardPage() {
  return (
    <>
      {/* <div className='loader'></div> */}
      <div id='admin'>
        <div className='main-wrapper main-wrapper-1'>
          <Nabvar />

          <Sidebar />

          {/* <!-- Main Content --> */}
          <section className='main-content' style={{ minHeight: '530px' }}>
            {/* QR Image */}
            <QrImg />
          </section>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
