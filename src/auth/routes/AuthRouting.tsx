import { lazy } from 'react';

import { Redirect, Route } from 'wouter';
import { NestedRoutes } from '../../components';

const LoginPage = lazy(() => import('../pages/login/LoginPage'));

function AuthRouting() {
  return (
    <NestedRoutes base='/auth'>
      <Route
        path='/login'
        component={LoginPage}
      />
      <Route>
        <Redirect to='/login' />
      </Route>
    </NestedRoutes>
  );
}

export default AuthRouting;
