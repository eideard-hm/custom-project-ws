import { useContext } from 'react';

import { AuthContext } from '../../context';
import { FormMessages, Nabvar, QrImg, Sidebar } from '../components';

import './app.min.css';
import './style.css';

function DashboardPage() {
  const { auth } = useContext(AuthContext);
  return (
    <>
      {/* <div className='loader'></div> */}
      <div id='admin'>
        <div className='main-wrapper main-wrapper-1'>
          <Nabvar />

          <Sidebar />

          {/* <!-- Main Content --> */}
          <section
            className='main-content'
            style={{ minHeight: '530px' }}
          >
            <FormMessages />
            {/* {auth.isLoggin ? <FormMessages /> : <QrImg />} */}
          </section>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
