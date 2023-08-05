import { type ReactNode } from 'react';

import { Nabvar, Sidebar } from '../components';

interface Props {
  children?: ReactNode;
}

export function DashboardLayout({ children }: Props) {
  return (
    <>
      {/* <div className='loader'></div> */}
      <div className='main-wrapper main-wrapper-1'>
        <Nabvar />

        <Sidebar />

        {/* <!-- Main Content --> */}
        <section className='main-content'>
          <section className='section'>
            <div className='section-body'>{children}</div>
          </section>
        </section>
      </div>
    </>
  );
}
