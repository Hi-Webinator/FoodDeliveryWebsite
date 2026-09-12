import api from './api';

/**
 * Places an order.
 *
 * TS: `(payload: CreateOrderPayload): Promise<CreateOrderResult>`
 * CreateOrderPayload = { customerName, customerPhone, deliveryAddress,
 *                        items: Array<{ menuItemId: string; quantity: number }>,
 *                        totalPrice: number }
 */
export const createOrder = async (payload) => {
  const response = await api.post('/orders', payload);
  return { order: response?.data ?? null, token: response?.token ?? null };
};
