import type { IUserDataLogin } from '../../auth/types';
import { API_URL } from '../../config';
import { getSessionStorageOrNavigate } from '../../services';
import type {
  IShipmentOrdersCreateInput, ShipmentOrdersCreateResponse,
  ShipmentOrdersResponse
} from '../types';

export const createShipmentOrders = async (
  body: IShipmentOrdersCreateInput
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
  ShipmentOrdersResponse[]
> => {
  try {
    const userInfo = getSessionStorageOrNavigate();
    const { userId }: IUserDataLogin = JSON.parse(userInfo);
    const response = await fetch(`${API_URL}/sphipment-orders/${userId}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
