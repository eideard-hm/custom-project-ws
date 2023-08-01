import type { IUserDataLogin } from '../../auth/types';
import { API_URL } from '../../config';
import { getSessionStorage } from '../../services';
import { USER_ID_KEY } from '../../utils';
import type {
  ShipmentOrdersCreateInput,
  ShipmentOrdersCreateResponse,
} from '../types';

export const createShipmentOrders = async (
  body: ShipmentOrdersCreateInput
): Promise<ShipmentOrdersCreateResponse> => {
  try {
    const { userId }: IUserDataLogin = JSON.parse(
      getSessionStorage(USER_ID_KEY) ?? ''
    );
    body.ModifyUserId = userId;
    const response = await fetch(`${API_URL}/sphipment-orders`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return (await response.json()) as ShipmentOrdersCreateResponse;
  } catch (error) {
    console.error(error);
    return { Id: 0 };
  }
};

export const getAllShipmentOrdersAsync = async (): Promise<
  ShipmentOrdersCreateInput[]
> => {
  try {
    const { userId }: IUserDataLogin = JSON.parse(
      getSessionStorage(USER_ID_KEY) ?? ''
    );
    const response = await fetch(`${API_URL}/sphipment-orders/${userId}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return (await response.json()) as ShipmentOrdersCreateInput[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
