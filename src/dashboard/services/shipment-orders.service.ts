import { API_URL } from '../../config';
import type {
  ShipmentOrdersCreateInput,
  ShipmentOrdersCreateResponse,
} from '../types';

export const createShipmentOrders = async (
  body: ShipmentOrdersCreateInput
): Promise<ShipmentOrdersCreateResponse> => {
  try {
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
