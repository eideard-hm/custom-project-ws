import { ReactNode, useState } from 'react';
import { AuthContext } from '../context';
import { IAuth } from '../types';

interface Props {
  children?: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<IAuth>({ isLoggin: false });

  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
}
