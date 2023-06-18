import { lazy, Suspense } from 'react';

import { Router } from 'wouter';

const AuthRouting = lazy(() => import('../auth/routes/AuthRouting'));

export function AppRouting() {
  return (
    <Suspense fallback={<>loading</>}>
      <Router base='/auth'>
        <AuthRouting />
      </Router>
    </Suspense>
  );
}
