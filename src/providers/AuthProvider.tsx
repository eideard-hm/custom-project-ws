import { ReactNode, useEffect, useMemo, useState } from 'react';

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
    validateDateOfBirth: false,
  });

  useEffect(() => {
    let alive = true;

    retrieveCurrentStatusAuth()
      .then((res) => {
        if (!alive) return;
        setAuth((prev) => (prev.isLoggin === res.isLoggin ? prev : res));
      })
      .catch((e) => console.error('[AuthProvider]', e));

    return () => {
      alive = false;
    };
  }, []);

  const setCurrentStatusAuth = (status: IAuth | ((prev: IAuth) => IAuth)) => {
    if (typeof status === 'function') {
      setAuth(status);
      return;
    }
    setAuth((prev) => (prev.isLoggin === status.isLoggin ? prev : status));
  };

  const updateUserData = (
    patch: Partial<IUserData> | ((prev: IUserData) => IUserData),
  ) => {
    if (typeof patch === 'function') {
      setUserData(patch);
      return;
    }
    setUserData((prev) => {
      const next = { ...prev, ...patch };
      if (
        next.fullName === prev.fullName &&
        next.town === prev.town &&
        next.userImage === prev.userImage &&
        next.validateDateOfBirth === prev.validateDateOfBirth
      )
        return prev;
      return next;
    });
  };

  const value = useMemo(
    () => ({
      auth,
      setAuth: setCurrentStatusAuth,
      userData,
      setUserData: updateUserData,
    }),
    [auth, userData],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
