import { lazy } from 'react';

import { Route } from '../../components';

const LoginPage = lazy(() => import('../pages/login/LoginPage'));

function AuthRouting() {
  return (
    <Route
      default
      path='login'
      element={<LoginPage />}
    />
  );
}

export default AuthRouting;
