import { decodeBase64, encodeBase64 } from '../utils';

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

interface ISetSessionStorage {
  key: string;
  value: string;
}
