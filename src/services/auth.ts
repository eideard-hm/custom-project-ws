import { navigate } from 'wouter/use-location';

import { WHATSAAP_API_URL } from '../config';
import type { IAuth } from '../types';

export const retrieveCurrentStatusAuth = async (): Promise<IAuth> => {
  try {
    const response = await fetch(`${WHATSAAP_API_URL}/lead`);
    return (await response.json()) as IAuth;
  } catch (error) {
    console.error(error);
    return { isLoggin: false };
  }
};

export const destroySession = async (isLoggin = true): Promise<void> => {
  try {
    sessionStorage.clear();
    localStorage.clear();
    navigate('/auth', { replace: true });
    if (isLoggin) await logout();
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (): Promise<void> => {
  try {
    const response = await fetch(`${WHATSAAP_API_URL}/lead/logout`);
    await response.json();
  } catch (error) {
    console.error(error);
  }
};
