import { WHATSAAP_API_URL } from '../../config';
import type { ISendMessageLead, ISendMessageResponse } from '../types';

export const sendMesssageLead = async (
  message: ISendMessageLead
): Promise<ISendMessageResponse> => {
  try {
    const response = await fetch(`${WHATSAAP_API_URL}/lead`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return (await response.json()) as ISendMessageResponse;
  } catch (error) {
    console.error(error);
    throw Error(error.message as string);
  }
};
