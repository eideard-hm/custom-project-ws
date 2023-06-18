import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

import { Outlet, RouterProvider } from 'react-router-dom'

import './index.css';
import { routes } from './routes/app.router';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<>loading</>}>
        <RouterProvider router={routes} />
        <Outlet />
      </Suspense>
  </StrictMode>
);
