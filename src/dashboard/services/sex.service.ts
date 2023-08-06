import { API_URL } from '../../config';
import type { ISex } from '../types';

export const retrieveSexs = async (): Promise<ISex[]> => {
  try {
    const response = await fetch(`${API_URL}/sex`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
