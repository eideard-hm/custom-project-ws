import { useContext } from 'react';
import { DashboardContext } from '../context';

export function useDashboardContext() {
  const context = useContext(DashboardContext);

  return { ...context };
}
