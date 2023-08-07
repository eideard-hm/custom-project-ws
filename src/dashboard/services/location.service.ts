import type { IUserDataLogin } from '../../auth/types';
import { API_URL } from '../../config';
import { getSessionStorageOrNavigate } from '../../services';
import type { IService } from '../types';

export const getLocations = async (serviceCode: string): Promise<IService[]> => {
  try {
    const userInfo = getSessionStorageOrNavigate();
    const { userId }: IUserDataLogin = JSON.parse(userInfo);

    const response = await fetch(`${API_URL}/location/${userId}/${serviceCode}`);
    return (await response.json()) as IService[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
