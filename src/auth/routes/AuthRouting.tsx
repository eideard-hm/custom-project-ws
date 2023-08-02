import { lazy } from 'react';

import { Redirect, Route, Switch } from 'wouter';

const LoginPage = lazy(() => import('../pages/login/LoginPage'));

function AuthRouting() {
  return (
    <Switch>
      <Route
        path='/login'
        component={LoginPage}
      />
      <Route>
        <Redirect to='/login' />
      </Route>
    </Switch>
  );
}

export default AuthRouting;
