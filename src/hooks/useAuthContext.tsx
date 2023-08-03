import { useContext } from 'react';

import { AuthContext } from '../context';

export function useAuthContext() {
  const context = useContext(AuthContext);

  return { ...context };
}
