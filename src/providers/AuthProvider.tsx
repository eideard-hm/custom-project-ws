import { ReactNode, useEffect, useState } from 'react';

import { AuthContext } from '../context';
import { retrieveCurrentStatusAuth } from '../services';
import type { IAuth } from '../types';

interface Props {
  children?: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<IAuth>({ isLoggin: false });

  useEffect(() => {
    retrieveCurrentStatusAuth()
      .then((res) => setAuth(res))
      .catch(console.error);
  }, []);

  const setCurrentStatusAuth = (status: IAuth) => {
    setAuth(status);
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth: setCurrentStatusAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
