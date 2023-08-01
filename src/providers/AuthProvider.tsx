import { ReactNode, useEffect, useState } from 'react';

import { AuthContext } from '../context';
import { retrieveCurrentStatusAuth } from '../services';
import type { IAuth, IUserData } from '../types';

interface Props {
  children?: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [auth, setAuth] = useState<IAuth>({ isLoggin: false });
  const [userData, setUserData] = useState<IUserData>({
    fullName: '',
    town: '',
    userImage: '',
  });

  useEffect(() => {
    retrieveCurrentStatusAuth()
      .then((res) => setAuth(res))
      .catch(console.error);
  }, []);

  const setCurrentStatusAuth = (status: IAuth) => setAuth(status);

  const updateUserData = (userDataInput: IUserData) =>
    setUserData({...userDataInput});

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth: setCurrentStatusAuth,
        userData,
        setUserData: updateUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
