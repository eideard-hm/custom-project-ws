import { type ReactNode } from 'react';

import { Nabvar, Sidebar } from '../components';

import './app.min.css';
import './style.css';

interface Props {
  children?: ReactNode;
}

export function DashboardLayout({ children }: Props) {
  return (
    <>
      <div className='main-wrapper main-wrapper-1'>
        <Nabvar />

        <Sidebar />

        <main className='main-content'>
          <section className='section'>
            <div className='section-body'>{children}</div>
          </section>
        </main>
      </div>
    </>
  );
}
