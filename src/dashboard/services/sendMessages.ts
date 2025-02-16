import type { IUserDataLogin } from '../../auth/types';
import { WHATSAAP_API_URL } from '../../config';
import { getSessionStorageOrNavigate } from '../../services';
import type {
  ISendBulkMessageWithAttach,
  ISendMessageLead,
  ISendMessageResponse,
} from '../types';

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

export const sendMesssageBulkAsync = async (
  message: ISendBulkMessageWithAttach
): Promise<ISendMessageResponse[]> => {
  try {
    const userInfo = getSessionStorageOrNavigate();
    const { userId }: IUserDataLogin = JSON.parse(userInfo);

    message.userId = userId;
    message.attach = message.attach.filter(
      (file) => !!file.base64 && !!file.name && !!file.type
    );
    const response = await fetch(`${WHATSAAP_API_URL}/lead`, {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    throw Error(error.message as string);
  }
};
