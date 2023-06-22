import { Nabvar, QrImg, Sidebar } from '../components';
import './app.min.css'
import './DashboardPage.css';
import './components.css';

function DashboardPage() {
  return (
    <>
      {/* <div className='loader'></div> */}
      <div id='admin'>
        <div className='main-wrapper main-wrapper-1'>
          <Nabvar />

          <Sidebar />
          {/* <!-- Main Content --> */}
          {/* QR Image */}
          <QrImg />
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
