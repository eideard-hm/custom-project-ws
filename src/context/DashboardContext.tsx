import { createContext } from 'react';

import type { IAttachFileContext } from '../types';

export const DashboardContext = createContext<IAttachFileContext>(
  {} as IAttachFileContext
);