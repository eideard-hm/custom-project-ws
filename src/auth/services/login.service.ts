import { API_URL } from '../../config';
import type { IFormValues, ILoginResponse } from '../types';

const apiUrl = API_URL;

export const loginUser = async (
  credentials: IFormValues
): Promise<ILoginResponse> => {
  try {
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    return data as ILoginResponse;
  } catch (error) {
    console.error(error);
    return {
      loginSuccess: false,
      userData: { fullName: '', town: '', userId: '' },
    };
  }
};
