import { lazy } from 'react';

import { RouteObject } from 'react-router-dom';

const LoginPage = lazy(() => import('../pages/login/LoginPage'));

export const authRouter: RouteObject = {
  path: 'login',
  Component: LoginPage,
};
