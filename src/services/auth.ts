import { navigate } from 'wouter/use-browser-location';

import type { IUserDataLogin } from '../auth/types';
import { WHATSAAP_API_URL } from '../config';
import type { IAuth } from '../types';
import { getSessionStorageOrNavigate } from './session-storage';

export const retrieveCurrentStatusAuth = async (): Promise<IAuth> => {
  try {
    const userInfo = getSessionStorageOrNavigate();
    if (!userInfo) return Promise.resolve({ isLoggin: false });

    const { userId }: IUserDataLogin = userInfo
      ? JSON.parse(userInfo)
      : { userId: '0' };
    const response = await fetch(`${WHATSAAP_API_URL}/lead/${userId}`);
    return (await response.json()) as IAuth;
  } catch (error) {
    console.error(error);
    return { isLoggin: false };
  }
};

export const destroySession = async (isLoggin = true): Promise<void> => {
  try {
    if (isLoggin) await logout();
    sessionStorage.clear();
    localStorage.clear();
    navigate('/auth', { replace: true });

    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};

export const logout = async (): Promise<void> => {
  try {
    const userInfo = getSessionStorageOrNavigate();
    const { userId }: IUserDataLogin = JSON.parse(userInfo);
    const response = await fetch(`${WHATSAAP_API_URL}/lead/logout/${userId}`);
    await response.json();
  } catch (error) {
    console.error(error);
  }
};
