import { lazy } from 'react';

import { Router } from '@reach/router';

import { Route } from '../../components';

const LoginPage = lazy(() => import('../pages/login/LoginPage'));

function AuthRouting() {
  return (
    <Router>
      <Route
        default
        path='login'
        element={<LoginPage />}
      />
    </Router>
  );
}

export default AuthRouting;
