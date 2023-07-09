import { WHATSAAP_API_URL } from '../config';
import { IAuth } from '../types';

export const retrieveCurrentStatusAuth = async (): Promise<IAuth> => {
  try {
    const response = await fetch(`${WHATSAAP_API_URL}/lead`);
    return (await response.json()) as IAuth;
  } catch (error) {
    console.error(error);
    return { isLoggin: false };
  }
};
