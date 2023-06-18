import { lazy } from 'react';

import { Route } from 'wouter';

const LoginPage = lazy(() => import('../pages/login/LoginPage'));

function AuthRouting() {
  return (
    <Route
      path='/login'
      component={LoginPage}
    />
  );
}

export default AuthRouting;
