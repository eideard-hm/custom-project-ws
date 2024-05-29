import { navigate } from 'wouter/use-browser-location';

import { decodeBase64, encodeBase64, USER_ID_KEY } from '../utils';

export const setSessionStorage = (data: ISetSessionStorage) => {
  try {
    sessionStorage.setItem(data.key, encodeBase64(data.value));
  } catch (error) {
    console.error(error);
  }
};

export const getSessionStorage = (key: string): string | null => {
  try {
    return decodeBase64(sessionStorage.getItem(key) ?? '');
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSessionStorageOrNavigate = () => {
  const userInfo = getSessionStorage(USER_ID_KEY);
  if (!userInfo) {
    navigate('/auth', { replace: true });
  }

  return userInfo ?? '';
};

interface ISetSessionStorage {
  key: string;
  value: string;
}
