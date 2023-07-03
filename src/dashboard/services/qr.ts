import { WHATSAAP_API_URL } from '../../config';
import type { IGenerateQr } from '../types';

export const retrieveLoginQr = async (): Promise<IGenerateQr> => {
  try {
    const response = await fetch(`${WHATSAAP_API_URL}/lead`);
    return (await response.json()) as IGenerateQr;
  } catch (error) {
    console.error(error);
    return { loginSuccess: false, qrImage: '' };
  }
};
