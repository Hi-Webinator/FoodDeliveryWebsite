import type { Order } from '../store/types';
import api from './api';

export type CreateOrderPayload = {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: { menuItemId: string; quantity: number }[];
  totalPrice: number;
};

export type CreateOrderResult = {
  order: Order;
  token: string;
};

/** Places an order. */
export const createOrder = async (payload: CreateOrderPayload): Promise<CreateOrderResult> => {
  return api.post<CreateOrderResult>('/orders', payload);
};
