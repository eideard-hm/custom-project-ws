import { API_URL } from '../../config';
import { IFormValues } from '../types';

const apiUrl = API_URL;

export const loginUser = async (credentials: IFormValues): Promise<boolean> => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    return data as boolean;
  } catch (error) {
    console.error(error);
    return false;
  }
};
