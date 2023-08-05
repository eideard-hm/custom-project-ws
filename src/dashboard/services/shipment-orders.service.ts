import type { IUserDataLogin } from '../../auth/types';
import { API_URL } from '../../config';
import { getSessionStorageOrNavigate } from '../../services';
import type {
  ShipmentOrdersCreateInput,
  ShipmentOrdersCreateResponse
} from '../types';

export const createShipmentOrders = async (
  body: ShipmentOrdersCreateInput
): Promise<ShipmentOrdersCreateResponse> => {
  try {
    const userInfo = getSessionStorageOrNavigate();
    const { userId }: IUserDataLogin = JSON.parse(userInfo);
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
    const userInfo = getSessionStorageOrNavigate();
    const { userId }: IUserDataLogin = JSON.parse(userInfo);
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
