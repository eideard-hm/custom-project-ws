import { createContext } from 'react';

import type { IAuthContextProps } from '../types';

export const AuthContext = createContext<IAuthContextProps>(
  {} as IAuthContextProps
);
