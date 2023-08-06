import { API_URL } from '../../config';
import type { INaturalHoseByService } from '../types';

export const retrieveNaturalHoses = async (
  serviceId: string
): Promise<INaturalHoseByService[]> => {
  try {
    const response = await fetch(`${API_URL}/natural-hose/${serviceId}`);
    return (await response.json()) as INaturalHoseByService[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
