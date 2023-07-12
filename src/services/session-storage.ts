export const setSessionStorage = (data: ISetSessionStorage) => {
  try {
    sessionStorage.setItem(data.key, data.value);
  } catch (error) {
    console.error(error);
  }
};

export const getSessionStorage = (key: string): string | null => {
  try {
    return sessionStorage.getItem(key);
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface ISetSessionStorage {
  key: string;
  value: string;
}
