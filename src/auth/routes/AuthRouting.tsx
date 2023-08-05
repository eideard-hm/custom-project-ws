import { lazy } from 'react';

import { Redirect, Route } from 'wouter';

const LoginPage = lazy(() => import('../pages/login/LoginPage'));

function AuthRouting() {
  return (
    <>
      <Route
        path='/login'
        component={LoginPage}
      />
      <Route>{() => <Redirect to='/login' />}</Route>
    </>
  );
}

export default AuthRouting;
